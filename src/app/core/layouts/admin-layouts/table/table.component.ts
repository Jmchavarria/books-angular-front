import {
  Component,
  input,
  output,
  signal,
  HostListener,
  ElementRef,
  Injector,
  afterNextRender,
} from '@angular/core';

export interface Data<T> {
  key: T;
  value: T;
}

interface MenuPosition {
  top: number;
  left: number;
}

const MENU_MARGIN = 8; // separación mínima respecto al borde del viewport
const MENU_GAP = 4; // separación entre el botón y el menú
const MENU_WIDTH_FALLBACK = 160; // w-40, usado solo como posición provisional

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [],
  templateUrl: './table.component.html',
})
export class TableComponent<T extends object> {
  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private injector: Injector,
  ) {}

  // ==========================================
  // INPUTS, OUTPUTS Y SIGNALS
  // ==========================================
  data = input<T[]>([]);
  columns = input<(keyof T)[]>([]);

  onEdit = output<T>();
  onActivate = output<T>();
  onInactivate = output<T>();

  openMenuIndex = signal<number>(-1);
  menuPosition = signal<MenuPosition | null>(null);
  menuReady = signal(false); // true solo cuando ya calculamos la posición final

  private triggerElement: HTMLElement | null = null;

  // ==========================================
  // ESCUCHADORES GLOBALES
  // ==========================================
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (
      this.openMenuIndex() !== -1 &&
      !this.elementRef.nativeElement.contains(event.target as Node)
    ) {
      this.closeMenu();
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.openMenuIndex() !== -1) this.closeMenu();
  }

  @HostListener('window:scroll')
  @HostListener('window:resize')
  onViewportChange(): void {
    if (this.openMenuIndex() !== -1) this.closeMenu();
  }

  toggleMenu(index: number, event: Event): void {
    event.stopPropagation();

    if (this.openMenuIndex() === index) {
      this.closeMenu();
      return;
    }

    this.triggerElement = event.currentTarget as HTMLElement;
    this.menuReady.set(false);
    this.openMenuIndex.set(index);

    // Posición provisional para que el menú tenga layout y podamos medirlo
    const rect = this.triggerElement.getBoundingClientRect();
    this.menuPosition.set({
      top: rect.bottom + MENU_GAP,
      left: rect.right - MENU_WIDTH_FALLBACK,
    });

    // Esperamos a que Angular pinte el menú en el DOM antes de medir su tamaño real
    afterNextRender(
      () => {
        this.positionMenu();
        this.focusFirstMenuItem();
      },
      { injector: this.injector },
    );
  }

  closeMenu(): void {
    const trigger = this.triggerElement;
    this.openMenuIndex.set(-1);
    this.menuPosition.set(null);
    this.menuReady.set(false);
    this.triggerElement = null;
    trigger?.focus(); // devolvemos el foco al botón que abrió el menú (accesibilidad)
  }

  onMenuKeydown(event: KeyboardEvent): void {
    const menu = event.currentTarget as HTMLElement;
    const items = Array.from(menu.querySelectorAll<HTMLElement>('[role="menuitem"]'));
    const currentIndex = items.indexOf(document.activeElement as HTMLElement);

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        items[(currentIndex + 1) % items.length]?.focus();
        break;
      case 'ArrowUp':
        event.preventDefault();
        items[(currentIndex - 1 + items.length) % items.length]?.focus();
        break;
      case 'Home':
        event.preventDefault();
        items[0]?.focus();
        break;
      case 'End':
        event.preventDefault();
        items[items.length - 1]?.focus();
        break;
      case 'Tab':
        // El foco no debe "escaparse" del menú hacia el resto de la página
        this.closeMenu();
        break;
    }
  }

  private positionMenu(): void {
    if (!this.triggerElement) return;

    const menuEl = this.elementRef.nativeElement.querySelector<HTMLElement>('[data-open-menu]');
    if (!menuEl) return;

    const triggerRect = this.triggerElement.getBoundingClientRect();
    const menuRect = menuEl.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // --- Eje vertical: abrir hacia abajo; voltear hacia arriba si no cabe ---
    const spaceBelow = viewportHeight - triggerRect.bottom;
    const spaceAbove = triggerRect.top;
    let top: number;

    if (spaceBelow >= menuRect.height + MENU_GAP || spaceBelow >= spaceAbove) {
      top = triggerRect.bottom + MENU_GAP;
    } else {
      top = triggerRect.top - menuRect.height - MENU_GAP;
    }
    // Clamp final por si ni arriba ni abajo alcanza (pantallas muy chicas)
    top = Math.min(Math.max(top, MENU_MARGIN), viewportHeight - menuRect.height - MENU_MARGIN);

    // --- Eje horizontal: alineado a la derecha del botón; clamp si se sale ---
    let left = triggerRect.right - menuRect.width;
    left = Math.min(Math.max(left, MENU_MARGIN), viewportWidth - menuRect.width - MENU_MARGIN);

    this.menuPosition.set({ top, left });
    this.menuReady.set(true);
  }

  private focusFirstMenuItem(): void {
    const menuEl = this.elementRef.nativeElement.querySelector<HTMLElement>('[data-open-menu]');
    menuEl?.querySelector<HTMLElement>('[role="menuitem"]')?.focus();
  }

  formatHeader(key: any): string {
    return String(key)
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase());
  }

  getCellValue(item: T, column: any): string {
    const value = (item as any)[column];

    if (value === null || value === undefined || value === '') return '-';
    if (typeof value === 'boolean') return value ? 'Sí' : 'No';

    return String(value);
  }

  getProperties(obj: T): { key: string; value: any }[] {
    return Object.keys(obj).map((k) => ({ key: k, value: (obj as any)[k] }));
  }
}