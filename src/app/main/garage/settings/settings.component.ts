import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { ButtonComponent } from '../../../core/components/button/button.component';
import { Car, CarRequestBody } from '../../../core/models/car';
import { CarService } from '../../../core/services/car.service';
import { selectNewCar, selectSelectedCar } from '../../../Store/selectors';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [ButtonComponent, FormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent implements OnInit, OnDestroy {
  public selectedCarData$!: Observable<Car>;
  public selectedCar = signal<Car>({
    name: '',
    color: '',
    id: 0,
  });
  public newCarData$!: Observable<CarRequestBody>;
  selectedCarName = '';
  selectedCarColor = '';
  selectedCarId = 0;

  newCarName = '';
  newCarColor = '';

  private selectedCarSubscription: Subscription | undefined;
  private newCarSubscription: Subscription | undefined;

  constructor(
    private carService: CarService,
    private store: Store,
    private cdr: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.selectedCarData$ = this.store.select(selectSelectedCar);
    this.selectedCarSubscription = this.selectedCarData$.subscribe(
      (data: Car) => {
        this.selectedCarName = data.name;
        this.selectedCarColor = data.color;
        this.selectedCarId = data.id;
        this.cdr.detectChanges();
      }
    );
    this.newCarData$ = this.store.select(selectNewCar);
    this.newCarSubscription = this.newCarData$.subscribe(
      (data: CarRequestBody) => {
        this.newCarName = data.name;
        this.newCarColor = data.color;
      }
    );
  }
  createCar() {
    this.carService.createCar(this.newCarName, this.newCarColor);
  }
  ngOnDestroy(): void {
    if (this.selectedCarSubscription) {
      this.selectedCarSubscription.unsubscribe();
    }
    if (this.newCarSubscription) {
      this.newCarSubscription.unsubscribe();
    }
  }
  updateCar() {
    const updatedCar = {
      name: this.selectedCarName,
      color: this.selectedCarColor,
      id: this.selectedCarId,
    };
    this.carService.updateCar(updatedCar);
  }
}
