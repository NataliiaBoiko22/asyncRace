import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { setSortData } from '../../../Store/actions/winners-actions';
import {
  selectCurrentWinnersPage,
  selectTotalWinnersCount,
  selectWinners,
  selectWinnersPerPage,
} from '../../../Store/selectors';
import { CarComponent } from '../../garage/car/car.component';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, CarComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit {
  public totalWinnersCount$ = this.store.select(selectTotalWinnersCount);
  public winnersData$ = this.store.select(selectWinners);
  currentPage!: number;
  winnersPerRage!: number;
  acsWins = 'DESC';
  acsTime = 'DESC';

  constructor(private store: Store) {}
  ngOnInit(): void {
    this.store.dispatch({ type: '[Winners] Load Winners Data' });
    this.store.select(selectWinnersPerPage).subscribe(winners => {
      this.winnersPerRage = winners;
    });
    this.store.select(selectCurrentWinnersPage).subscribe(page => {
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
}
