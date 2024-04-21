import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import {
  Winner,
  WinnerRequestBody,
  WinnerResponseBody,
  WinnersResponseBody,
} from '../../models/car';
import { OrderOptions, SortOptions } from '../../models/query-parametr';
import { basePath, getParamsWinners, headers, url } from './http-variables';

@Injectable({
  providedIn: 'root',
})
export class WinnersHttpService {
  constructor(private httpClient: HttpClient) {}
  public getWinnersList(
    page: number,
    limit: number,
    sort?: SortOptions,
    order?: OrderOptions
  ): Observable<HttpResponse<WinnersResponseBody>> {
    const params = getParamsWinners(page, limit, sort, order);
    return this.httpClient
      .get<WinnersResponseBody>(url + basePath.winners, {
        params,
        observe: 'response',
      })
      .pipe(
        catchError(error => {
          return throwError(() => new Error(error));
        })
      );
  }
  getWinner(id: number): Observable<Winner> {
    return this.httpClient.get<Winner>(url + basePath.garage + `/${id}`).pipe(
      catchError(error => {
        return throwError(() => new Error(error));
      })
    );
  }

  createWinner(body: Winner): Observable<WinnerResponseBody> {
    return this.httpClient
      .post<WinnerResponseBody>(url + basePath.winners, body, {
        headers: headers,
      })
      .pipe(
        catchError(error => {
          return throwError(() => new Error(error));
        })
      );
  }
  updateWinner(
    id: number,
    body: WinnerRequestBody
  ): Observable<WinnerResponseBody> {
    return this.httpClient
      .put<WinnerResponseBody>(url + basePath.winners + `/${id}`, body, {
        headers: headers,
      })
      .pipe(
        catchError(error => {
          return throwError(() => new Error(error));
        })
      );
  }
}
