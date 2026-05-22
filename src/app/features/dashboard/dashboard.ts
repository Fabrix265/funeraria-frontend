import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { tienePermiso, esAdminActual } from '../../core/utils/auth.utils';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
})
export class Dashboard {
  mensajePronostico = false;

  puedeVerServicios = tienePermiso('servicios:leer');
  puedeVerAtaudes = tienePermiso('ataudes:leer');
  puedeVerCapillas = tienePermiso('capillas:leer');
  puedeVerVehiculos = tienePermiso('vehiculos:leer');
  puedeVerContratantes = tienePermiso('contratantes:leer');
  puedeVerFallecidos = tienePermiso('fallecidos:leer');
  puedeVerIA = !!localStorage.getItem('token');

  mostrarPronostico(): void {
    this.mensajePronostico = true;
    setTimeout(() => {
      this.mensajePronostico = false;
    }, 3000);
  }
}
