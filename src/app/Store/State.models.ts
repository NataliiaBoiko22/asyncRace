import { CarsResponseBody } from '../core/models/car';

export interface RaceState {
  cars: CarsResponseBody;
  totalCount: number;
  currentPage: number;
  carsPerPage: number;
}
let currentPage = 1;
const savedCurrentPage = localStorage.getItem('currentPageGarage');
if (savedCurrentPage) {
  currentPage = parseInt(savedCurrentPage, 10);
}
export const initialState: RaceState = {
  cars: [],
  totalCount: 0,
  currentPage: currentPage,
  carsPerPage: 7,
};
