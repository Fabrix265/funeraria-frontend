import { Component, OnInit, HostListener } from '@angular/core';
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { tienePermiso, esAdminActual } from '../../core/utils/auth.utils';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './main-layout.html',
  styleUrls: ['./main-layout.css'],
})
export class MainLayout implements OnInit {
  esAdmin = false;
  sidebarAbierto = true;
  esMobile = false;

  puedeVerServicios = false;
  puedeVerAtaudes = false;
  puedeVerCapillas = false;
  puedeVerVehiculos = false;
  puedeVerContratantes = false;
  puedeVerFallecidos = false;
  puedeVerIA = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.verificarTamano();
    this.verificarPermisos();
  }

  verificarPermisos(): void {
    this.esAdmin = esAdminActual();
    this.puedeVerServicios = tienePermiso('servicios:leer');
    this.puedeVerAtaudes = tienePermiso('ataudes:leer');
    this.puedeVerCapillas = tienePermiso('capillas:leer');
    this.puedeVerVehiculos = tienePermiso('vehiculos:leer');
    this.puedeVerContratantes = tienePermiso('contratantes:leer');
    this.puedeVerFallecidos = tienePermiso('fallecidos:leer');
    this.puedeVerIA = !!localStorage.getItem('token');
  }

  @HostListener('window:resize')
  verificarTamano(): void {
    const ancho = window.innerWidth;
    this.esMobile = ancho < 768;
    this.sidebarAbierto = ancho >= 1024;
  }

  toggleSidebar(): void {
    this.sidebarAbierto = !this.sidebarAbierto;
  }

  cerrarSidebarMobile(): void {
    if (this.esMobile) this.sidebarAbierto = false;
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
