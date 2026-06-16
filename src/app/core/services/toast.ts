import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ToastService {
  mensaje = signal('');
  tipoMensaje = signal<'exito' | 'error'>('exito');

  private timer: any;

  mostrar(texto: string, tipo: 'exito' | 'error'): void {
    clearTimeout(this.timer);
    this.mensaje.set(texto);
    this.tipoMensaje.set(tipo);
    this.timer = setTimeout(() => this.mensaje.set(''), 3500);
  }
}
