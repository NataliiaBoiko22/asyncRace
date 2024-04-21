import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Car } from '../../../core/models/car';

@Component({
  selector: 'app-car',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './car.component.html',
  styleUrl: './car.component.scss',
})
export class CarComponent {
  @Input() car!: Car;
  @Input() carClass!: string;
}
