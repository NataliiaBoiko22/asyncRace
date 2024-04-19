import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CarService } from '../../../core/services/car.service';
import { MoveService } from '../../../core/services/move.service';
import { selectCars, selectTotalCount } from '../../../Store/selectors';
import { CarComponent } from '../car/car.component';

@Component({
  selector: 'app-track',
  standalone: true,
  imports: [CarComponent, CommonModule],
  templateUrl: './track.component.html',
  styleUrl: './track.component.scss',
})
export class TrackComponent implements OnInit {
  currentPageCars$!: Observable<any[]>;
  @ViewChild('carImage') carImage!: ElementRef;
  move = false;
  public carsData$ = this.store.select(selectCars);
  public totalCount$ = this.store.select(selectTotalCount);

  currentPage$!: Observable<number>;

  constructor(
    private store: Store,
    private moveService: MoveService,
    private carService: CarService
  ) {}
  ngOnInit(): void {
    console.log('ngOnInit TrackComponent');
    this.store.dispatch({ type: '[Cars] Load Cars Data' });
    this.carsData$.subscribe(data => {
      console.log('Cars data:', data);
    });
  }
  moveCar(id: number) {
    this.moveService.moveCar(id);
  }

  stopCar(id: number) {
    this.moveService.stopCar(id);
  }
  deleteCar(id: number) {
    this.carService.deleteCar(id);
  }
}
function totalCount(state: object): unknown {
  throw new Error('Function not implemented.');
}
