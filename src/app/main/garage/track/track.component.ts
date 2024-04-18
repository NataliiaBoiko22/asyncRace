import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectCars } from '../../../Store/selectors';
import { CarComponent } from '../car/car.component';

@Component({
  selector: 'app-track',
  standalone: true,
  imports: [CarComponent, CommonModule],
  templateUrl: './track.component.html',
  styleUrl: './track.component.scss',
})
export class TrackComponent implements OnInit {
  @ViewChild('carImage') carImage!: ElementRef;
  move = false;
  public carsData$ = this.store.select(selectCars);
  currentPage$!: Observable<number>;

  constructor(private store: Store) {}
  ngOnInit(): void {
    console.log('ngOnInit TrackComponent');
    this.store.dispatch({ type: '[Cars] Load Cars Data' });
    this.carsData$.subscribe(data => {
      console.log('Cars data:', data);
    });
  }
}
