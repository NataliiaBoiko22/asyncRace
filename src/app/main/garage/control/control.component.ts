import { Component } from '@angular/core';
import { ButtonComponent } from '../../../core/components/button/button.component';
import { CarService } from '../../../core/services/car.service';
import { MoveService } from '../../../core/services/move.service';

@Component({
  selector: 'app-control',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './control.component.html',
  styleUrl: './control.component.scss',
})
export class ControlComponent {
  constructor(
    private moveservice: MoveService,
    private carService: CarService
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
