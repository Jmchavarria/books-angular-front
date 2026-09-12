import { Component, HostListener, input, output, signal, Type } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroXMark } from '@ng-icons/heroicons/outline';

export interface TabOption {
  id: string;
  label: string;
}
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
  size = input<string | null>();

  // Soporte para pestañas
  tabs = input<TabOption[]>([]);
  activeTab = signal<string>('');
  tabChange = output<string>();

  selectTab(tabId: string) {
    this.activeTab.set(tabId);
    this.tabChange.emit(tabId);
  }

  @HostListener('document:keydown.esc')
  handleKeyEvent(): void {
    this.handleCancel();
  }

  handleCancel(): void {
    this.onCancel.emit();
  }
}
