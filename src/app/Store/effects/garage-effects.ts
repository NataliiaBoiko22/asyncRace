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
import {
  loadCarsData,
  setNewCarData,
  setSeclectedCarData,
  setTotalCountData,
} from '../actions/garage-actions';
import { selectCarPerPage, selectCurrentPage } from '../selectors';

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
        from(
          this.garageHttpService.getCarsListHttp(currentPage, carPerPage)
        ).pipe(
          tap(response => {
            const totalCountHeader = Number(
              response.headers.get('X-Total-Count')
            );
            this.store.dispatch(setTotalCountData({ data: totalCountHeader }));
            this.store.dispatch(
              setSeclectedCarData({
                data: { name: '', color: '#000000', id: 0 },
              })
            );
            this.store.dispatch(
              setNewCarData({
                data: { name: '', color: '#ffba08' },
              })
            );
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
