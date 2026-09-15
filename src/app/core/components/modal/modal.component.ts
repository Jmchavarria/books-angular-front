import { Component, effect, HostListener, input, output, signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroXMark } from '@ng-icons/heroicons/outline';

export interface TabOption {
  id: string;
  label: string;
}

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' | 'full';

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
  title = input<string | null>(null);
  description = input<string | null>(null);
  size = input<ModalSize>('md'); // Valor por defecto

  onCancel = output<void>();

  // Soporte para pestañas
  tabs = input<TabOption[]>([]);
  activeTab = signal<string>('');
  tabChange = output<string>();

  // Mapa de clases de Tailwind según el tamaño recibido
  protected readonly sizeClasses: Record<ModalSize, string> = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '4xl': 'max-w-4xl',
    full: 'max-w-full mx-4',
  };

  constructor() {
    // Autoselect primera pestaña si no hay una activa
    effect(() => {
      const currentTabs = this.tabs();
      if (currentTabs.length > 0 && !this.activeTab()) {
        this.activeTab.set(currentTabs[0].id);
      }
    });
  }

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
