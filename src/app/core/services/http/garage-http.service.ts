import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Car, CarRequestBody, CarsResponseBody } from '../../models/car';
import { StartStopParameter } from '../../models/query-parametr';
import { basePath, getParams, headers, url } from './http-variables';

@Injectable({
  providedIn: 'root',
})
export class GarageHttpService {
  constructor(private httpClient: HttpClient) {}

  public getCarsList(
    page: number,
    limit: number
  ): Observable<HttpResponse<CarsResponseBody>> {
    const params = getParams(page, limit);
    return this.httpClient
      .get<CarsResponseBody>(url + basePath.garage, {
        params,
        observe: 'response',
      })
      .pipe(
        catchError(error => {
          return throwError(() => new Error(error));
        })
      );
  }

  getCar(id: number) {
    return this.httpClient.get<Car>(url + basePath.garage + `/${id}`).pipe(
      catchError(error => {
        return throwError(() => new Error(error));
      })
    );
  }

  public startStopEngine(carId: number, status: string) {
    const params = {
      id: carId,
      status: status,
    };
    return this.httpClient
      .patch<StartStopParameter>(url + basePath.engine, {}, { params })
      .pipe(
        catchError(error => {
          return throwError(() => new Error(error));
        })
      );
  }

  public switchToDriveMode(id: number) {
    const params = {
      id: id,
      status: 'drive',
    };
    return this.httpClient
      .patch<StartStopParameter>(url + basePath.engine, {}, { params })
      .pipe(
        catchError(error => {
          return throwError(() => new Error(error));
        })
      );
  }
  createCar(body: CarRequestBody): Observable<Car> {
    return this.httpClient
      .post<Car>(url + basePath.garage, body, {
        headers: headers,
      })
      .pipe(
        catchError(error => {
          return throwError(() => new Error(error));
        })
      );
  }

  deleteCar(id: number) {
    return this.httpClient
      .delete(url + basePath.garage + `/${id}`, {
        headers: headers,
      })
      .pipe(
        catchError(error => {
          return throwError(() => new Error(error));
        })
      );
  }
}
