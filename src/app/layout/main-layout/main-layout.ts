import { Component, OnInit, HostListener } from '@angular/core'
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './main-layout.html',
  styleUrls: ['./main-layout.css']
})
export class MainLayout implements OnInit {

  esAdmin = localStorage.getItem('cargo') === 'administrador'
  mensajePronostico = false

  sidebarAbierto = true
  esMobile = false

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.verificarTamano()
  }

  @HostListener('window:resize')
  verificarTamano(): void {
    const ancho = window.innerWidth
    this.esMobile = ancho < 768

    if (ancho < 768) {
      this.sidebarAbierto = false
    } else if (ancho < 1024) {
      this.sidebarAbierto = false
    } else {
      this.sidebarAbierto = true
    }
  }

  toggleSidebar(): void {
    this.sidebarAbierto = !this.sidebarAbierto
  }

  cerrarSidebarMobile(): void {
    if (this.esMobile) {
      this.sidebarAbierto = false
    }
  }

  mostrarPronostico(): void {
    this.mensajePronostico = true
    setTimeout(() => { this.mensajePronostico = false }, 3000)
  }

  logout(): void {
    localStorage.removeItem('token')
    localStorage.removeItem('cargo')
    this.router.navigate(['/login'])
  }

}