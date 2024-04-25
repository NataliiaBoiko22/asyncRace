import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { setSortData } from '../../../Store/actions/winners-actions';
import * as SL from '../../../Store/selectors';
import { CarComponent } from '../../garage/car/car.component';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, CarComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit, OnDestroy {
  public totalWinnersCount$ = this.store.select(SL.selectTotalWinnersCount);
  public winnersData$ = this.store.select(SL.selectWinners);
  private winnersPerPageSubscription!: Subscription;
  private currentWinnersPageSubscription!: Subscription;
  currentPage!: number;
  winnersPerRage!: number;
  acsWins = 'DESC';
  acsTime = 'DESC';

  constructor(private store: Store) {}
  ngOnInit(): void {
    this.store.dispatch({
      type: '[Winners] Load Winners Data',
    });
    this.winnersPerPageSubscription = this.store
      .select(SL.selectWinnersPerPage)
      .subscribe(winners => {
        this.winnersPerRage = winners;
      });
    this.currentWinnersPageSubscription = this.store
      .select(SL.selectCurrentWinnersPage)
      .subscribe(page => {
        this.currentPage = page;
      });
  }
  sortWins() {
    this.acsWins = this.acsWins === 'ASC' ? 'DESC' : 'ASC';
    this.store.dispatch(setSortData({ sort: 'wins', order: this.acsWins }));
    this.store.dispatch({ type: '[Winners] Load Winners Data' });
  }
  sortTime() {
    this.acsTime = this.acsTime === 'ASC' ? 'DESC' : 'ASC';
    this.store.dispatch(setSortData({ sort: 'time', order: this.acsTime }));
    this.store.dispatch({ type: '[Winners] Load Winners Data' });
  }

  ngOnDestroy(): void {
    if (this.winnersPerPageSubscription) {
      this.winnersPerPageSubscription.unsubscribe();
    }
    if (this.currentWinnersPageSubscription) {
      this.currentWinnersPageSubscription.unsubscribe();
    }
  }
}
