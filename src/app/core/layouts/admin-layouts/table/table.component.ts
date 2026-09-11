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
import { provideIcons, NgIcon } from '@ng-icons/core';
import { heroPencilSquare } from '@ng-icons/heroicons/outline';
import { TableAction } from '../../../types/table.type';

interface MenuPosition {
  top: number;
  left: number;
}

export interface objectData<T> {
  data: T[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

const MENU_MARGIN = 8; // separación mínima respecto al borde del viewport
const MENU_GAP = 4; // separación entre el botón y el menú
const MENU_WIDTH_FALLBACK = 160; // w-40, usado solo como posición provisional

@Component({
  selector: 'app-table',
  standalone: true,
  providers: [
    provideIcons({
      heroPencilSquare,
    }),
  ],
  templateUrl: './table.component.html',
  imports: [NgIcon],
})
export class TableComponent<T extends object> {
  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private injector: Injector,
  ) {}

  data = input<objectData<T>>({
    data: [],
    page: 0,
    limit: 0,
    total: 0,
    totalPages: 0,
  });

  columns = input<string[]>([]);
  pageChange = output<{ name: string; value: unknown }[]>();
  pageSizeOptions: number[] = [3, 5, 7];

  actions = input<TableAction[]>([]);
  actionClick = output<{ action: TableAction; item: T }>();

  openMenuIndex = signal<number>(-1);
  menuPosition = signal<MenuPosition | null>(null);
  menuReady = signal(false);

  changePage(newPage: number): void {
    if (newPage >= 1 && newPage <= this.data()?.totalPages) {
      this.pageChange.emit([
        { name: 'takeQuery', value: this.data().limit },
        { name: 'pageQuery', value: newPage },
      ]);
    }
  }

  onchangeLimit(newLimit: Event) {
    const element = newLimit.target as HTMLSelectElement;

    this.pageChange.emit([
      { name: 'takeQuery', value: Number(element.value) },
      { name: 'pageQuery', value: 1 },
    ]);
  }

  private triggerElement: HTMLElement | null = null;

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (this.openMenuIndex() === -1) return;

    const target = event.target as HTMLElement;
    const clickedInsideMenu = target.closest('[data-open-menu]');
    const clickedTrigger = this.triggerElement?.contains(target);

    if (!clickedInsideMenu && !clickedTrigger) {
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

    const rect = this.triggerElement.getBoundingClientRect();
    this.menuPosition.set({
      top: rect.bottom + MENU_GAP,
      left: rect.right - MENU_WIDTH_FALLBACK,
    });

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
    trigger?.focus();
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

    const spaceBelow = viewportHeight - triggerRect.bottom;
    const spaceAbove = triggerRect.top;
    let top: number;

    if (spaceBelow >= menuRect.height + MENU_GAP || spaceBelow >= spaceAbove) {
      top = triggerRect.bottom + MENU_GAP;
    } else {
      top = triggerRect.top - menuRect.height - MENU_GAP;
    }
    top = Math.min(Math.max(top, MENU_MARGIN), viewportHeight - menuRect.height - MENU_MARGIN);

    let left = triggerRect.right - menuRect.width;
    left = Math.min(Math.max(left, MENU_MARGIN), viewportWidth - menuRect.width - MENU_MARGIN);

    this.menuPosition.set({ top, left });
    this.menuReady.set(true);
  }

  private focusFirstMenuItem(): void {
    const menuEl = this.elementRef.nativeElement.querySelector<HTMLElement>('[data-open-menu]');
    menuEl?.querySelector<HTMLElement>('[role="menuitem"]')?.focus();
  }

  formatHeader(column: string): string {
    return column
      .split('.')
      .map((part) => part.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase()))
      .join(' ');
  }

  getCellValue(item: T, column: string): string {
    const value = this.getNestedValue(item, column);

    if (value === null || value === undefined || value === '') {
      return '-';
    }

    if (typeof value === 'boolean') {
      return value ? 'Sí' : 'No';
    }

    if (Array.isArray(value)) {
      return value.length > 0 ? value.map((item) => this.formatObjectValue(item)).join(', ') : '-';
    }

    if (typeof value === 'object') {
      return this.formatObjectValue(value);
    }

    return String(value);
  }

  private getNestedValue(item: T, path: string): unknown {
    return path.split('.').reduce<unknown>((current, key) => {
      if (current !== null && typeof current === 'object' && key in current) {
        return (current as Record<string, unknown>)[key];
      }

      return undefined;
    }, item);
  }

  private formatObjectValue(value: unknown): string {
    if (value === null || value === undefined) {
      return '-';
    }

    if (typeof value !== 'object') {
      return String(value);
    }

    if (Array.isArray(value)) {
      return value.map((item) => this.formatObjectValue(item)).join(', ');
    }

    const object = value as Record<string, unknown>;

    return Object.entries(object)
      .filter(([, value]) => value !== null && value !== undefined && value !== '')
      .map(([key, value]) => {
        const formattedKey = this.formatHeader(key);
        const formattedValue = this.formatObjectValue(value);

        return `${formattedKey}: ${formattedValue}`;
      })
      .join(' | ');
  }

  getProperties(obj: T): { key: string; value: any }[] {
    return Object.keys(obj).map((k) => ({ key: k, value: (obj as any)[k] }));
  }
}
