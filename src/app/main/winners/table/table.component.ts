import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectTotalWinnersCount,
  selectWinners,
} from '../../../Store/selectors';
import { CarComponent } from '../../garage/car/car.component';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, CarComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnInit {
  public totalWinnersCount$ = this.store.select(selectTotalWinnersCount);
  public winnersData$ = this.store.select(selectWinners);

  constructor(private store: Store) {}
  ngOnInit(): void {
    console.log('ngOnInit TrackComponent');
    this.store.dispatch({ type: '[Winners] Load Winners Data' });
    this.winnersData$.subscribe(data => {
      console.log('Cars data:', data);
    });
  }
}
