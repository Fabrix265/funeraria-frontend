import { Component, OnInit, ChangeDetectorRef } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { RouterLink } from '@angular/router'
import { Servicio } from '../../../core/services/servicio'
import { puedeCrear } from '../../../core/utils/auth.utils';

@Component({
  selector: 'app-servicio-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './servicio-list.html',
  styleUrls: ['./servicio-list.css'],
})
export class ServicioList implements OnInit {
  puedeCrear = puedeCrear('servicios');

  servicios: any[] = [];
  cargando = false;
  total = 0;
  limit = 10;
  offset = 0;

  filtros = { nombre: '', dni: '', dni_fallecido: '', fecha: '' };
  erroresFiltro = { nombre: '', dni: '', dni_fallecido: '' };

  constructor(
    private servicioService: Servicio,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.cargando = true;
    const params: any = {};
    const nombre = this.filtros.nombre.trim();
    if (nombre) params['nombre'] = nombre;
    if (this.filtros.dni) params['dni'] = this.filtros.dni;
    if (this.filtros.dni_fallecido) params['dni_fallecido'] = this.filtros.dni_fallecido;
    if (this.filtros.fecha) params['fecha'] = this.filtros.fecha;

    this.servicioService.listar(params, this.offset, this.limit).subscribe({
      next: (res) => {
        this.total = res.total;
        this.servicios = (res.data || []).sort(
          (a: any, b: any) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime(),
        );
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.cargando = false;
        this.cdr.detectChanges();
      },
    });
  }

  aplicarFiltros(): void {
    this.offset = 0;
    this.cargar();
  }
  limpiar(): void {
    this.filtros = { nombre: '', dni: '', dni_fallecido: '', fecha: '' };
    this.erroresFiltro = { nombre: '', dni: '', dni_fallecido: '' };
    this.offset = 0;
    this.cargar();
  }

  cambiarPagina(delta: number): void {
    this.offset = Math.max(0, this.offset + delta);
    this.cargar();
  }

  get paginaActual(): number {
    return Math.floor(this.offset / this.limit) + 1;
  }
  get totalPaginas(): number {
    return Math.ceil(this.total / this.limit) || 1;
  }
  get hayAnterior(): boolean {
    return this.offset > 0;
  }
  get haySiguiente(): boolean {
    return this.offset + this.limit < this.total;
  }

  onNombreFiltroChange(valor: string): void {
    let limpio = valor.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]/g, ''); // solo letras y espacios
    limpio = limpio.replace(/^\s+/, '').replace(/\s{2,}/g, ' '); // sin espacios al inicio ni dobles
    this.erroresFiltro.nombre = limpio !== valor ? 'Solo se permiten letras y espacios' : '';
    this.filtros.nombre = limpio;
  }

  onDniFiltroChange(valor: string): void {
    const limpio = valor.replace(/[^0-9]/g, '').slice(0, 8);
    this.erroresFiltro.dni = limpio !== valor ? 'Solo números, máximo 8 dígitos' : '';
    this.filtros.dni = limpio;
  }

  onDniFallecidoFiltroChange(valor: string): void {
    const limpio = valor.replace(/[^0-9]/g, '').slice(0, 8);
    this.erroresFiltro.dni_fallecido = limpio !== valor ? 'Solo números, máximo 8 dígitos' : '';
    this.filtros.dni_fallecido = limpio;
  }
}
