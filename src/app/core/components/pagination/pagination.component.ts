import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, map, Observable } from 'rxjs';
import { setCurrentPage } from '../../../Store/actions/garage-actions';
import { setCurrentWinnersPage } from '../../../Store/actions/winners-actions';
import {
  selectCarPerPage,
  selectCurrentPage,
  selectCurrentWinnersPage,
  selectTotalCount,
  selectTotalWinnersCount,
  selectWinnersPerPage,
} from '../../../Store/selectors';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [ButtonComponent, CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
  animations: [
    trigger('pageChange', [
      transition(':increment, :decrement', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate(
          '300ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
    ]),
  ],
})
export class PaginationComponent implements OnInit {
  @Input() isWinnerPage: boolean = false;
  totalPages$!: Observable<number | null>;
  totalPages!: number;
  firstPage = 1;
  currentPage$!: Observable<number | null>;
  currentPage!: number;
  @Output() pageChange = new EventEmitter<number>();
  constructor(private store: Store) {}
  ngOnInit() {
    this.currentPage$ = this.isWinnerPage
      ? this.store.select(selectCurrentWinnersPage)
      : this.store.select(selectCurrentPage);
    this.currentPage$.subscribe(currentPage => {
      this.currentPage = currentPage !== null ? currentPage : 1;
    });
    if (this.isWinnerPage) {
      combineLatest([
        this.store.select(selectTotalWinnersCount),
        this.store.select(selectWinnersPerPage),
      ])
        .pipe(
          map(([totalWinnersCount, winnersPerPage]) => {
            return Math.ceil(totalWinnersCount / winnersPerPage);
          })
        )
        .subscribe(totalPages => {
          this.totalPages = totalPages;
        });
    } else {
      combineLatest([
        this.store.select(selectTotalCount),
        this.store.select(selectCarPerPage),
      ])
        .pipe(
          map(([totalCount, carPerPage]) => {
            return Math.ceil(totalCount / carPerPage);
          })
        )
        .subscribe(totalPages => {
          this.totalPages = totalPages;
        });
    }
  }

  navigateToPage(page: number) {
    const currentPage = page;
    if (this.isWinnerPage) {
      this.store.dispatch(setCurrentWinnersPage({ currentPage }));
      sessionStorage.setItem('currentPageWinners', currentPage.toString());
      this.store.dispatch({ type: '[Winners] Load Winners Data' });
    } else {
      this.store.dispatch(setCurrentPage({ currentPage }));
      sessionStorage.setItem('currentPageGarage', currentPage.toString());
      this.store.dispatch({ type: '[Cars] Load Cars Data' });
    }
  }
  goToNextPage(exCurrentPage: number): void {
    const currentPage = exCurrentPage + 1;
    if (this.isWinnerPage) {
      this.store.dispatch(setCurrentWinnersPage({ currentPage }));
      sessionStorage.setItem('currentPageWinners', currentPage.toString());
      this.store.dispatch({ type: '[Winners] Load Winners Data' });
    } else {
      this.store.dispatch(setCurrentPage({ currentPage }));
      sessionStorage.setItem('currentPageGarage', currentPage.toString());
      this.store.dispatch({ type: '[Cars] Load Cars Data' });
    }
  }

  goToPrevPage(exCurrentPage: number): void {
    const currentPage = exCurrentPage - 1;
    if (this.isWinnerPage) {
      this.store.dispatch(setCurrentWinnersPage({ currentPage }));
      sessionStorage.setItem('currentPageWinners', currentPage.toString());
      this.store.dispatch({ type: '[Winners] Load Winners Data' });
    } else {
      this.store.dispatch(setCurrentPage({ currentPage }));
      sessionStorage.setItem('currentPageGarage', currentPage.toString());
      this.store.dispatch({ type: '[Cars] Load Cars Data' });
    }
  }
}
