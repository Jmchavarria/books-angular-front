import { Component, HostListener, input, output } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroXMark } from '@ng-icons/heroicons/outline';
@Component({
  selector: 'app-modal',
  standalone: true,
  providers: [
    provideIcons({
      heroXMark,
    }),
  ],
  imports: [NgIcon],
  templateUrl: './modal.component.html',
})
export class ModalComponent {
  title = input<string | null>();
  description = input<string | null>();
  onCancel = output<void>();

  @HostListener('document:keydown.esc')
  handleKeyEvent(): void {
    this.handleCancel();
  }

  handleCancel(): void {
    this.onCancel.emit();
  }
}
