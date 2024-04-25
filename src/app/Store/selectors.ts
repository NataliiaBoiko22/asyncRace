import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RaceState } from './state.models';
export const selectRaceState = createFeatureSelector<RaceState>('raceState');
export const selectCars = createSelector(selectRaceState, state => state.cars);
export const selectCarById = (carId: number) =>
  createSelector(selectRaceState, state =>
    state.cars ? state.cars.find(car => car.id === carId) : null
  );
export const selectCurrentPage = createSelector(
  selectRaceState,
  state => state.currentPage
);
export const selectNewCar = createSelector(
  selectRaceState,
  state => state.newCar
);
export const selectSelectedCar = createSelector(
  selectRaceState,
  state => state.selectedCar
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
export const selectAreCarsMoving = createSelector(
  selectRaceState,
  state => state.areCarsMoving
);
export const selectSortData = createSelector(
  selectRaceState,
  state => state.sort
);
export const selectOrderData = createSelector(
  selectRaceState,
  state => state.order
);
export const selectWinnerById = (winnerId: number) =>
  createSelector(selectRaceState, state =>
    state.winners ? state.winners.find(winner => winner.id === winnerId) : null
  );
