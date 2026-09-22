import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TableUtilsService<T> {
  public getCellValue(item: T, column: string): string {
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

  formatHeader(column: string): string {
    return column
      .split('.')
      .map((part) => part.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase()))
      .join(' ');
  }
}
