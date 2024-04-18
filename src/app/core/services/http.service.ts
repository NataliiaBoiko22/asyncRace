import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { CarsResponseBody } from '../models/car';
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

  public getCarsList(page: number, limit: number) {
    console.log('httpClient getCarsList');
    const params = {
      _page: page.toString(),
      _limit: limit.toString(),
    };

    return this.httpClient
      .get<CarsResponseBody>(this.url + this.basePath.garage, { params })
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
