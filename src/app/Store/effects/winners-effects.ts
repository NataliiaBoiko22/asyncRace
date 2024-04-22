import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import {
  catchError,
  exhaustMap,
  forkJoin,
  map,
  Observable,
  of,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs';
import { WinnersResponseBody, WinnerState } from '../../core/models/car';
import { GarageHttpService } from '../../core/services/http/garage-http.service';
import { WinnersHttpService } from '../../core/services/http/winners-http.service';
import {
  createWinnerData,
  createWinnerDataSuccess,
  loadWinnersDataSuccess,
  setTotalWinnersCountData,
} from '../actions/winners-actions';
import {
  selectCurrentWinnersPage,
  selectWinners,
  selectWinnersPerPage,
} from '../selectors';

@Injectable()
export class WinnersEffects {
  loadWinnersData$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType('[Winners] Load Winners Data'),
      withLatestFrom(
        this.store.select(selectCurrentWinnersPage),
        this.store.select(selectWinnersPerPage)
      ),
      exhaustMap(([, currentPage, carPerPage]) =>
        this.loadWinnersData(currentPage, carPerPage).pipe(
          catchError(() => of({ type: 'Error occurred' }))
        )
      )
    )
  );

  private loadWinnersData(
    currentPage: number,
    carPerPage: number
  ): Observable<Action> {
    return this.winnersHttpService.getWinnersList(currentPage, carPerPage).pipe(
      tap((response: HttpResponse<WinnersResponseBody>) => {
        const totalWinnersCountHeader = Number(
          response.headers.get('X-Total-Count')
        );
        this.store.dispatch(
          setTotalWinnersCountData({ data: totalWinnersCountHeader })
        );
      }),
      switchMap((response: HttpResponse<WinnersResponseBody>) => {
        return this.processWinnersData(response);
      })
    );
  }

  private processWinnersData(
    response: HttpResponse<WinnersResponseBody>
  ): Observable<Action> {
    const receivedWinnersData = response.body;
    if (receivedWinnersData) {
      const requests = receivedWinnersData.map(winner =>
        this.garageHttpService.getCarHttp(winner.id).pipe(
          map(car => {
            const winnerData: WinnerState = {
              id: winner.id,
              name: car.name,
              color: car.color,
              wins: winner.wins,
              time: winner.time,
            };
            return winnerData;
          })
        )
      );
      return forkJoin(requests).pipe(
        map(winnerDataArray => {
          return loadWinnersDataSuccess({
            data: winnerDataArray,
          });
        })
      );
    } else {
      return of({ type: 'No winners data received' });
    }
  }

  createWinner$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(createWinnerData),
      withLatestFrom(this.store.select(selectWinners)),
      exhaustMap(([action, winners]) => {
        const existingWinner = winners.find(
          winner => winner.id === action.data.id
        );
        const winnerData = {
          id: action.data.id,
          wins: existingWinner ? existingWinner.wins + 1 : 1,
          time: action.data.time,
        };
        const winnerObservable = existingWinner
          ? this.winnersHttpService.updateWinnerHttp(
              existingWinner.id,
              winnerData
            )
          : this.winnersHttpService.createWinnerHttp(winnerData);

        return winnerObservable.pipe(
          map(winner => createWinnerDataSuccess({ data: winner })),
          catchError(error => {
            console.error('Error occurred:', error);
            return of({ type: 'Error occurred' });
          }),
          tap(() => console.log('Winner processed successfully'))
        );
      })
    )
  );
  constructor(
    private actions$: Actions,
    private winnersHttpService: WinnersHttpService,
    private garageHttpService: GarageHttpService,

    private store: Store
  ) {}
}
