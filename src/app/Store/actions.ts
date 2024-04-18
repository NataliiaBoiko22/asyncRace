import { createAction, props } from '@ngrx/store';
import { CarsResponseBody } from '../core/models/car';
console.log('loadCarsData');
export const loadCarsData = createAction(
  '[Cars] Load Cars Data',
  props<{ data: CarsResponseBody }>()
);
export const generateCarsData = createAction(
  '[Cars] Generate Cars Data',
  props<{ data: CarsResponseBody }>()
);
