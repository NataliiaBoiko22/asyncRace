import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from '../../core/components/button/button.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonComponent, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent
{

}
