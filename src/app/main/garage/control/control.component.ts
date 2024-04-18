import { Component } from '@angular/core';
import { ButtonComponent } from '../../../core/components/button/button.component';
import { MoveService } from '../../../core/services/move.service';

@Component({
  selector: 'app-control',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './control.component.html',
  styleUrl: './control.component.scss',
})
export class ControlComponent {
  constructor(private moveservice: MoveService) {}
  raceAllCars() {
    this.moveservice.moveAllCar();
  }
  resetAllCars() {
    this.moveservice.resetAllCars();
  }
}
