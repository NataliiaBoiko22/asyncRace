import { Component } from '@angular/core';
import { ButtonComponent } from '../../../core/components/button/button.component';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {

}
