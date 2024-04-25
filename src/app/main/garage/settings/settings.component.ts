import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription, take } from 'rxjs';
import { ButtonComponent } from '../../../core/components/button/button.component';
import { Car, CarRequestBody } from '../../../core/models/car';
import * as GA from '../../../Store/actions/garage-actions';
import {
  selectNewCar,
  selectSelectedCar,
  selectTotalCount,
} from '../../../Store/selectors';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [ButtonComponent, FormsModule, CommonModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent implements OnInit, OnDestroy {
  public selectedCarData$ = this.store.select(selectSelectedCar);
  public newCarData$ = this.store.select(selectNewCar);

  public selectedCarData: Car = {
    name: '',
    color: '',
    id: 0,
  };
  public newCarData: CarRequestBody = {
    name: '',
    color: '',
  };
  private selectedCarSubscription!: Subscription;
  private newCarSubscription!: Subscription;

  constructor(private store: Store) {}
  ngOnInit(): void {
    this.selectedCarSubscription = this.selectedCarData$.subscribe(data => {
      this.selectedCarData = { ...data };
    });
    this.newCarSubscription = this.newCarData$.subscribe(data => {
      this.newCarData = { ...data };
    });
  }
  createCar() {
    const newCar = {
      name: this.newCarData.name,
      color: this.newCarData.color,
    };
    this.store
      .select(selectTotalCount)
      .pipe(take(1))
      .subscribe(totalCount => {
        const newTotalCount = totalCount + 1;
        this.store.dispatch(GA.setTotalCountData({ data: newTotalCount }));
      });
    this.store.dispatch(GA.setNewCarData({ data: newCar }));
  }

  updateCar() {
    const updatedCar = {
      name: this.selectedCarData.name,
      color: this.selectedCarData.color,
      id: this.selectedCarData.id,
    };
    this.store.dispatch(GA.setUpdateCarData({ data: updatedCar }));
  }

  handleInputChange(event: Event, inputName: string): void {
    const newValue = (event.target as HTMLInputElement).value;
    if (inputName === 'newCarName') {
      this.store.dispatch(GA.setNameForNewCarData({ data: newValue }));
    } else if (inputName === 'newCarColor') {
      this.store.dispatch(GA.setColorForNewCarData({ data: newValue }));
    } else if (inputName === 'selectedCarName') {
      this.store.dispatch(GA.setNameForSelectedCarData({ data: newValue }));
    } else if (inputName === 'selectedCarColor') {
      this.store.dispatch(GA.setColorForSelectedCarData({ data: newValue }));
    }
  }
  ngOnDestroy(): void {
    if (this.selectedCarSubscription) {
      this.selectedCarSubscription.unsubscribe();
    }
    if (this.newCarSubscription) {
      this.newCarSubscription.unsubscribe();
    }
  }
}
