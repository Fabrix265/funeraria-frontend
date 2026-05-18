import { Routes } from '@angular/router'

import { authGuard } from './core/guards/auth-guard'
import { roleGuard } from './core/guards/role-guard'

import { Login } from './features/auth/login/login'
import { Dashboard } from './features/dashboard/dashboard'

import { ServicioList } from './features/servicios/servicio-list/servicio-list'
import { ServicioCreate } from './features/servicios/servicio-create/servicio-create'
import { ServicioDetail } from './features/servicios/servicio-detail/servicio-detail'

import { Ataudes } from './features/inventario/ataudes/ataudes'
import { Capillas } from './features/inventario/capillas/capillas'
import { Vehiculos } from './features/inventario/vehiculos/vehiculos'

import { Contratantes } from './features/personas/contratantes/contratantes'
import { Fallecidos } from './features/personas/fallecidos/fallecidos'

import { UsuariosList } from './features/usuarios/usuarios-list/usuarios-list'

import { Perfil } from './features/perfil/perfil'

import { MainLayout } from './layout/main-layout/main-layout'

import { Ia } from './features/ia/ia'

export const routes: Routes = [
  {
    path: 'login',
    component: Login,
  },

  {
    path: '',
    component: MainLayout,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        component: Dashboard,
      },

      {
        path: 'servicios',
        component: ServicioList,
      },

      {
        path: 'servicios/crear',
        component: ServicioCreate,
      },

      {
        path: 'servicios/editar/:id',
        component: ServicioCreate,
      },

      {
        path: 'servicios/:id',
        component: ServicioDetail,
      },

      {
        path: 'ataudes',
        component: Ataudes,
      },

      {
        path: 'capillas',
        component: Capillas,
      },

      {
        path: 'vehiculos',
        component: Vehiculos,
      },

      {
        path: 'contratantes',
        component: Contratantes,
      },

      {
        path: 'fallecidos',
        component: Fallecidos,
      },

      {
        path: 'usuarios',
        component: UsuariosList,
        canActivate: [roleGuard],
        data: { roles: ['administrador'] },
      },

      {
        path: 'perfil',
        component: Perfil,
      },

      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'ia',
        component: Ia,
      },
      {
        path: 'roles',
        loadComponent: () =>
          import('./features/roles/roles-list/roles-list').then((m) => m.RolesList),
        canActivate: [roleGuard],
        data: { roles: ['administrador'] },
      },
    ],
  },

  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
