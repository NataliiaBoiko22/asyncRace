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
