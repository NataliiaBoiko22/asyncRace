import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./main/garage/garage.component').then(m => m.GarageComponent),
  },
  {
    path: 'winners',
    loadComponent: () =>
      import('./main/winners/winners.component').then(m => m.WinnersComponent),
  },
];
