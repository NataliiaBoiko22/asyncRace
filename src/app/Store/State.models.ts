import {
  Car,
  CarRequestBody,
  CarsResponseBody,
  WinnerState,
} from '../core/models/car';

export interface RaceState {
  cars: CarsResponseBody;
  totalCount: number;
  currentPage: number;
  carsPerPage: number;
  winners: WinnerState[];
  winnersPerPage: number;
  totalWinnersCount: number;
  currentWinnersPage: number;
  newCar: CarRequestBody;
  selectedCar: Car;
}
let currentPage = 1;
let currentWinnersPage = 1;

const savedCurrentPage = sessionStorage.getItem('currentPageGarage');
if (savedCurrentPage) {
  currentPage = parseInt(savedCurrentPage, 10);
}
const savedCurrentWinnersPage = sessionStorage.getItem('currentPageWinners');
if (savedCurrentWinnersPage) {
  currentWinnersPage = parseInt(savedCurrentWinnersPage, 10);
}
export const initialState: RaceState = {
  cars: [],
  totalCount: 0,
  currentPage: currentPage,
  carsPerPage: 7,
  winners: [],
  winnersPerPage: 7,
  totalWinnersCount: 0,
  currentWinnersPage: currentWinnersPage,
  newCar: {
    name: '',
    color: '#ffba08',
  },
  selectedCar: {
    name: '',
    color: '#000000',
    id: 0,
  },
};
