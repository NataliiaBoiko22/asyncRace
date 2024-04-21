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
  tap,
  withLatestFrom,
} from 'rxjs';
import { GarageHttpService } from '../../core/services/http/garage-http.service';
import { loadCarsData, setTotalCountData } from '../actions/garage-actions';
import {
  selectCarPerPage,
  selectCurrentPage,
} from '../selectors';

@Injectable()
export class GarageEffects {
  loadCarsData$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType('[Cars] Load Cars Data'),
      withLatestFrom(
        this.store.select(selectCurrentPage),
        this.store.select(selectCarPerPage)
      ),
      exhaustMap(([, currentPage, carPerPage]) =>
        from(this.garageHttpService.getCarsList(currentPage, carPerPage)).pipe(
          tap(response => {
            const totalCountHeader = Number(
              response.headers.get('X-Total-Count')
            );
            this.store.dispatch(setTotalCountData({ data: totalCountHeader }));
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
    private garageHttpService: GarageHttpService,
    private store: Store
  ) {}
}
