import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {

  @Output() toggleMenu = new EventEmitter<void>();

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  logout() {

    this.auth.logout();

    this.router.navigate(['/login']);

  }

}