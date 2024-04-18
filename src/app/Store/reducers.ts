import { createReducer, on } from '@ngrx/store';
import { loadCarsData } from './actions';
import { initialState, RaceState } from './state.models';

export const raceReducer = createReducer(
  initialState,
  on(loadCarsData, (state: RaceState, action) => ({
    ...state,
    cars: action.data,
  }))
);
