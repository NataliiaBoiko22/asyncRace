import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { Car, CarRequestBody, CarsResponseBody } from '../models/car';
import { StartStopParameter } from '../models/query-parametr';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  url = 'http://127.0.0.1:3000';
  basePath = {
    garage: '/garage',
    engine: '/engine',
    winners: '/winners',
  };
  constructor(private httpClient: HttpClient) {}

  public getCarsList(
    page: number,
    limit: number
  ): Observable<HttpResponse<CarsResponseBody>> {
    console.log('httpClient getCarsList');
    const params = {
      _page: page.toString(),
      _limit: limit.toString(),
    };

    return this.httpClient
      .get<CarsResponseBody>(this.url + this.basePath.garage, {
        params,
        observe: 'response',
      })
      .pipe(
        catchError(error => {
          console.error('Error occurred:', error);
          return throwError(
            () => new Error('Something went wrong; please try again later.')
          );
        })
      );
  }

  public startStopEngine(carId: number, status: string) {
    console.log('httpClient startStopEngine');
    const params = {
      id: carId,
      status: status,
    };
    return this.httpClient
      .patch<StartStopParameter>(
        this.url + this.basePath.engine,
        {},
        { params }
      )
      .pipe(
        catchError(error => {
          console.error('Error occurred:', error);
          return throwError(
            () => new Error('Something went wrong; please try again later.')
          );
        })
      );
  }

  public switchToDriveMode(id: number) {
    const params = {
      id: id,
      status: 'drive',
    };
    return this.httpClient
      .patch<StartStopParameter>(
        this.url + this.basePath.engine,
        {},
        { params }
      )
      .pipe(
        catchError(error => {
          console.error('Error occurred:', error);
          return throwError(
            () => new Error('Something went wrong; please try again later.')
          );
        })
      );
  }
  createCar(body: CarRequestBody): Observable<Car> {
    console.log('httpClient createCar', body);

    return this.httpClient
      .post<Car>(this.url + this.basePath.garage, body, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      })
      .pipe(
        catchError(error => {
          console.error('Error occurred:', error);
          return throwError(
            () => new Error('Something went wrong; please try again later.')
          );
        })
      );
  }

  deleteCar(id: number) {
    return this.httpClient
      .delete(this.url + this.basePath.garage + `/${id}`, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      })
      .pipe(
        catchError(error => {
          console.error('Error occurred:', error);
          return throwError(
            () => new Error('Something went wrong; please try again later.')
          );
        })
      );
  }
}
