import { Injectable, signal } from '@angular/core';

interface ToastMessage {
  id: number;
  text: string;
  type: ToastType;
}

type ToastType = 'success' | 'error' | 'info';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toasts = signal<ToastMessage[]>([]);

  show(text: string, type: ToastType, duration = 3000) {
    // verifica si ya existe una alerta, para evitar duplicado
    const exist = this.toasts().some((toast) => toast.text === text);

    if (exist) return;
    const id = Date.now();

    this.toasts.update((current) => [...current, { id, text, type }]);

    setTimeout(() => {
      this.remove(id);
    }, duration);
  }

  remove(id: number) {
    this.toasts.update((current) => current.filter((t) => t.id !== id));
  }
}
