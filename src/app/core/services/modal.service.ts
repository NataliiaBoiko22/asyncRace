import { Injectable } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ModalComponent } from '../components/modal/modal.component';
@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private overlayRef: OverlayRef | null = null;

  constructor(private overlay: Overlay) {}

  open(title: string, content: string): void {
    this.close();

    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-dark-backdrop',
      positionStrategy: this.overlay
        .position()
        .global()
        .centerHorizontally()
        .centerVertically(),
    });

    const modalPortal = new ComponentPortal(ModalComponent);

    const componentRef = this.overlayRef.attach(modalPortal);
    componentRef.instance.title = title;
    componentRef.instance.content = content;
    componentRef.instance.closeModal.subscribe(() => this.close());
  }

  close(): void {
    if (this.overlayRef) {
      this.overlayRef.detach();
      this.overlayRef = null;
    }
  }
}
