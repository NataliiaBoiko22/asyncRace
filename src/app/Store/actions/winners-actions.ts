import { createAction, props } from '@ngrx/store';
import {
  Winner,
  WinnerResponseBody,
  WinnersResponseBody,
  WinnerState,
} from '../../core/models/car';

export const createWinnerData = createAction(
  '[Winners] Create Winner Data',
  props<{ data: Winner }>()
);
export const createWinnerDataSuccess = createAction(
  '[Winners] Create Winner Data Success',
  props<{ data: WinnerResponseBody }>()
);
export const loadWinnersData = createAction(
  '[Winners] Load Winners Data',
  props<{ data: WinnersResponseBody }>()
);
export const loadWinnersDataSuccess = createAction(
  '[Winners] Load Winners Data Success',
  props<{ data: WinnerState[] }>()
);
export const setTotalWinnersCountData = createAction(
  '[Count] Set Total Winners Count Data',
  props<{ data: number }>()
);
export const setCurrentWinnersPage = createAction(
  '[Page] Set Current Winners Page',
  props<{ currentPage: number }>()
);
