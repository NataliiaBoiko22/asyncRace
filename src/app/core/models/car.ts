export interface Car {
  name: string;
  color: string;
  id: number;
}

export type CarsResponseBody = Car[];
export interface CarRequestBody {
  name: string;
  color: string;
}
export interface Winner {
  id: number;
  time: number;
}
export interface WinnerRequestBody {
  wins: number;
  time: number;
}
export interface WinnerResponseBody {
  id: number;
  wins: number;
  time: number;
}
export type WinnersResponseBody = WinnerResponseBody[];
export interface WinnerState {
  id: number;
  name: string;
  color: string;
  wins: number;
  time: number;
}
