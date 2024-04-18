import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GarageComponent } from './main/garage/garage.component';
import { HeaderComponent } from './main/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, GarageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'asyncRace';
}
