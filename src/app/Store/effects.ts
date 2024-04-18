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
} from 'rxjs';
import { HttpService } from '../core/services/http.service';
import { loadCarsData } from './actions';

@Injectable()
export class RaceEffects {
  loadCarsData$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType('[Cars] Load Cars Data'),
      exhaustMap(() =>
        from(this.httpService.getCarsList(1, 7)).pipe(
          take(1),
          map(receivedCarsData => loadCarsData({ data: receivedCarsData })),
          catchError(() => of({ type: 'Error occurred' }))
        )
      )
    )
  );
  constructor(
    private actions$: Actions,
    private httpService: HttpService
  ) {}
}
