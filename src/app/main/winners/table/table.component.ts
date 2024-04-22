import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
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
    console.log('object');
  }
  sortTime() {
    console.log('object');
  }
}
