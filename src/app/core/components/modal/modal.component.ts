import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent implements OnInit {
  @Output() closeModal = new EventEmitter<void>();

  title: string = '';
  content: string = '';
  ngOnInit(): void {
    setTimeout(() => {
      this.close();
    }, 3500);
  }
  close(): void {
    this.closeModal.emit();
  }
}
