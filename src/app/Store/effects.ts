import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import {
  catchError,
  exhaustMap,
  from,
  map,
  Observable,
  of,
  take,
  tap,
  withLatestFrom,
} from 'rxjs';
import { HttpService } from '../core/services/http.service';
import { loadCarsData, setTotalCountData } from './actions';
import { selectCurrentPage } from './selectors';

@Injectable()
export class RaceEffects {
  loadCarsData$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType('[Cars] Load Cars Data'),
      withLatestFrom(this.store.select(selectCurrentPage)),
      exhaustMap(([action, currentPage]) =>
        from(this.httpService.getCarsList(currentPage, 7)).pipe(
          tap(response => {
            const totalCountHeader = Number(
              response.headers.get('X-Total-Count')
            );
            this.store.dispatch(setTotalCountData({ data: totalCountHeader }));
            console.log('Total count:', totalCountHeader);
          }),
          map(response => {
            const receivedCarsData = response.body;
            return loadCarsData({
              data: receivedCarsData ? receivedCarsData : [],
            });
          }),
          catchError(() => of({ type: 'Error occurred' }))
        )
      )
    )
  );
  constructor(
    private actions$: Actions,
    private httpService: HttpService,
    private store: Store
  ) {}
}
