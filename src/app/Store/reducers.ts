import { createReducer, on } from '@ngrx/store';
import {
  createCarData,
  deleteCarData,
  loadCarsData,
  setCurrentPage,
  setTotalCountData,
} from './actions';
import { initialState, RaceState } from './state.models';

export const raceReducer = createReducer(
  initialState,
  on(loadCarsData, (state: RaceState, action) => ({
    ...state,
    cars: action.data,
  })),
  on(setTotalCountData, (state: RaceState, action) => ({
    ...state,
    totalCount: action.data,
  })),
  on(createCarData, (state: RaceState, action) => ({
    ...state,
    cars: [...state.cars, action.data],
  })),
  on(deleteCarData, (state: RaceState, action) => ({
    ...state,
    cars: state.cars.filter(car => car.id !== action.data),
  })),
  on(setCurrentPage, (state: RaceState, { currentPage: page }) => ({
    ...state,
    currentPage: page,
  }))
);
