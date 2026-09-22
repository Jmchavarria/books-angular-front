import { Component, signal } from '@angular/core';

interface MenuPosition {
  top: number;
  left: number;
}

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [],
  templateUrl: './dropdown.component.html',
})
export class DropdownComponent {
  openMenuIndex = signal<number>(-1);
  private triggerElement: HTMLElement | null = null;

  menuPosition = signal<MenuPosition | null>(null);
  menuReady = signal(false);

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

  closeMenu(): void {
    const trigger = this.triggerElement;
    this.openMenuIndex.set(-1);
    this.menuPosition.set(null);
    this.menuReady.set(false);
    this.triggerElement = null;
    trigger?.focus();
  }
}
