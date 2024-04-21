import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { carData } from '../../../assets/cars';
import { deleteCarData } from '../../Store/actions/garage-actions';
import { Car } from '../models/car';
import { GarageHttpService } from './http/garage-http.service';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  constructor(
    private store: Store,
    private garageHttpService: GarageHttpService
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
    console.log('generateCars');
    const generatedCar = {} as Car;

    for (let i = 0; i < 6; i++) {
      generatedCar.name = this.generateRandomName();
      generatedCar.color = this.generateRandomColor();
      this.garageHttpService.createCar(generatedCar).subscribe({
        next: car => {
          console.log('car', car);
          // this.store.dispatch(createCarData({ data: car }));
          this.store.dispatch({ type: '[Cars] Load Cars Data' });
        },
        error: error => {
          console.error('Error occurred:', error);
        },
      });
    }
  }

  createCar(newCarName: string, newCarColor: string) {
    const generatedCar = {} as Car;

    if (newCarName && newCarColor) {
      generatedCar.name = newCarName;
      generatedCar.color = newCarColor;
    } else {
      generatedCar.name = this.generateRandomName();
      generatedCar.color = this.generateRandomColor();
    }
    console.log('generatedCars', generatedCar);
    this.garageHttpService.createCar(generatedCar).subscribe({
      next: car => {
        console.log('car', car);
        // this.store.dispatch(createCarData({ data: car }));
        this.store.dispatch({ type: '[Cars] Load Cars Data' });
      },
      error: error => {
        console.error('Error occurred:', error);
      },
    });
  }
  deleteCar(id: number) {
    this.garageHttpService.deleteCar(id).subscribe({
      next: () => {
        this.store.dispatch(deleteCarData({ data: id }));
      },
      error: error => {
        console.error('Error occurred:', error);
      },
    });
  }
}
