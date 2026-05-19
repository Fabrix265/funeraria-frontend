import { Component, OnInit, HostListener } from '@angular/core';
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './main-layout.html',
  styleUrls: ['./main-layout.css'],
})
export class MainLayout implements OnInit {
  esAdmin = false;
  mensajePronostico = false;
  sidebarAbierto = true;
  esMobile = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.verificarTamano();
    this.verificarRol();
  }

  verificarRol(): void {
    try {
      const rolesRaw = localStorage.getItem('roles');
      const roles: string[] = rolesRaw ? JSON.parse(rolesRaw) : [];
      this.esAdmin = roles.some((r) => r.toLowerCase() === 'administrador');
    } catch {
      this.esAdmin = false;
    }
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

  mostrarPronostico(): void {
    this.mensajePronostico = true;
    setTimeout(() => {
      this.mensajePronostico = false;
    }, 3000);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('roles');
    this.router.navigate(['/login']);
  }
}
