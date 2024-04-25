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
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs';
import { GarageHttpService } from '../../core/services/http/garage-http.service';
import * as GA from '../actions/garage-actions';
import {
  selectCarPerPage,
  selectCurrentPage,
  selectTotalCount,
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
        from(
          this.garageHttpService.getCarsListHttp(currentPage, carPerPage)
        ).pipe(
          tap(response => {
            const totalCountHeader = Number(
              response.headers.get('X-Total-Count')
            );
            this.store.dispatch(
              GA.setTotalCountData({ data: totalCountHeader })
            );
            this.store.dispatch(
              GA.setCurrentPage({ currentPage: currentPage })
            );
          }),
          map(response => {
            const receivedCarsData = response.body;
            return GA.loadCarsDataSuccess({
              data: receivedCarsData ? receivedCarsData : [],
            });
          }),
          catchError(() => of({ type: 'Error occurred' }))
        )
      )
    )
  );
  
  updateCar$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GA.setUpdateCarData),

      exhaustMap(action =>
        from(this.garageHttpService.updateCarHttp(action.data)).pipe(
          map(dataRequest => GA.setUpdateCarDataSuccess({ data: dataRequest })),
          tap(() => {
            this.store.dispatch(GA.setAreCarsMoving({ areCarsMoving: false }));
            this.store.dispatch(
              GA.setSelectedCarData({
                data: { name: '', color: '#000000', id: 0 },
              })
            );
          }),
          catchError(() => of({ type: 'Error occurred' } as Action))
        )
      )
    )
  );

  createCar$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GA.setNewCarData),
      withLatestFrom(
        this.store.select(selectTotalCount),
        this.store.select(selectCarPerPage)
      ),
      switchMap(([action, totalCount, carPerPage]) =>
        this.garageHttpService.createCarHttp(action.data).pipe(
          exhaustMap(() => {
            const totalPages = Math.ceil(totalCount / carPerPage);
            this.store.dispatch(GA.setCurrentPage({ currentPage: totalPages }));
            this.store.dispatch(GA.setAreCarsMoving({ areCarsMoving: false }));
            this.store.dispatch(GA.setNameForNewCarData({ data: '' }));

            this.store.dispatch(GA.setColorForNewCarData({ data: '#ffba08' }));
            return of({ type: '[Cars] Load Cars Data' });
          })
        )
      ),
      catchError(() => of({ type: 'Error occurred' }))
    )
  );

  constructor(
    private actions$: Actions,
    private garageHttpService: GarageHttpService,
    private store: Store
  ) {}
}
