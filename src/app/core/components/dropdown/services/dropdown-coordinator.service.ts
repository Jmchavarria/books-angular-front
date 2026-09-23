import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DropdownCoordinatorService {
  private readonly activeId = signal<string | null>(null);

  isActive(id: string): boolean {
    return this.activeId() === id;
  }

  open(id: string): void {
    this.activeId.set(id);
  }

  close(id: string): void {
    if (this.activeId() === id) {
      this.activeId.set(null);
    }
  }

  closeAll(): void {
    this.activeId.set(null);
  }
}
