import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, map, of, switchMap, take } from 'rxjs';
import { carData } from '../../../assets/cars';
import * as GA from '../../Store/actions/garage-actions';
import * as SL from '../../Store/selectors';
import { Car, CarRequestBody } from '../models/car';
import { GarageHttpService } from './http/garage-http.service';
import { WinnersHttpService } from './http/winners-http.service';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  constructor(
    private store: Store,
    private garageHttpService: GarageHttpService,
    private winnersHttpService: WinnersHttpService
  ) {}

  private generateRandomName(): string {
    const randomBrandIndex = Math.floor(
      Math.random() * carData.carBrand.length
    );
    const randomModelIndex = Math.floor(
      Math.random() * carData.carModel.length
    );
    return `${carData.carBrand[randomBrandIndex]} ${carData.carModel[randomModelIndex]}`;
  }

  private generateRandomColor(): string {
    const signs = '0123456789ABCDEF';
    let randomColor = '#';
    for (let col = 0; col < 6; col++) {
      randomColor += signs[Math.floor(Math.random() * signs.length)];
    }
    return randomColor;
  }

  generateCars() {
    const generatedCar = {} as Car;
    const amountForGenerate = 100;
    for (let i = 0; i < amountForGenerate; i++) {
      generatedCar.name = this.generateRandomName();
      generatedCar.color = this.generateRandomColor();
      this.garageHttpService.createCarHttp(generatedCar).subscribe({
        next: () => {
          this.store.dispatch({ type: '[Cars] Load Cars Data' });
        },
        error: error => {
          console.error('Error occurred:', error);
        },
      });
    }
  }

  createCar(data: CarRequestBody) {
    const generatedCar = {} as Car;
    if (data.name && data.color) {
      generatedCar.name = data.name;
      generatedCar.color = data.color;
    } else {
      generatedCar.name = this.generateRandomName();
      generatedCar.color = this.generateRandomColor();
    }
    this.garageHttpService.createCarHttp(generatedCar).subscribe({
      next: () => {
        this.store.dispatch({ type: '[Cars] Load Cars Data' });
      },
      error: error => {
        console.error('Error occurred:', error);
      },
    });
    combineLatest([
      this.store.select(SL.selectTotalCount),
      this.store.select(SL.selectCarPerPage),
    ])
      .pipe(
        map(([totalCount, carPerPage]) => {
          return Math.ceil(totalCount / carPerPage);
        })
      )
      .subscribe(totalPages => {
        this.store.dispatch(GA.setAreCarsMoving({ areCarsMoving: false }));
        return this.store.dispatch(
          GA.setCurrentPage({ currentPage: totalPages })
        );
      });
  }
  deleteCar(id: number) {
    this.garageHttpService
      .deleteCarHttp(id)
      .pipe(
        switchMap(() => {
          return this.store.select(SL.selectWinnerById(id)).pipe(
            take(1),
            switchMap(winner => {
              if (winner) {
                return this.winnersHttpService.deleteWinnerHttp(id);
              } else {
                return of(null);
              }
            })
          );
        })
      )
      .subscribe({
        next: () => {
          this.store.dispatch(GA.setAreCarsMoving({ areCarsMoving: false }));
          this.store.dispatch(GA.deleteCarData({ data: id }));
          this.store.dispatch({ type: '[Cars] Load Cars Data' });
        },
        error: error => {
          console.error('Error occurred:', error);
        },
      });
  }
}
