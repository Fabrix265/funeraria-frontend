import { Routes } from '@angular/router';

import { authGuard } from './core/guards/auth-guard';

import { Layout } from './core/layout/layout';

import { Login } from './features/auth/login/login';

import { ServicioList } from './features/servicios/pages/servicio-list/servicio-list';

import { PrediccionPage } from './features/prediccion/prediccion-page/prediccion-page';

import { ServicioCreate } from './features/servicios/pages/servicio-create/servicio-create'
import { ServicioDetalle } from './features/servicios/pages/servicio-detalle/servicio-detalle';

export const routes: Routes = [

  {
    path: 'login',
    component: Login
  },

  {
    path: '',
    component: Layout,
    canActivate: [authGuard],

    children: [

      {
    path: 'servicios',
    component: ServicioList
  },

  {
    path: 'servicios/nuevo',
    component: ServicioCreate
  },

  {
    path: 'servicios/:id',
    loadComponent: () =>
      import('./features/servicios/pages/servicio-detalle/servicio-detalle')
        .then(m => m.ServicioDetalle)
  },

  {
  path: 'servicios/:id',
  component: ServicioDetalle
  },

  {
    path: 'prediccion',
    component: PrediccionPage
  },

  {
    path: '',
    redirectTo: 'servicios',
    pathMatch: 'full'
  }

    ]
  }

];