import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoaderComponent } from '../../core/components/loader/loader.component';
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
    LoaderComponent,
  ],
  templateUrl: './garage.component.html',
  styleUrl: './garage.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GarageComponent {}
