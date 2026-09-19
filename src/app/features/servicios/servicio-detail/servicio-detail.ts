import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideDynamicIcon } from '@lucide/angular';
import { Servicio } from '../../../core/services/servicio';
import { ArchivoService } from '../../../core/services/archivo';
import { ServicioArchivo, TipoArchivo } from '../../../core/models/servicio-archivo.model';
import { ToastService } from '../../../core/services/toast';
import { puedeActualizar, puedeEliminar as puedeEliminarFn, tienePermiso } from '../../../core/utils/auth.utils';

@Component({
  selector: 'app-servicio-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, LucideDynamicIcon],
  templateUrl: './servicio-detail.html',
  styleUrls: ['./servicio-detail.css'],
})
export class ServicioDetail implements OnInit {
  puedeEditar = puedeActualizar('servicios');
  puedeEliminar = puedeEliminarFn('servicios');
  puedeSubirArchivos = tienePermiso('archivos:subir');
  puedeEditarArchivos = tienePermiso('archivos:editar');
  puedeEliminarArchivos = tienePermiso('archivos:eliminar');

  servicio: any = null;
  cargando = true;
  modalEliminarAbierto = false;

  archivos: ServicioArchivo[] = [];
  cargandoArchivos = false;

  tiposArchivo: { tipo: TipoArchivo; label: string; icono: string }[] = [
    { tipo: 'certificado', label: 'Certificado de defunción', icono: 'file-check' },
    { tipo: 'acta', label: 'Acta de defunción', icono: 'scroll' },
    { tipo: 'dni_contratante', label: 'DNI del contratante', icono: 'id-card' },
    { tipo: 'dni_fallecido', label: 'DNI del fallecido', icono: 'id-card' },
  ];

  modalVistaPreviaAbierto = false;
  archivoVistaPrevia: ServicioArchivo | null = null;
  urlVistaPrevia = '';

  modalReemplazarAbierto = false;
  archivoReemplazar: ServicioArchivo | null = null;
  nuevoArchivoSeleccionado: File | null = null;
  nuevoArchivoPreview = '';
  subiendoArchivo = false;

  modalEliminarArchivoAbierto = false;
  archivoEliminar: ServicioArchivo | null = null;
  eliminandoArchivo = false;

  constructor(
    private route: ActivatedRoute,
    private servicioService: Servicio,
    public archivoService: ArchivoService,
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
          this.cargarArchivos();
          this.cdr.detectChanges();
        },
        error: () => {
          this.cargando = false;
          this.cdr.detectChanges();
        },
      });
    }
  }

  cargarArchivos(): void {
    if (!this.servicio) return;
    this.cargandoArchivos = true;
    this.archivoService.listar(this.servicio.id).subscribe({
      next: (res) => {
        this.archivos = res.archivos;
        this.cargandoArchivos = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.archivos = [];
        this.cargandoArchivos = false;
        this.cdr.detectChanges();
      },
    });
  }

  obtenerArchivoPorTipo(tipo: TipoArchivo): ServicioArchivo | undefined {
    return this.archivos.find(a => a.tipo === tipo);
  }

  subirArchivo(tipo: TipoArchivo, input: HTMLInputElement): void {
    const file = input.files?.[0];
    if (!file || !this.servicio) return;

    this.subiendoArchivo = true;
    this.cdr.detectChanges();

    this.archivoService.subir(this.servicio.id, tipo, file).subscribe({
      next: () => {
        this.toast.mostrar('Archivo subido correctamente', 'exito');
        this.cargarArchivos();
        this.subiendoArchivo = false;
        input.value = '';
        this.cdr.detectChanges();
      },
      error: (e) => {
        this.toast.mostrar(e.error?.detail || 'Error al subir archivo', 'error');
        this.subiendoArchivo = false;
        this.cdr.detectChanges();
      },
    });
  }

  onFileDrop(tipo: TipoArchivo, event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer?.files[0];
    if (!file || !this.servicio) return;

    this.subiendoArchivo = true;
    this.cdr.detectChanges();

    this.archivoService.subir(this.servicio.id, tipo, file).subscribe({
      next: () => {
        this.toast.mostrar('Archivo subido correctamente', 'exito');
        this.cargarArchivos();
        this.subiendoArchivo = false;
        this.cdr.detectChanges();
      },
      error: (e) => {
        this.toast.mostrar(e.error?.detail || 'Error al subir archivo', 'error');
        this.subiendoArchivo = false;
        this.cdr.detectChanges();
      },
    });
  }

  onFileDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  abrirVistaPrevia(archivo: ServicioArchivo): void {
    this.archivoVistaPrevia = archivo;
    this.urlVistaPrevia = this.archivoService.getUrlDescarga(this.servicio.id, archivo.id);
    this.modalVistaPreviaAbierto = true;
    this.cdr.detectChanges();
  }

  cerrarVistaPrevia(): void {
    this.modalVistaPreviaAbierto = false;
    this.archivoVistaPrevia = null;
    this.urlVistaPrevia = '';
    this.cdr.detectChanges();
  }

  abrirModalReemplazar(archivo: ServicioArchivo): void {
    this.archivoReemplazar = archivo;
    this.nuevoArchivoSeleccionado = null;
    this.nuevoArchivoPreview = '';
    this.modalReemplazarAbierto = true;
    this.cdr.detectChanges();
  }

  cerrarModalReemplazar(): void {
    this.modalReemplazarAbierto = false;
    this.archivoReemplazar = null;
    this.nuevoArchivoSeleccionado = null;
    this.nuevoArchivoPreview = '';
    this.cdr.detectChanges();
  }

  seleccionarNuevoArchivo(input: HTMLInputElement): void {
    const file = input.files?.[0];
    if (!file) return;
    this.nuevoArchivoSeleccionado = file;
    this.nuevoArchivoPreview = URL.createObjectURL(file);
    this.cdr.detectChanges();
  }

  onNuevoArchivoDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer?.files[0];
    if (!file) return;
    this.nuevoArchivoSeleccionado = file;
    this.nuevoArchivoPreview = URL.createObjectURL(file);
    this.cdr.detectChanges();
  }

  confirmarReemplazar(): void {
    if (!this.nuevoArchivoSeleccionado || !this.archivoReemplazar || !this.servicio) return;

    this.subiendoArchivo = true;
    this.cdr.detectChanges();

    this.archivoService.reemplazar(
      this.servicio.id,
      this.archivoReemplazar.id,
      this.nuevoArchivoSeleccionado
    ).subscribe({
      next: () => {
        this.toast.mostrar('Archivo reemplazado correctamente', 'exito');
        this.cerrarModalReemplazar();
        this.cargarArchivos();
        this.subiendoArchivo = false;
        this.cdr.detectChanges();
      },
      error: (e) => {
        this.toast.mostrar(e.error?.detail || 'Error al reemplazar archivo', 'error');
        this.subiendoArchivo = false;
        this.cdr.detectChanges();
      },
    });
  }

  abrirModalEliminarArchivo(archivo: ServicioArchivo): void {
    this.archivoEliminar = archivo;
    this.modalEliminarArchivoAbierto = true;
    this.cdr.detectChanges();
  }

  cerrarModalEliminarArchivo(): void {
    this.modalEliminarArchivoAbierto = false;
    this.archivoEliminar = null;
    this.cdr.detectChanges();
  }

  confirmarEliminarArchivo(): void {
    if (!this.archivoEliminar || !this.servicio) return;

    this.eliminandoArchivo = true;
    this.cdr.detectChanges();

    this.archivoService.eliminar(this.servicio.id, this.archivoEliminar.id).subscribe({
      next: () => {
        this.toast.mostrar('Archivo eliminado', 'exito');
        this.cerrarModalEliminarArchivo();
        this.cargarArchivos();
        this.eliminandoArchivo = false;
        this.cdr.detectChanges();
      },
      error: (e) => {
        this.toast.mostrar(e.error?.detail || 'Error al eliminar archivo', 'error');
        this.eliminandoArchivo = false;
        this.cdr.detectChanges();
      },
    });
  }

  descargarArchivo(archivo: ServicioArchivo): void {
    const url = this.archivoService.getUrlDescarga(this.servicio.id, archivo.id);
    window.open(url, '_blank');
  }

  esImagen(mime: string): boolean {
    return mime.startsWith('image/');
  }

  esPdf(mime: string): boolean {
    return mime === 'application/pdf';
  }

  formatearTamano(bytes: number): string {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
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

  getNombreTipo(tipo: TipoArchivo): string {
    return this.tiposArchivo.find(t => t.tipo === tipo)?.label || tipo;
  }
}
