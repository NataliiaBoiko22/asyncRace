import {
  animate,
  AnimationBuilder,
  AnimationPlayer,
  keyframes,
  style,
} from '@angular/animations';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { catchError, EMPTY, mergeMap, Subject, take, takeUntil } from 'rxjs';
import { startCar, stopCar } from '../../Store/actions/garage-actions';
import { createWinnerData } from '../../Store/actions/winners-actions';
import { selectCars } from '../../Store/selectors';
import { Car, CarsResponseBody, StartStopParameter } from '../models/car';
import { GarageHttpService } from './http/garage-http.service';
import { ModalService } from './modal.service';

@Injectable({
  providedIn: 'root',
})
export class MoveService {
  constructor(
    private garageHttpService: GarageHttpService,
    private builder: AnimationBuilder,
    private store: Store,
    private modalService: ModalService
  ) {}
  success = {};
  time = 0;
  winner = {
    id: 0,
    time: 0,
  };
  private resettingAnimation: boolean = false;
  private firstSuccessTime: number | null = null;
  private animationPlayers: { [id: number]: AnimationPlayer } = {};
  private resetAnimation$ = new Subject<void>();
  private animateCar(id: number, data: StartStopParameter, name: string): void {
    if (this.resettingAnimation) return;
    this.firstSuccessTime = null;
    const width = document.documentElement.clientWidth;
    const time = Math.floor(data.distance / data.velocity);
    const distanceToMove = Math.min(width - 200, data.distance);
    const animation = this.builder.build([
      animate(
        `${time}ms`,
        keyframes([
          style({ transform: `translateX(0)` }),
          style({ transform: `translateX(${distanceToMove}px)` }),
        ])
      ),
    ]);
    const player: AnimationPlayer = animation.create(
      document.querySelector(`#carImage${id}`)
    );
    this.animationPlayers[id] = player;
    player.play();
    player.onDone(() => {
      if (!this.firstSuccessTime || time < this.firstSuccessTime) {
        this.firstSuccessTime = Math.round((time / 1000) * 100) / 100;
        this.winner = { id: id, time: this.firstSuccessTime };
        this.modalService.open(`${name}`, `${this.firstSuccessTime}`);
        this.store.dispatch(createWinnerData({ data: this.winner }));
      }
    });
  }

  moveCar(id: number, name: string): void {
    if (this.resettingAnimation) {
      return;
    }
    this.garageHttpService
      .startStopEngine(id, 'started')
      .pipe(
        takeUntil(this.resetAnimation$),
        mergeMap((data: StartStopParameter) => {
          this.animateCar(id, data, name);
          return this.garageHttpService.switchToDriveMode(id).pipe(
            catchError(() => {
              this.animationPlayers[id]?.pause();
              return EMPTY;
            })
          );
        })
      )
      .subscribe();
    this.store.dispatch(startCar({ carId: id }));
  }
  moveAllCar(): void {
    this.firstSuccessTime = null;
    let carsArr = [] as CarsResponseBody;
    this.store.select(selectCars).subscribe(cars => {
      carsArr = cars;
    });
    if (carsArr) {
      carsArr.forEach((car: Car) => {
        this.moveCar(car.id, car.name);
      });
    }
  }

  stopCar(id: number): void {
    const player = this.animationPlayers[id];
    if (player) {
      this.garageHttpService.startStopEngine(id, 'stopped').subscribe();
      player.reset();
      const animation = this.builder.build([
        animate('100ms', style({ transform: 'translateX(0)' })),
      ]);
      const newPlayer = animation.create(
        document.querySelector(`#carImage${id}`)
      );
      newPlayer.play();
      this.animationPlayers[id] = player;
      this.store.dispatch(stopCar({ carId: id }));
    } else {
      return;
    }
  }

  resetAllCars(): void {
    if (this.resettingAnimation) return;
    this.resettingAnimation = true;
    this.resetAnimation$.next();
    Object.keys(this.animationPlayers).forEach(id => {
      const carId = Number(id);
      this.stopCar(carId);
    });
    let carsArr: Car[] = [];
    this.store
      .select(selectCars)
      .pipe(take(1))
      .subscribe(cars => {
        carsArr = cars;
        Object.keys(this.animationPlayers).forEach(id => {
          const carId = Number(id);
          if (!carsArr.some(car => car.id === carId)) {
            delete this.animationPlayers[carId];
          }
        });
        this.resettingAnimation = false;
      });
  }
}
