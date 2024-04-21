import { createAction, props } from '@ngrx/store';
import { CarsResponseBody } from '../../core/models/car';
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
export const setCurrentPage = createAction(
  '[Page] Set Current Page',
  props<{ currentPage: number }>()
);
export const setNextPageToken = createAction(
  '[Page] Set Next Page Token',
  props<{ nextPageToken: string }>()
);
export const setPrevPageToken = createAction(
  '[Page] Set Prev Page Token',
  props<{ prevPageToken: string }>()
);
export const loadNextPage = createAction('[Page] Load Next Page');
export const loadPrevPage = createAction('[Page] Load Previous Page');