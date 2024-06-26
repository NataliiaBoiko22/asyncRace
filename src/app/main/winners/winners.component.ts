import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PaginationComponent } from '../../core/components/pagination/pagination.component';
import { TableComponent } from './table/table.component';

@Component({
  selector: 'app-winners',
  standalone: true,
  imports: [CommonModule, PaginationComponent, TableComponent],
  templateUrl: './winners.component.html',
  styleUrl: './winners.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WinnersComponent {}
