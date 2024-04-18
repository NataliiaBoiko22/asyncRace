import { Component } from '@angular/core';
import { ControlComponent } from './control/control.component';
import { SettingsComponent } from './settings/settings.component';
import { TrackComponent } from './track/track.component';

@Component({
  selector: 'app-garage',
  standalone: true,
  imports: [SettingsComponent, ControlComponent, TrackComponent],
  templateUrl: './garage.component.html',
  styleUrl: './garage.component.scss',
})
export class GarageComponent {}
