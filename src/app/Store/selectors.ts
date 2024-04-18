import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RaceState } from './state.models';
export const selectRaceState = createFeatureSelector<RaceState>('raceState');
export const selectCars = createSelector(selectRaceState, state => state.cars);
