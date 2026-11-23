import { Routes } from '@angular/router'

import { authGuard } from './core/guards/auth-guard'
import { roleGuard } from './core/guards/role-guard'

import { Login } from './features/auth/login/login'

import { permisoGuard } from './core/guards/permisos-guard';

// Green software: todas las pantallas (salvo el login) se cargan bajo demanda (lazy loading)
// para reducir el JavaScript inicial que descarga y ejecuta el navegador.
export const routes: Routes = [
  {
    path: 'login',
    component: Login,
  },

  {
    path: 'recuperar',
    loadComponent: () => import('./features/auth/recuperar/recuperar').then((m) => m.Recuperar),
  },

  {
    path: 'restablecer',
    loadComponent: () => import('./features/auth/restablecer/restablecer').then((m) => m.Restablecer),
  },

  {
    path: '',
    loadComponent: () => import('./layout/main-layout/main-layout').then((m) => m.MainLayout),
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/dashboard').then((m) => m.Dashboard),
      },

      {
        path: 'servicios',
        loadComponent: () => import('./features/servicios/servicio-list/servicio-list').then((m) => m.ServicioList),
      },

      {
        path: 'servicios/crear',
        loadComponent: () => import('./features/servicios/servicio-create/servicio-create').then((m) => m.ServicioCreate),
        canActivate: [permisoGuard],
        data: { permiso: 'servicios:crear' },
      },

      {
        path: 'servicios/editar/:id',
        loadComponent: () => import('./features/servicios/servicio-create/servicio-create').then((m) => m.ServicioCreate),
        canActivate: [permisoGuard],
        data: { permiso: 'servicios:actualizar' },
      },

      {
        path: 'servicios/:id',
        loadComponent: () => import('./features/servicios/servicio-detail/servicio-detail').then((m) => m.ServicioDetail),
      },

      {
        path: 'ataudes',
        loadComponent: () => import('./features/inventario/ataudes/ataudes').then((m) => m.Ataudes),
      },

      {
        path: 'capillas',
        loadComponent: () => import('./features/inventario/capillas/capillas').then((m) => m.Capillas),
      },

      {
        path: 'vehiculos',
        loadComponent: () => import('./features/inventario/vehiculos/vehiculos').then((m) => m.Vehiculos),
      },

      {
        path: 'contratantes',
        loadComponent: () => import('./features/personas/contratantes/contratantes').then((m) => m.Contratantes),
      },

      {
        path: 'fallecidos',
        loadComponent: () => import('./features/personas/fallecidos/fallecidos').then((m) => m.Fallecidos),
      },

      {
        path: 'usuarios',
        loadComponent: () => import('./features/usuarios/usuarios-list/usuarios-list').then((m) => m.UsuariosList),
        canActivate: [roleGuard],
        data: { roles: ['administrador'] },
      },

      {
        path: 'perfil',
        loadComponent: () => import('./features/perfil/perfil').then((m) => m.Perfil),
      },

      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'ia',
        loadComponent: () => import('./features/ia/ia').then((m) => m.Ia),
      },
      {
        path: 'predicciones',
        loadComponent: () => import('./features/predicciones/predicciones').then((m) => m.Predicciones),
      },
      {
        path: 'roles',
        loadComponent: () =>
          import('./features/roles/roles-list/roles-list').then((m) => m.RolesList),
        canActivate: [roleGuard],
        data: { roles: ['administrador'] },
      },
      {
        path: 'bitacora',
        loadComponent: () => import('./features/bitacora/bitacora-list/bitacora-list').then((m) => m.BitacoraList),
        canActivate: [permisoGuard],
        data: { permiso: 'bitacora:listar' },
      },
      {
        path: 'respaldos',
        loadComponent: () => import('./features/respaldos/respaldo-list/respaldo-list').then((m) => m.RespaldoList),
        canActivate: [permisoGuard],
        data: { permiso: 'respaldos:listar' },
      },
    ],
  },

  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
