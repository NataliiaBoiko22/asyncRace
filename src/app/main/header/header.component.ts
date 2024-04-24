import { Component } from '@angular/core';
import { Router, RouterModule} from '@angular/router';
import { Store } from '@ngrx/store';
import { ButtonComponent } from '../../core/components/button/button.component';
import { setAreCarsMoving } from '../../Store/actions/garage-actions';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonComponent, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(
    private router: Router,
    private store: Store
  ) {}
  isActive(link: string): boolean {
    return this.router.url === link;
  }
  resetCars() {
    this.store.dispatch(setAreCarsMoving({ areCarsMoving: false }));
  }
}
