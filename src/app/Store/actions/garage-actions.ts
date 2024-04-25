import { createAction, props } from '@ngrx/store';
import { Car, CarRequestBody, CarsResponseBody } from '../../core/models/car';
export const loadCarsData = createAction(
  '[Cars] Load Cars Data',
  props<{ data: CarsResponseBody }>()
);
export const loadCarsDataSuccess = createAction(
  '[Cars] Load Cars Data Success',
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
export const setSelectedCarData = createAction(
  '[Cars] Set Selected Car Data',
  props<{ data: Car }>()
);
export const setNameForNewCarData = createAction(
  '[Cars] Set Name For New Car Data',
  props<{ data: string }>()
);
export const setColorForNewCarData = createAction(
  '[Cars] Set Color For New Car Data',
  props<{ data: string }>()
);
export const setNameForSelectedCarData = createAction(
  '[Cars] Set Name For Selected Car Data',
  props<{ data: string }>()
);
export const setColorForSelectedCarData = createAction(
  '[Cars] Set Color For Selected Car Data',
  props<{ data: string }>()
);
export const setNewCarData = createAction(
  '[Cars] Set New Car Data',
  props<{ data: CarRequestBody }>()
);
export const setNewCarDataSuccess = createAction(
  '[Cars] Set New Car Data Success',
  props<{ data: Car }>()
);
export const setUpdateCarData = createAction(
  '[Cars] Set Update Car Data',
  props<{ data: Car }>()
);
export const setUpdateCarDataSuccess = createAction(
  '[Cars] Set Update Car Data Success',
  props<{ data: Car }>()
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
