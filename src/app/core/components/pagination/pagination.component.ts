import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, map, Observable } from 'rxjs';
import {
  setAreCarsMoving,
  setCurrentPage,
} from '../../../Store/actions/garage-actions';
import { setCurrentWinnersPage } from '../../../Store/actions/winners-actions';
import * as SL from '../../../Store/selectors';
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
      ? this.store.select(SL.selectCurrentWinnersPage)
      : this.store.select(SL.selectCurrentPage);
    this.currentPage$.subscribe(currentPage => {
      this.currentPage = currentPage !== null ? currentPage : 1;
    });
    if (this.isWinnerPage) {
      combineLatest([
        this.store.select(SL.selectTotalWinnersCount),
        this.store.select(SL.selectWinnersPerPage),
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
        this.store.select(SL.selectTotalCount),
        this.store.select(SL.selectCarPerPage),
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
    this.updateCurrentPage(page);
  }

  goToNextPage(exCurrentPage: number): void {
    this.updateCurrentPage(exCurrentPage + 1);
  }

  goToPrevPage(exCurrentPage: number): void {
    this.updateCurrentPage(exCurrentPage - 1);
  }

  private updateCurrentPage(page: number) {
    const currentPage = page;
    const action = this.isWinnerPage ? setCurrentWinnersPage : setCurrentPage;
    this.store.dispatch(action({ currentPage }));
    sessionStorage.setItem(
      this.isWinnerPage ? 'currentPageWinners' : 'currentPageGarage',
      currentPage.toString()
    );
    this.store.dispatch({
      type: this.isWinnerPage
        ? '[Winners] Load Winners Data'
        : '[Cars] Load Cars Data',
    });
    this.store.dispatch(setAreCarsMoving({ areCarsMoving: false }));
  }
}
