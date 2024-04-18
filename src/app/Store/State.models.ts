import { CarsResponseBody } from "../core/models/car";

export interface RaceState {
  cars: CarsResponseBody;
}

export const initialState: RaceState = {
  cars: [],
};
