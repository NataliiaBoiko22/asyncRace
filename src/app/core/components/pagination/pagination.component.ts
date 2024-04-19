import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { setCurrentPage } from '../../../Store/actions';
import { selectCars, selectCurrentPage } from '../../../Store/selectors';
import { CarsResponseBody } from '../../models/car';
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
  totalResults$!: Observable<CarsResponseBody>;
  totalPages = 100;
  currentPage$!: Observable<number | null>;
  currentPage!: number;
  @Output() pageChange = new EventEmitter<number>();
  constructor(private store: Store) {}
  ngOnInit() {
    this.totalResults$ = this.store.select(selectCars);
    this.currentPage$ = this.store.select(selectCurrentPage);
    this.currentPage$.subscribe(currentPage => {
      this.currentPage = currentPage !== null ? currentPage : 1;
    });
  }
  get totalPages$(): Observable<number> {
    return this.totalResults$.pipe(
      map((totalResults: CarsResponseBody) =>
        Math.ceil(totalResults.length / 7)
      )
    );
  }
  navigateToPage(currentPage: number) {
    this.totalPages$.subscribe(totalPages => {
      if (currentPage >= 1 && currentPage <= totalPages) {
        this.pageChange.emit(currentPage);
      }
    });
  }
  goToNextPage(exCurrentPage: number): void {
    const currentPage = exCurrentPage + 1;
    this.store.dispatch(setCurrentPage({ currentPage }));
    localStorage.setItem('currentPageGarage', currentPage.toString());
    this.store.dispatch({ type: '[Cars] Load Cars Data' });
  }

  goToPrevPage(exCurrentPage: number): void {
    const currentPage = exCurrentPage - 1;
    this.store.dispatch(setCurrentPage({ currentPage }));
    localStorage.setItem('currentPageGarage', currentPage.toString());
    this.store.dispatch({ type: '[Cars] Load Cars Data' });
  }
}
