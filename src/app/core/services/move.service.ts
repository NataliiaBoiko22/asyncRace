import {
  animate,
  AnimationBuilder,
  AnimationPlayer,
  keyframes,
  style,
} from '@angular/animations';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { catchError, EMPTY, mergeMap } from 'rxjs';
import { createWinnerData } from '../../Store/actions/winners-actions';
import { selectCars } from '../../Store/selectors';
import { Car, CarsResponseBody } from '../models/car';
import { StartStopParameter } from '../models/query-parametr';
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
  private firstSuccessTime: number | null = null;
  private animationPlayers: { [id: number]: AnimationPlayer } = {};

  private animateCar(id: number, data: StartStopParameter, name: string): void {
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
    const carDrive = document.querySelector(`#carImage${id}`);
    const player: AnimationPlayer = animation.create(carDrive);
    player.play();
    player.onDone(() => {
      if (!this.firstSuccessTime || time < this.firstSuccessTime) {
        this.firstSuccessTime = Math.round((time / 1000) * 100) / 100;
        this.winner.id = id;
        this.winner.time = this.firstSuccessTime;
        this.modalService.open(`${name}`, `${this.firstSuccessTime}`);
        this.store.dispatch(createWinnerData({ data: this.winner }));
      }
    });
    this.animationPlayers[id] = player;
  }

  moveCar(id: number, name: string): void {
    this.firstSuccessTime = null;
    this.resetAllCars();
    this.garageHttpService
      .startStopEngine(id, 'started')
      .pipe(
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
  }

  moveAllCar(): void {
    this.firstSuccessTime = null;
    this.store
      .select(selectCars)
      .subscribe((carsResponse: CarsResponseBody) => {
        carsResponse.forEach((car: Car) => {
          this.moveCar(car.id, car.name);
        });
      });
  }

  stopCar(id: number): void {
    const player = this.animationPlayers[id];
    player.onDestroy(() => {});
    player.reset();

    this.garageHttpService.startStopEngine(id, 'stopped').subscribe();
  }

  resetAllCars(): void {
    Object.values(this.animationPlayers).forEach(player => {
      player.onDestroy(() => {});
      player.reset();
    });
    this.firstSuccessTime = null;
    this.winner = { id: 0, time: 0 };
    this.animationPlayers = {};
  }
}
