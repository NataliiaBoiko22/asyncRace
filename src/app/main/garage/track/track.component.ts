import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { LoaderComponent } from '../../../core/components/loader/loader.component';
import { Car, CarsResponseBody } from '../../../core/models/car';
import { CarService } from '../../../core/services/car.service';
import { MoveService } from '../../../core/services/move.service';
import { setSeclectedCarData } from '../../../Store/actions/garage-actions';
import { selectCars, selectTotalCount } from '../../../Store/selectors';
import { CarComponent } from '../car/car.component';

@Component({
  selector: 'app-track',
  standalone: true,
  imports: [CarComponent, CommonModule, LoaderComponent],
  templateUrl: './track.component.html',
  styleUrl: './track.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackComponent implements OnInit, OnDestroy {
  @ViewChild('carImage') carImage!: ElementRef;
  move = false;
  public carsData$!: Observable<CarsResponseBody>;
  public totalCount$!: Observable<number>;
  private carsDataSubscription: Subscription | undefined;
  private totalCountSubscription: Subscription | undefined;
  currentPage$!: Observable<number>;
  selectedCarName = signal<string>('');
  selectedCarColor = signal<string>('');
  constructor(
    private store: Store,
    private moveService: MoveService,
    private carService: CarService
  ) {}
  ngOnInit(): void {
    console.log('ngOnInit TrackComponent');
    this.store.dispatch({ type: '[Cars] Load Cars Data' });
    this.carsData$ = this.store.select(selectCars);
    this.totalCount$ = this.store.select(selectTotalCount);
  }
  moveCar(id: number, carname: string) {
    this.moveService.moveCar(id, carname);
  }

  stopCar(id: number) {
    this.moveService.stopCar(id);
  }
  deleteCar(id: number) {
    this.carService.deleteCar(id);
  }

  selectCar(carItem: Car) {
    console.log('selectCar');
    this.store.dispatch(setSeclectedCarData({ data: carItem }));
  }
  ngOnDestroy(): void {
    if (this.carsDataSubscription) {
      this.carsDataSubscription.unsubscribe();
    }
    if (this.totalCountSubscription) {
      this.totalCountSubscription.unsubscribe();
    }
  }
}
