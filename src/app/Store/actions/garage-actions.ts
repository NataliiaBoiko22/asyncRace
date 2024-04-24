import { createAction, props } from '@ngrx/store';
import { Car, CarRequestBody, CarsResponseBody } from '../../core/models/car';
console.log('loadCarsData');
export const loadCarsData = createAction(
  '[Cars] Load Cars Data',
  props<{ data: CarsResponseBody }>()
);

export const setTotalCountData = createAction(
  '[Count] Set Total Count Data',
  props<{ data: number }>()
);
export const deleteCarData = createAction(
  '[Cars] Delete Car Data',
  props<{ data: number }>()
);
export const setSeclectedCarData = createAction(
  '[Cars] Set Selected Car Data',
  props<{ data: Car }>()
);
export const setNewCarData = createAction(
  '[Cars] Set New Car Data',
  props<{ data: CarRequestBody }>()
);
export const setCurrentPage = createAction(
  '[Page] Set Current Page',
  props<{ currentPage: number }>()
);

export const loadNextPage = createAction('[Page] Load Next Page');
export const loadPrevPage = createAction('[Page] Load Previous Page');
export const startCar = createAction(
  '[Cars] Start Car',
  props<{ carId: number }>()
);

export const stopCar = createAction(
  '[Cars] Stop Car',
  props<{ carId: number }>()
);
export const setAreCarsMoving = createAction(
  '[Cars] Set Are Cars Moving',
  props<{ areCarsMoving: boolean }>()
);
