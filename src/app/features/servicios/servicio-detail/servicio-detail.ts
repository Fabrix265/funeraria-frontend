import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Servicio } from '../../../core/services/servicio';
import { PasajeroService } from '../../../core/services/pasajero';
import { PagoService } from '../../../core/services/pago';
import { ToastService } from '../../../core/services/toast';
import { Pago } from '../../../core/models/pago.model';
import { puedeActualizar, puedeEliminar as puedeEliminarFn, puedeCrear } from '../../../core/utils/auth.utils';
import { loadStripe, Stripe, StripeCardElement } from '@stripe/stripe-js';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-servicio-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './servicio-detail.html',
  styleUrls: ['./servicio-detail.css'],
})
export class ServicioDetail implements OnInit {
  puedeEditar = puedeActualizar('servicios');
  puedeEliminar = puedeEliminarFn('servicios');
  puedeCrearPasajeros = puedeCrear('pasajeros');
  puedeActualizarPasajeros = puedeActualizar('pasajeros');
  puedeEliminarPasajeros = puedeEliminarFn('pasajeros');

  servicio: any = null;
  cargando = true;
  modalEliminarAbierto = false;

  pasajeros: any[] = [];
  cargandoPasajeros = false;

  modalPasajeroAbierto = false;
  modoEdicionPasajero = false;
  pasajeroSeleccionado: any = null;
  formPasajero = { nombre: '', dni_pasajero: '' };

  modalPagoAbierto = false;
  modalEliminarPasajeroAbierto = false;
  pasajeroEliminar: any = null;
  stripe: Stripe | null = null;
  cardElement: StripeCardElement | null = null;
  pagando = false;
  mensajePago = '';
  pagoExitoso = false;
  historialPagos: Pago[] = [];

  constructor(
    private route: ActivatedRoute,
    private servicioService: Servicio,
    private pasajeroService: PasajeroService,
    private pagoService: PagoService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private toast: ToastService,
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.servicioService.obtener(Number(idParam)).subscribe({
        next: (res) => {
          this.servicio = res;
          this.cargando = false;
          this.cargarPasajeros();
          this.cargarHistorialPagos();
          this.cdr.detectChanges();
        },
        error: () => {
          this.cargando = false;
          this.cdr.detectChanges();
        },
      });
    }
  }

  cargarPasajeros(): void {
    if (!this.servicio) return;
    this.cargandoPasajeros = true;
    this.pasajeroService.listar(this.servicio.id).subscribe({
      next: (data) => {
        this.pasajeros = data;
        this.cargandoPasajeros = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.pasajeros = [];
        this.cargandoPasajeros = false;
        this.cdr.detectChanges();
      },
    });
  }

  abrirModalCrearPasajero(): void {
    this.modoEdicionPasajero = false;
    this.pasajeroSeleccionado = null;
    this.formPasajero = { nombre: '', dni_pasajero: '' };
    this.modalPasajeroAbierto = true;
  }

  abrirModalEditarPasajero(p: any): void {
    this.modoEdicionPasajero = true;
    this.pasajeroSeleccionado = p;
    this.formPasajero = { nombre: p.nombre, dni_pasajero: p.dni_pasajero };
    this.modalPasajeroAbierto = true;
  }

  cerrarModalPasajero(): void {
    this.modalPasajeroAbierto = false;
  }

  guardarPasajero(): void {
    if (!this.formPasajero.nombre || !this.formPasajero.dni_pasajero) return;

    if (this.modoEdicionPasajero && this.pasajeroSeleccionado) {
      this.pasajeroService.actualizar(this.pasajeroSeleccionado.id, this.formPasajero).subscribe({
        next: () => {
          this.toast.mostrar('Pasajero actualizado', 'exito');
          this.cargarPasajeros();
          this.cerrarModalPasajero();
        },
        error: (e) => this.toast.mostrar(e.error?.detail || 'Error al actualizar pasajero', 'error'),
      });
    } else {
      this.pasajeroService.crear(this.servicio.id, this.formPasajero).subscribe({
        next: () => {
          this.toast.mostrar('Pasajero agregado', 'exito');
          this.cargarPasajeros();
          this.cerrarModalPasajero();
        },
        error: (e) => this.toast.mostrar(e.error?.detail || 'Error al crear pasajero', 'error'),
      });
    }
  }

  eliminarPasajero(p: any): void {
    this.pasajeroEliminar = p;
    this.modalEliminarPasajeroAbierto = true;
  }

  cerrarModalEliminarPasajero(): void {
    this.modalEliminarPasajeroAbierto = false;
    this.pasajeroEliminar = null;
  }

  confirmarEliminarPasajero(): void {
    if (!this.pasajeroEliminar) return;
    this.pasajeroService.eliminar(this.pasajeroEliminar.id).subscribe({
      next: () => {
        this.toast.mostrar('Pasajero eliminado', 'exito');
        this.cargarPasajeros();
        this.cerrarModalEliminarPasajero();
      },
      error: (e) => this.toast.mostrar(e.error?.detail || 'Error al eliminar pasajero', 'error'),
    });
  }

  abrirModalEliminar(): void { this.modalEliminarAbierto = true; }
  cerrarModalEliminar(): void { this.modalEliminarAbierto = false; }

  confirmarEliminar(): void {
    if (!this.servicio) return;
    this.servicioService.eliminar(this.servicio.id).subscribe({
      next: () => {
        this.toast.mostrar('Servicio eliminado', 'exito');
        setTimeout(() => this.router.navigate(['/servicios']), 1200);
      },
      error: (e) => {
        this.toast.mostrar(e.error?.detail || 'Error al eliminar servicio', 'error');
        this.cerrarModalEliminar();
      },
    });
  }

  cargarHistorialPagos(): void {
    this.pagoService.obtenerPorServicio(this.servicio.id).subscribe({
      next: (pagos) => {
        this.historialPagos = pagos;
        this.cdr.detectChanges();
      },
      error: () => {},
    });
  }

  async abrirModalPago(): Promise<void> {
    this.modalPagoAbierto = true;
    this.mensajePago = '';
    this.pagoExitoso = false;

    this.stripe = await loadStripe(environment.stripePublicKey);
    if (!this.stripe) return;

    setTimeout(() => {
      const elements = this.stripe!.elements();
      this.cardElement = elements.create('card', {
        style: {
          base: {
            fontSize: '15px',
            color: '#e8edf5',
            fontFamily: "'DM Sans', sans-serif",
            '::placeholder': { color: '#7a92b0' },
          },
          invalid: { color: '#e87070' },
        },
      });
      this.cardElement.mount('#card-element');
    }, 150);
  }

  cerrarModalPago(): void {
    this.modalPagoAbierto = false;
    if (this.cardElement) {
      this.cardElement.destroy();
      this.cardElement = null;
    }
  }

  async pagar(): Promise<void> {
    if (!this.stripe || !this.cardElement || !this.servicio) return;

    this.pagando = true;
    this.mensajePago = '';

    const montoEnCentavos = Math.round(this.servicio.costo * 100);

    this.pagoService.crearIntent({
      id_servicio: this.servicio.id,
      monto: montoEnCentavos,
      moneda: 'pen',
      descripcion: `Servicio #${this.servicio.id} - ${this.servicio.fallecido?.nombre}`,
    }).subscribe({
      next: async (pago) => {
        const result = await this.stripe!.confirmCardPayment(pago.client_secret!, {
          payment_method: { card: this.cardElement! },
        });

        if (result.error) {
          this.mensajePago = result.error.message ?? 'Error al procesar el pago';
          this.pagoExitoso = false;
        } else {
          this.mensajePago = '¡Pago realizado con éxito!';
          this.pagoExitoso = true;
          this.cargarHistorialPagos();
        }

        this.pagando = false;
        this.cdr.detectChanges();
      },
      error: (e) => { this.mensajePago = e.error?.detail || 'Error al conectar con el servidor'; this.pagando = false; this.cdr.detectChanges(); },
    });
  }

  etiquetaVehiculo(tipo: string): string {
    const map: Record<string, string> = {
      porta_ataud: 'Porta ataúd',
      porta_flores: 'Porta flores',
      mixto: 'Mixto',
      auto: 'Auto',
      microbus: 'Microbús',
    };
    return map[tipo] ?? tipo;
  }

  etiquetaEstadoPago(estado: string): string {
    const map: Record<string, string> = {
      pendiente: 'Pendiente',
      completado: 'Completado',
      fallido: 'Fallido',
      cancelado: 'Cancelado',
    };
    return map[estado] ?? estado;
  }
}