import { Component, OnInit, NgZone, ChangeDetectorRef } from '@angular/core';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Servicio } from '../../../core/services/servicio';
import { ReniecService } from '../../../core/services/reniec';
import { ToastService } from '../../../core/services/toast';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-servicio-create',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './servicio-create.html',
  styleUrls: ['./servicio-create.css'],
})
export class ServicioCreate implements OnInit {
  private mainApi = environment.apiUrl;

  ataudes: any[] = [];
  capillas: any[] = [];
  vehiculos: any[] = [];

  esEdicion = false;
  idEditar: number | null = null;
  guardando = false;
  iaMeta: any = null;

  verificandoFallecido = false;
  verificandoContratante = false;
  fallecidoVerificado = false;
  contratanteVerificado = false;

  form: any = {
    direccion_velacion: '',
    tipo_pago: 'directo',
    costo: 0,
    fecha: '',
    id_capilla: null,
    id_ataud: null,
    cantidad_cargadores: null,
    fallecido: { nombre: '', dni_fallecido: '' },
    contratante: { nombre: '', dni: '', telefono: '' },
    ids_vehiculos: [],
    pasajeros: [],
  };

  pasajeroForm = { nombre: '', dni_pasajero: '' };
  modalPasajeroAbierto = false;
  modoEdicionPasajero = false;
  pasajeroEditandoIndex: number | null = null;

  readonly tiposPago = ['directo', 'seguro', 'mixto'];

  constructor(
    private servicioService: Servicio,
    private reniecService: ReniecService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private zone: NgZone,
    private toast: ToastService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarCatalogos();

    const state = history.state;
    if (state?.ia) {
      this.aplicarDatosIA(state.ia);
    }

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.esEdicion = true;
      this.idEditar = Number(idParam);
      this.cargarDatos(this.idEditar);
    }
  }

  aplicarDatosIA(ia: any): void {
    this.iaMeta = ia;
    this.form.direccion_velacion = ia.direccion_velacion || '';
    this.form.tipo_pago = ia.tipo_pago || 'directo';
    this.form.costo = ia.costo || 0;
    this.form.fecha = ia.fecha || '';
    this.form.cantidad_cargadores = ia.cantidad_cargadores || null;
    this.form.fallecido.nombre = ia.fallecido_nombre || '';
    this.form.fallecido.dni_fallecido = ia.fallecido_dni || '';
    this.form.contratante.nombre = ia.contratante_nombre || '';
    this.form.contratante.dni = ia.contratante_dni || '';
    this.form.contratante.telefono = ia.contratante_telefono || '';

    if (this.form.fallecido.nombre && this.form.fallecido.dni_fallecido) {
      this.fallecidoVerificado = true;
    }
    if (this.form.contratante.nombre && this.form.contratante.dni) {
      this.contratanteVerificado = true;
    }
  }

  cargarCatalogos(): void {
    this.http.get<any[]>(`${this.mainApi}/coffins?activo=true`).subscribe({
      next: (res) => this.zone.run(() => (this.ataudes = res)),
    });
    this.http.get<any[]>(`${this.mainApi}/chapels?activo=true`).subscribe({
      next: (res) => this.zone.run(() => (this.capillas = res)),
    });
    this.http.get<any[]>(`${this.mainApi}/vehicles?activo=true`).subscribe({
      next: (res) => this.zone.run(() => (this.vehiculos = res)),
    });
  }

  cargarDatos(id: number): void {
    this.servicioService.obtener(id).subscribe({
      next: (res: any) => {
        this.zone.run(() => {
          this.form = {
            direccion_velacion: res.direccion_velacion,
            tipo_pago: res.tipo_pago,
            costo: res.costo,
            fecha: res.fecha,
            id_capilla: res.capilla?.id ?? null,
            id_ataud: res.ataud?.id ?? null,
            cantidad_cargadores: res.cantidad_cargadores ?? null,
            fallecido: {
              nombre: res.fallecido?.nombre ?? '',
              dni_fallecido: res.fallecido?.dni_fallecido ?? '',
            },
            contratante: {
              nombre: res.contratante?.nombre ?? '',
              dni: res.contratante?.dni ?? '',
              telefono: res.contratante?.telefono ?? '',
            },
            ids_vehiculos: res.vehiculos_asignados
              ? res.vehiculos_asignados.map((v: any) => v.id)
              : [],
            pasajeros: res.pasajeros
              ? res.pasajeros.map((p: any) => ({ nombre: p.nombre, dni_pasajero: p.dni_pasajero }))
              : [],
          };

          if (this.form.fallecido.nombre) this.fallecidoVerificado = true;
          if (this.form.contratante.nombre) this.contratanteVerificado = true;
        });
      },
    });
  }

  verificarFallecido(): void {
    const dni = this.form.fallecido.dni_fallecido?.trim();
    if (!dni || dni.length !== 8 || !/^\d{8}$/.test(dni)) {
      this.toast.mostrar('Ingresa un DNI válido de 8 dígitos para el fallecido', 'error');
      return;
    }

    this.verificandoFallecido = true;
    this.fallecidoVerificado = false;
    this.form.fallecido.nombre = '';

    this.reniecService.consultar(dni).subscribe({
      next: (res) =>
        this.zone.run(() => {
          this.form.fallecido.nombre = res.nombre_completo || '';
          this.fallecidoVerificado = true;
          this.verificandoFallecido = false;
          this.toast.mostrar('DNI del fallecido verificado correctamente', 'exito');
          this.cdr.detectChanges();
        }),
      error: (err) =>
        this.zone.run(() => {
          this.verificandoFallecido = false;
          this.fallecidoVerificado = false;
          this.form.fallecido.nombre = '';
          this.toast.mostrar(
            err.error?.detail || 'No se pudo verificar el DNI del fallecido',
            'error'
          );
          this.cdr.detectChanges();
        }),
    });
  }

  verificarContratante(): void {
    const dni = this.form.contratante.dni?.trim();
    if (!dni || dni.length !== 8 || !/^\d{8}$/.test(dni)) {
      this.toast.mostrar('Ingresa un DNI válido de 8 dígitos para el contratante', 'error');
      return;
    }

    this.verificandoContratante = true;
    this.contratanteVerificado = false;
    this.form.contratante.nombre = '';

    this.reniecService.consultar(dni).subscribe({
      next: (res) =>
        this.zone.run(() => {
          this.form.contratante.nombre = res.nombre_completo || '';
          this.contratanteVerificado = true;
          this.verificandoContratante = false;
          this.toast.mostrar('DNI del contratante verificado correctamente', 'exito');
          this.cdr.detectChanges();
        }),
      error: (err) =>
        this.zone.run(() => {
          this.verificandoContratante = false;
          this.contratanteVerificado = false;
          this.form.contratante.nombre = '';
          this.toast.mostrar(
            err.error?.detail || 'No se pudo verificar el DNI del contratante',
            'error'
          );
          this.cdr.detectChanges();
        }),
    });
  }

  onDniFallecidoChange(): void {
    this.fallecidoVerificado = false;
    this.form.fallecido.nombre = '';
  }

  onDniContratanteChange(): void {
    this.contratanteVerificado = false;
    this.form.contratante.nombre = '';
  }

  // ===== Vehículos / Pasajeros =====

  toggleVehiculo(id: number): void {
    if (this.form.ids_vehiculos.includes(id)) {
      this.form.ids_vehiculos = this.form.ids_vehiculos.filter((v: number) => v !== id);
    } else {
      this.form.ids_vehiculos.push(id);
    }
  }

  estaSeleccionado(id: number): boolean {
    return this.form.ids_vehiculos.includes(id);
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

  get puedeAgregarPasajeros(): boolean {
    if (this.form.ids_vehiculos.length === 0) return false;
    return this.vehiculos
      .filter((v) => this.form.ids_vehiculos.includes(v.id))
      .some((v) => v.tipo === 'auto' || v.tipo === 'microbus');
  }

  abrirModalPasajero(): void {
    this.modoEdicionPasajero = false;
    this.pasajeroEditandoIndex = null;
    this.pasajeroForm = { nombre: '', dni_pasajero: '' };
    this.modalPasajeroAbierto = true;
  }

  editarPasajero(index: number): void {
    this.modoEdicionPasajero = true;
    this.pasajeroEditandoIndex = index;
    this.pasajeroForm = { ...this.form.pasajeros[index] };
    this.modalPasajeroAbierto = true;
  }

  cerrarModalPasajero(): void {
    this.modalPasajeroAbierto = false;
  }

  guardarPasajero(): void {
    if (!this.pasajeroForm.nombre || !this.pasajeroForm.dni_pasajero) {
      return;
    }
    if (this.modoEdicionPasajero && this.pasajeroEditandoIndex !== null) {
      this.form.pasajeros[this.pasajeroEditandoIndex] = { ...this.pasajeroForm };
    } else {
      this.form.pasajeros.push({ ...this.pasajeroForm });
    }
    this.cerrarModalPasajero();
  }

  quitarPasajero(index: number): void {
    this.form.pasajeros.splice(index, 1);
  }

  cancelar(): void {
    if (this.esEdicion && this.idEditar) {
      this.router.navigate(['/servicios', this.idEditar]);
    } else {
      this.router.navigate(['/servicios']);
    }
  }

  guardar(): void {
    if (!this.form.direccion_velacion || !this.form.fecha || !this.form.id_capilla) {
      this.toast.mostrar('Completa los campos requeridos: dirección, fecha y capilla', 'error');
      return;
    }

    if (!this.form.costo || this.form.costo <= 0) {
      this.toast.mostrar('El costo del servicio debe ser mayor a 0', 'error');
      return;
    }

    if (!this.fallecidoVerificado) {
      this.toast.mostrar('Debes verificar el DNI del fallecido antes de continuar', 'error');
      return;
    }

    if (!this.contratanteVerificado) {
      this.toast.mostrar('Debes verificar el DNI del contratante antes de continuar', 'error');
      return;
    }

    const payload: any = {
      direccion_velacion: this.form.direccion_velacion,
      tipo_pago: this.form.tipo_pago,
      costo: Number(this.form.costo),
      fecha: this.form.fecha,
      id_capilla: Number(this.form.id_capilla),
      id_ataud: this.form.id_ataud ? Number(this.form.id_ataud) : null,
      cantidad_cargadores: this.form.cantidad_cargadores
        ? Number(this.form.cantidad_cargadores)
        : null,
      fallecido: {
        nombre: this.form.fallecido.nombre,
        dni_fallecido: this.form.fallecido.dni_fallecido,
      },
      contratante: {
        nombre: this.form.contratante.nombre,
        dni: this.form.contratante.dni,
        telefono: this.form.contratante.telefono,
      },
      ids_vehiculos: this.form.ids_vehiculos.map((v: any) => Number(v)),
    };

    if (this.form.pasajeros.length > 0) {
      payload.pasajeros = this.form.pasajeros.map((p: any) => ({
        nombre: p.nombre,
        dni_pasajero: p.dni_pasajero,
      }));
    }

    this.guardando = true;

    if (this.esEdicion && this.idEditar) {
      this.servicioService.actualizar(this.idEditar, payload).subscribe({
        next: () => this.zone.run(() => {
          this.toast.mostrar('Servicio actualizado correctamente', 'exito');
          setTimeout(() => this.router.navigate(['/servicios', this.idEditar]), 2500);
        }),
        error: (err) => this.zone.run(() => {
          this.guardando = false;
          this.toast.mostrar(err.error?.detail || 'Error al actualizar el servicio', 'error');
        })
      });
    } else {
      this.servicioService.crear(payload).subscribe({
        next: () => this.zone.run(() => {
          this.toast.mostrar('Servicio creado correctamente', 'exito');
          setTimeout(() => this.router.navigate(['/servicios']), 2500);
        }),
        error: (err) => this.zone.run(() => {
          this.guardando = false;
          this.toast.mostrar(err.error?.detail || 'Error al crear el servicio', 'error');
        })
      });
    }
  }
}