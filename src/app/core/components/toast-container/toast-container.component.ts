import { Component, inject, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toast-wrapper" role="alert" aria-live="assertive">
      @for (toast of toastService.toasts(); track toast.id) {
        <div class="toast-card" [ngClass]="toast.type">
          <span class="toast-text">{{ toast.text }}</span>
          <button class="toast-btn-close" (click)="toastService.remove(toast.id)">&times;</button>
        </div>
      }
    </div>
  `,
  styleUrl: './toast-container.component.css',
})
export class ToastContainerComponent {
  constructor(public readonly toastService: ToastService) {}
}
