import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PaginationComponent } from '../../core/components/pagination/pagination.component';
import { ControlComponent } from './control/control.component';
import { SettingsComponent } from './settings/settings.component';
import { TrackComponent } from './track/track.component';

@Component({
  selector: 'app-garage',
  standalone: true,
  imports: [
    CommonModule,
    SettingsComponent,
    ControlComponent,
    TrackComponent,
    PaginationComponent,
  ],
  templateUrl: './garage.component.html',
  styleUrl: './garage.component.scss',
})
export class GarageComponent {}
