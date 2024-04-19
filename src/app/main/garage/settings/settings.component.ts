import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../../core/components/button/button.component';
import { CarService } from '../../../core/services/car.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [ButtonComponent, FormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent {
  newCarName: string = '';
  newCarColor: string = '#ffba08';
  constructor(private carService: CarService) {}
  createCar() {
    this.carService.createCar(this.newCarName, this.newCarColor);
  }
}
