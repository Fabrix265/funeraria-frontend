import { Component } from '@angular/core'
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './main-layout.html',
  styleUrls: ['./main-layout.css']
})
export class MainLayout {

  sidebarAbierto = true

  constructor(private router: Router) {}

  toggleSidebar(): void {
    this.sidebarAbierto = !this.sidebarAbierto
  }

  logout(): void {
    localStorage.removeItem('token')
    localStorage.removeItem('cargo')
    this.router.navigate(['/login'])
  }

}