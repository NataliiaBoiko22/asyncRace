import { Component } from '@angular/core';
import { ControlComponent } from './control/control.component';
import { SettingsComponent } from './settings/settings.component';

@Component({
  selector: 'app-garage',
  standalone: true,
  imports: [SettingsComponent, ControlComponent],
  templateUrl: './garage.component.html',
  styleUrl: './garage.component.scss',
})
export class GarageComponent {}
