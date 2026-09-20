import { Component, OnInit, NgZone, ChangeDetectorRef } from '@angular/core';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { LucideDynamicIcon } from '@lucide/angular';
import { Servicio } from '../../../core/services/servicio';
import { ArchivoService } from '../../../core/services/archivo';
import { ToastService } from '../../../core/services/toast';
import { TipoArchivo } from '../../../core/models/servicio-archivo.model';
import { tienePermiso } from '../../../core/utils/auth.utils';
import { environment } from '../../../../environments/environment';
import { ReniecService, ReniecResponse } from '../../../core/services/reniec';
import { forkJoin, concat } from 'rxjs';

@Component({
  selector: 'app-servicio-create',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, LucideDynamicIcon],
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

  form: any = {
    direccion_velacion: '',
    tipo_pago: 'directo',
    costo: 100,
    fecha: '',
    id_capilla: null,
    id_ataud: null,
    cantidad_cargadores: null,
    fallecido: { nombre: '', dni_fallecido: '' },
    contratante: { nombre: '', dni: '', telefono: '' },
    ids_vehiculos: [],
  };

  readonly tiposPago = ['directo', 'seguro', 'mixto'];

  readonly fechaMinima: string = new Date().toISOString().split('T')[0];

  puedeSubirArchivos = tienePermiso('archivos:subir');

  readonly tiposDocumento: { tipo: TipoArchivo; etiqueta: string; icono: string }[] = [
    { tipo: 'certificado', etiqueta: 'Certificado de defunción', icono: 'file-check' },
    { tipo: 'acta', etiqueta: 'Acta de defunción', icono: 'scroll' },
    { tipo: 'dni_contratante', etiqueta: 'DNI del contratante', icono: 'id-card' },
    { tipo: 'dni_fallecido', etiqueta: 'DNI del fallecido', icono: 'id-card' },
  ];

  archivosSeleccionados: Partial<Record<TipoArchivo, File>> = {};
  subiendoArchivos = false;

  private readonly NOMBRE_REGEX = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ]+(?:\s[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ]+)*$/;
  private readonly DIRECCION_REGEX = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ]+[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ.\-,#]*(?:\s+[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ]+[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ.\-,#]*)*$/;

  private validarDireccion(dir: string): boolean {
    return dir.trim().length >= 3 && this.DIRECCION_REGEX.test(dir.trim());
  }

  private validarNombre(nombre: string): boolean {
    return nombre.trim().length > 0 && this.NOMBRE_REGEX.test(nombre.trim());
  }

  private validarFecha(fecha: string): boolean {
    return fecha >= this.fechaMinima;
  }

  verificandoFallecido = false;
  fallecidoVerificado = false;
  errorFallecido = '';

  verificandoContratante = false;
  contratanteVerificado = false;
  errorContratante = '';

  errorDireccion = '';
  errorFecha = '';
  errorTelefono = '';
  errorCosto = '';

  constructor(
    private servicioService: Servicio,
    private archivoService: ArchivoService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private zone: NgZone,
    private cdr: ChangeDetectorRef,
    private reniecService: ReniecService,
    private toast: ToastService,
  ) {}

  ngOnInit(): void {
    const state = history.state;
    if (state?.ia) {
      this.aplicarDatosIA(state.ia);
    }

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.esEdicion = true;
      this.idEditar = Number(idParam);
    }

    this.cargarCatalogos();
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
  }

  cargarCatalogos(): void {
    forkJoin({
      ataudes: this.http.get<any[]>(`${this.mainApi}/coffins?activo=true`),
      capillas: this.http.get<any[]>(`${this.mainApi}/chapels?activo=true`),
      vehiculos: this.http.get<any[]>(`${this.mainApi}/vehicles?activo=true`),
    }).subscribe({
      next: ({ ataudes, capillas, vehiculos }) => {
        this.zone.run(() => {
          this.ataudes = ataudes;
          this.capillas = capillas;
          this.vehiculos = vehiculos;

          // Solo ahora los selects tienen opciones → cargar datos del servicio
          if (this.esEdicion && this.idEditar) {
            this.cargarDatos(this.idEditar);
          }
        });
      },
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
          };
          if (this.form.fallecido.nombre && this.form.fallecido.dni_fallecido) {
            this.fallecidoVerificado = true;
          }
          if (this.form.contratante.nombre && this.form.contratante.dni) {
            this.contratanteVerificado = true;
          }
          this.cdr.detectChanges();
        });
      },
    });
  }

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

  cancelar(): void {
    if (this.esEdicion && this.idEditar) {
      this.router.navigate(['/servicios', this.idEditar]);
    } else {
      this.router.navigate(['/servicios']);
    }
  }

  private camposFaltantes(): string[] {
    const faltantes: string[] = [];

    if (!this.form.direccion_velacion || !this.validarDireccion(this.form.direccion_velacion)) {
      faltantes.push('Dirección de velación');
    }
    if (!this.form.fecha || !this.validarFecha(this.form.fecha)) {
      faltantes.push('Fecha');
    }
    if (!this.form.costo || Number(this.form.costo) < 100 || (Number(this.form.costo) - 100) % 10 !== 0) {
      faltantes.push('Costo');
    }
    if (!this.form.id_capilla) {
      faltantes.push('Capilla');
    }
    if (!this.form.fallecido.dni_fallecido) {
      faltantes.push('DNI del fallecido');
    } else if (!this.fallecidoVerificado) {
      faltantes.push('Verificación del DNI del fallecido');
    }
    if (!this.form.contratante.dni) {
      faltantes.push('DNI del contratante');
    } else if (!this.contratanteVerificado) {
      faltantes.push('Verificación del DNI del contratante');
    }
    if (!this.form.contratante.telefono || !/^[0-9]{9}$/.test(this.form.contratante.telefono)) {
      faltantes.push('Teléfono del contratante');
    }

    return faltantes;
  }

  guardar(): void {
    if (this.guardando) return;

    const faltantes = this.camposFaltantes();
    if (faltantes.length > 0) {
      this.toast.mostrar(`Faltan los siguientes datos: ${faltantes.join(', ')}.`, 'error');
      return;
    }

    if (!this.validarNombre(this.form.fallecido.nombre)) {
      this.toast.mostrar('El nombre del fallecido contiene caracteres no permitidos', 'error');
      return;
    }
    if (!this.validarNombre(this.form.contratante.nombre)) {
      this.toast.mostrar('El nombre del contratante contiene caracteres no permitidos', 'error');
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

    this.guardando = true;

    if (this.esEdicion && this.idEditar) {
      this.servicioService.actualizar(this.idEditar, payload).subscribe({
        next: () => this.zone.run(() => this.router.navigate(['/servicios', this.idEditar])),
        error: (err) =>
          this.zone.run(() => {
            this.guardando = false;
            this.toast.mostrar(err.error?.detail || 'Error al actualizar el servicio', 'error');
          }),
      });
    } else {
      this.servicioService.crear(payload).subscribe({
        next: (res: any) => this.zone.run(() => this.subirDocumentosDelServicio(res)),
        error: (err) =>
          this.zone.run(() => {
            this.guardando = false;
            this.toast.mostrar(err.error?.detail || 'Error al crear el servicio', 'error');
          }),
      });
    }
  }

  private subirDocumentosDelServicio(res: any): void {
    const id = Number(res.id);
    const tipos = Object.keys(this.archivosSeleccionados) as TipoArchivo[];

    if (!id || tipos.length === 0) {
      this.router.navigate(['/servicios', id]);
      return;
    }

    this.subiendoArchivos = true;
    this.cdr.detectChanges();

    concat(
      ...tipos.map((tipo) => {
        const file = this.archivosSeleccionados[tipo]!;
        return this.archivoService.subir(id, tipo, file);
      })
    ).subscribe({
      next: () => {
        this.subiendoArchivos = false;
        this.router.navigate(['/servicios', id]);
      },
      error: () => {
        this.subiendoArchivos = false;
        this.toast.mostrar('Servicio creado, pero hubo un error al subir algún archivo', 'error');
        this.router.navigate(['/servicios', id]);
      },
    });
  }

  onArchivoSeleccionado(tipo: TipoArchivo, event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = '';

    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      this.toast.mostrar('El archivo supera el máximo de 10 MB', 'error');
      return;
    }
    const permitidos = ['image/png', 'image/jpeg', 'application/pdf'];
    if (!permitidos.includes(file.type)) {
      this.toast.mostrar('Solo se permiten archivos PNG, JPG o PDF', 'error');
      return;
    }

    this.archivosSeleccionados[tipo] = file;
  }

  quitarArchivoSeleccionado(tipo: TipoArchivo): void {
    delete this.archivosSeleccionados[tipo];
  }

  docSeleccionado(tipo: TipoArchivo): boolean {
    return !!this.archivosSeleccionados[tipo];
  }

  verificarFallecido(): void {
    const dni = this.form.fallecido.dni_fallecido;
    if (!dni || dni.length !== 8) {
      this.toast.mostrar('Ingresa un DNI válido de 8 dígitos para el fallecido', 'error');
      return;
    }

    this.verificandoFallecido = true;
    this.fallecidoVerificado = false;
    this.form.fallecido.nombre = '';

    this.reniecService.consultar(dni).subscribe({
      next: (data: ReniecResponse) => {
        this.form.fallecido.nombre = data.nombre_completo;
        this.fallecidoVerificado = true;
        this.errorFallecido = '';
        this.verificandoFallecido = false;
        this._dniFallecidoVerificado = this.form.fallecido.dni_fallecido;
        this.cdr.detectChanges();
        this.toast.mostrar(`✓ Fallecido verificado: ${data.nombre_completo}`, 'exito');
      },
      error: (err) => {
        this.form.fallecido.nombre = '';
        this.fallecidoVerificado = false;
        this.verificandoFallecido = false;
        this.errorFallecido = err.error?.detail || 'DNI no encontrado en RENIEC';
        this.cdr.detectChanges();
      },
    });
  }

  verificarContratante(): void {
    const dni = this.form.contratante.dni;
    if (!dni || dni.length !== 8) {
      this.toast.mostrar('Ingresa un DNI válido de 8 dígitos para el contratante', 'error');
      return;
    }

    this.verificandoContratante = true;
    this.contratanteVerificado = false;
    this.form.contratante.nombre = '';

    this.reniecService.consultar(dni).subscribe({
      next: (data: ReniecResponse) => {
        this.form.contratante.nombre = data.nombre_completo;
        this.contratanteVerificado = true;
        this.errorContratante = '';
        this.verificandoContratante = false;
        this._dniContratanteVerificado = this.form.contratante.dni;
        this.cdr.detectChanges();
        this.toast.mostrar(`✓ Contratante verificado: ${data.nombre_completo}`, 'exito');
      },
      error: (err) => {
        this.form.contratante.nombre = '';
        this.contratanteVerificado = false;
        this.verificandoContratante = false;
        this.errorContratante = err.error?.detail || 'DNI no encontrado en RENIEC';
        this.cdr.detectChanges();
      },
    });
  }

  private _dniFallecidoVerificado = '';
  private _dniContratanteVerificado = '';

  onDniFallecidoChange(): void {
    if (this.form.fallecido.dni_fallecido !== this._dniFallecidoVerificado) {
      this.fallecidoVerificado = false;
      this.errorFallecido = '';
      this.form.fallecido.nombre = '';
    }
  }

  onDniContratanteChange(): void {
    if (this.form.contratante.dni !== this._dniContratanteVerificado) {
      this.contratanteVerificado = false;
      this.errorContratante = '';
      this.form.contratante.nombre = '';
    }
  }

  onDireccionChange(): void {
    if (this.form.direccion_velacion && !this.validarDireccion(this.form.direccion_velacion)) {
      this.errorDireccion = 'Solo se permiten letras, números, espacios, comas y guiones';
    } else {
      this.errorDireccion = '';
    }
  }

  onFechaChange(): void {
    if (this.form.fecha && this.form.fecha < this.fechaMinima) {
      this.errorFecha = 'La fecha no puede ser anterior al día de hoy';
    } else {
      this.errorFecha = '';
    }
  }

  onTelefonoInput(): void {
    const soloNumeros = (this.form.contratante.telefono || '').replace(/[^0-9]/g, '');
    if (soloNumeros !== this.form.contratante.telefono) {
      this.errorTelefono = 'Solo se permiten números';
    } else {
      this.errorTelefono = '';
    }
    this.form.contratante.telefono = soloNumeros;
  }

  onCostoChange(): void {
    const costo = Number(this.form.costo);
    if (this.form.costo === null || this.form.costo === '' || isNaN(costo) || costo < 100) {
      this.errorCosto = 'El costo mínimo es S/ 100';
    } else if ((costo - 100) % 10 !== 0) {
      this.errorCosto = 'El costo debe variar en múltiplos de 10 (Ej: 100, 110, 120...)';
    } else {
      this.errorCosto = '';
    }
  }

  get formValido(): boolean {
    return this.camposFaltantes().length === 0;
  }
}
