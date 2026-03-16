import { Component } from '@angular/core'
import { Router, RouterOutlet } from '@angular/router'

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.html',
  styleUrls: ['./main-layout.css'],
  imports: [RouterOutlet]
})
export class MainLayout {

  sidebarAbierto = true

  constructor(private router: Router) {}

  toggleSidebar(){
    this.sidebarAbierto = !this.sidebarAbierto
  }

  logout(){
    localStorage.removeItem('token')
    localStorage.removeItem('cargo')

    this.router.navigate(['/login'])
  }

}