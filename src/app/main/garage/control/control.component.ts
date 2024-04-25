import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ButtonComponent } from '../../../core/components/button/button.component';
import { CarService } from '../../../core/services/car.service';
import { MoveService } from '../../../core/services/move.service';
import { selectAreCarsMoving } from '../../../Store/selectors';

@Component({
  selector: 'app-control',
  standalone: true,
  imports: [ButtonComponent, CommonModule],
  templateUrl: './control.component.html',
  styleUrl: './control.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ControlComponent {
  areCarsMoving$ = this.store.select(selectAreCarsMoving);

  constructor(
    private moveservice: MoveService,
    private carService: CarService,
    private store: Store
  ) {}
  raceAllCars() {
    this.moveservice.moveAllCar();
  }
  resetAllCars() {
    this.moveservice.resetAllCars();
  }
  generateCars() {
    this.carService.generateCars();
  }
}
