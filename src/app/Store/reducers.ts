import { createReducer, on } from '@ngrx/store';
import { WinnerState } from '../core/models/car';
import * as GA from './actions/garage-actions';
import * as WA from './actions/winners-actions';
import { initialState, RaceState } from './state.models';

export const raceReducer = createReducer(
  initialState,
  on(GA.loadCarsDataSuccess, (state: RaceState, action) => ({
    ...state,
    cars: action.data,
  })),
  on(GA.setTotalCountData, (state: RaceState, action) => ({
    ...state,
    totalCount: action.data,
  })),

  on(GA.deleteCarData, (state: RaceState, action) => ({
    ...state,
    cars: state.cars.filter(car => car.id !== action.data),
  })),
  on(GA.setCurrentPage, (state: RaceState, { currentPage: page }) => ({
    ...state,
    currentPage: page,
  })),
  on(WA.loadWinnersDataSuccess, (state: RaceState, action) => ({
    ...state,
    winners: action.data,
  })),

  on(WA.createWinnerDataSuccess, (state: RaceState, action) => {
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
  on(WA.setCurrentWinnersPage, (state: RaceState, { currentPage: page }) => ({
    ...state,
    currentWinnersPage: page,
  })),
  on(WA.setTotalWinnersCountData, (state: RaceState, action) => ({
    ...state,
    totalWinnersCount: action.data,
  })),
  on(GA.setSelectedCarData, (state: RaceState, { data: car }) => ({
    ...state,
    selectedCar: car,
  })),
  on(GA.setNameForNewCarData, (state: RaceState, { data: name }) => ({
    ...state,
    newCar: { ...state.newCar, name: name },
  })),
  on(GA.setColorForNewCarData, (state: RaceState, { data: color }) => ({
    ...state,
    newCar: { ...state.newCar, color: color },
  })),
  on(GA.setNameForSelectedCarData, (state: RaceState, { data: name }) => ({
    ...state,
    selectedCar: { ...state.selectedCar, name: name },
  })),
  on(GA.setColorForSelectedCarData, (state: RaceState, { data: color }) => ({
    ...state,
    selectedCar: { ...state.selectedCar, color: color },
  })),
  on(GA.setNewCarData, (state: RaceState, { data: car }) => ({
    ...state,
    newCar: car,
  })),
  on(GA.setNewCarDataSuccess, (state: RaceState, { data: car }) => ({
    ...state,
    cars: [...state.cars, car],
  })),
  on(GA.setUpdateCarDataSuccess, (state: RaceState, { data: action }) => {
    const updatedCars = state.cars.map(car => {
      if (car.id === action.id) {
        return {
          ...car,
          name: action.name,
          color: action.color,
        };
      }
      return car;
    });

    return {
      ...state,
      cars: updatedCars,
    };
  }),

  on(GA.startCar, (state: RaceState, { carId }) => ({
    ...state,
    cars: state.cars.map(car =>
      car.id === carId ? { ...car, isMoving: true } : car
    ),
    areCarsMoving: true,
  })),
  on(GA.stopCar, (state: RaceState, { carId }) => ({
    ...state,
    cars: state.cars.map(car =>
      car.id === carId ? { ...car, isMoving: false } : car
    ),
    areCarsMoving: false,
  })),
  on(GA.setAreCarsMoving, (state: RaceState, { areCarsMoving }) => ({
    ...state,
    areCarsMoving: areCarsMoving,
  })),
  on(WA.setSortData, (state: RaceState, { sort, order }) => ({
    ...state,
    sort: sort,
    order: order,
  }))
);
