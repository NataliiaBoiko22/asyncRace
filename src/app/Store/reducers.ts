import { createReducer, on } from '@ngrx/store';
import { WinnerState } from '../core/models/car';
import {
  deleteCarData,
  loadCarsData,
  setAreCarsMoving,
  setCurrentPage,
  setNewCarData,
  setSeclectedCarData,
  setTotalCountData,
  startCar,
  stopCar,
} from './actions/garage-actions';
import {
  createWinnerDataSuccess,
  loadWinnersDataSuccess,
  setCurrentWinnersPage,
  setSortData,
  setTotalWinnersCountData,
} from './actions/winners-actions';
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

  on(deleteCarData, (state: RaceState, action) => ({
    ...state,
    cars: state.cars.filter(car => car.id !== action.data),
  })),
  on(setCurrentPage, (state: RaceState, { currentPage: page }) => ({
    ...state,
    currentPage: page,
  })),
  on(loadWinnersDataSuccess, (state: RaceState, action) => ({
    ...state,
    winners: action.data,
  })),

  on(createWinnerDataSuccess, (state: RaceState, action) => {
    const winnerData: WinnerState = {
      id: action.data.id,
      name: '',
      color: '',
      wins: action.data.wins,
      time: action.data.time,
    };
    const car = state.cars.find(car => car.id === action.data.id);
    if (car) {
      winnerData.name = car.name;
      winnerData.color = car.color;
    } else {
      console.error(`Car with id ${action.data.id} not found.`);
    }
    return {
      ...state,
      winners: [...state.winners, winnerData],
    };
  }),
  on(setCurrentWinnersPage, (state: RaceState, { currentPage: page }) => ({
    ...state,
    currentWinnersPage: page,
  })),
  on(setTotalWinnersCountData, (state: RaceState, action) => ({
    ...state,
    totalWinnersCount: action.data,
  })),
  on(setSeclectedCarData, (state: RaceState, { data: car }) => ({
    ...state,
    selectedCar: car,
  })),
  on(setNewCarData, (state: RaceState, { data: car }) => ({
    ...state,
    newCar: car,
  })),
  on(startCar, (state: RaceState, { carId }) => ({
    ...state,
    cars: state.cars.map(car =>
      car.id === carId ? { ...car, isMoving: true } : car
    ),
    areCarsMoving: true,
  })),
  on(stopCar, (state: RaceState, { carId }) => ({
    ...state,
    cars: state.cars.map(car =>
      car.id === carId ? { ...car, isMoving: false } : car
    ),
    areCarsMoving: false,
  })),
  on(setAreCarsMoving, (state: RaceState, { areCarsMoving }) => ({
    ...state,
    areCarsMoving: areCarsMoving,
  })),
  on(setSortData, (state: RaceState, { sort, order }) => ({
    ...state,
    sort: sort,
    order: order,
  }))
);
