import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { tienePermiso } from '../../core/utils/auth.utils';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
})
export class Dashboard {
  puedeVerServicios = tienePermiso('servicios:leer');
  puedeVerAtaudes = tienePermiso('ataudes:leer');
  puedeVerCapillas = tienePermiso('capillas:leer');
  puedeVerVehiculos = tienePermiso('vehiculos:leer');
  puedeVerContratantes = tienePermiso('contratantes:leer');
  puedeVerFallecidos = tienePermiso('fallecidos:leer');
  puedeVerIA = !!localStorage.getItem('token');
  puedeVerPronostico = !!localStorage.getItem('token');
}
