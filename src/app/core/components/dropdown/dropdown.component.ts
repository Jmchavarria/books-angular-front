import {
  afterNextRender,
  Component,
  computed,
  ElementRef,
  HostListener,
  Injector,
  input,
  signal,
} from '@angular/core';
import { DropdownCoordinatorService } from './services/dropdown-coordinator.service';

interface MenuPosition {
  top: number;
  left: number;
}

const MENU_MARGIN = 8;
const MENU_GAP = 4;
const MENU_WIDTH_FALLBACK = 160;

@Component({
  selector: 'app-dropdown',
  standalone: true,
  templateUrl: './dropdown.component.html',
})
export class DropdownComponent {
  readonly triggerId = input<string>('dropdown-trigger');
  readonly menuId = input<string>('dropdown-menu');

  readonly menuPosition = signal<MenuPosition | null>(null);
  readonly menuReady = signal<boolean>(false);

  readonly isOpen = computed(() => this.coordinator.isActive(this.menuId()));

  private triggerElement: HTMLElement | null = null;

  constructor(
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly injector: Injector,
    private readonly coordinator: DropdownCoordinatorService,
  ) {}

  toggleMenu(event: Event): void {
    event.stopPropagation();

    if (this.isOpen()) {
      this.closeMenu();
      return;
    }

    this.triggerElement = event.currentTarget as HTMLElement;

    this.menuReady.set(false);
    this.coordinator.open(this.menuId());

    const rect = this.triggerElement.getBoundingClientRect();

    this.menuPosition.set({
      top: rect.bottom + MENU_GAP,
      left: rect.right - MENU_WIDTH_FALLBACK,
    });

    afterNextRender(
      () => {
        this.positionMenu();
      },
      {
        injector: this.injector,
      },
    );
  }

  closeMenu(): void {
    const trigger = this.triggerElement;

    this.coordinator.close(this.menuId());
    this.menuPosition.set(null);
    this.menuReady.set(false);
    this.triggerElement = null;

    trigger?.focus();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (!this.isOpen()) {
      return;
    }

    const target = event.target as HTMLElement;

    const clickedInsideDropdown = this.elementRef.nativeElement.contains(target);

    if (!clickedInsideDropdown) {
      this.closeMenu();
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.isOpen()) {
      this.closeMenu();
    }
  }

  @HostListener('window:scroll')
  @HostListener('window:resize')
  onViewportChange(): void {
    if (this.isOpen()) {
      this.closeMenu();
    }
  }

  onMenuKeydown(event: KeyboardEvent): void {
    const menu = event.currentTarget as HTMLElement;

    const items = Array.from(menu.querySelectorAll<HTMLElement>('[role="menuitem"]'));

    if (items.length === 0) {
      return;
    }

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
    if (!this.triggerElement) {
      return;
    }

    const menuElement =
      this.elementRef.nativeElement.querySelector<HTMLElement>('[data-open-menu]');

    if (!menuElement) {
      return;
    }

    const triggerRect = this.triggerElement.getBoundingClientRect();
    const menuRect = menuElement.getBoundingClientRect();

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

    this.menuPosition.set({
      top,
      left,
    });

    this.menuReady.set(true);
  }
}
