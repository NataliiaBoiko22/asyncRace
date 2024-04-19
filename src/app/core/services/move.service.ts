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
import { selectCars } from '../../Store/selectors';
import { Car, CarsResponseBody } from '../models/car';
import { StartStopParameter } from '../models/query-parametr';
import { HttpService } from './http.service';
import { ModalService } from './modal.service';

@Injectable({
  providedIn: 'root',
})
export class MoveService {
  constructor(
    private httpService: HttpService,
    private builder: AnimationBuilder,
    private store: Store,
    private modalService: ModalService
  ) {}
  success = {};
  time = 0;
  private firstSuccessTime: number | null = null;
  private animationPlayers: { [id: number]: AnimationPlayer } = {};

  private animateCar(id: number, data: StartStopParameter, name: string): void {
    const width = document.documentElement.clientWidth;
    const time = Math.floor(data.distance / data.velocity);
    const distanceToMove = Math.min(width - 180, data.distance);
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
        console.log('this.firstSuccessTime', this.firstSuccessTime);
        this.modalService.open(`${name}`, `${this.firstSuccessTime}`);
      }
    });
    this.animationPlayers[id] = player;
  }

  moveCar(id: number, name: string): void {
    this.httpService
      .startStopEngine(id, 'started')
      .pipe(
        mergeMap((data: StartStopParameter) => {
          console.log('startStopEngine received:', data);
          this.animateCar(id, data, name);
          return this.httpService.switchToDriveMode(id).pipe(
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
    player.pause();
    this.httpService.startStopEngine(id, 'stopped').subscribe();
  }

  resetAllCars(): void {
    Object.values(this.animationPlayers).forEach(player => {
      player.destroy();
    });

    this.animationPlayers = {};
  }
}
