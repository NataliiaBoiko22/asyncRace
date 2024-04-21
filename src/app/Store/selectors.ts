import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RaceState } from './state.models';
export const selectRaceState = createFeatureSelector<RaceState>('raceState');
export const selectCars = createSelector(selectRaceState, state => state.cars);
export const selectCarById = (carId: number) =>
  createSelector(selectRaceState, state =>
    state.cars.find(car => car.id === carId)
  );
export const selectCurrentPage = createSelector(
  selectRaceState,
  state => state.currentPage
);
export const selectCarPerPage = createSelector(
  selectRaceState,
  state => state.carsPerPage
);
export const selectTotalCount = createSelector(
  selectRaceState,
  state => state.totalCount
);
export const selectCurrentWinnersPage = createSelector(
  selectRaceState,
  state => state.currentWinnersPage
);
export const selectWinners = createSelector(
  selectRaceState,
  state => state.winners
);

export const selectWinnersPerPage = createSelector(
  selectRaceState,
  state => state.winnersPerPage
);
export const selectTotalWinnersCount = createSelector(
  selectRaceState,
  state => state.totalWinnersCount
);
