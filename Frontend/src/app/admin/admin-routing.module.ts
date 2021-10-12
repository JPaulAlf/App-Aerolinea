import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InicioComponent } from '../admin/inicio/inicio.component';

import { CrearAvionComponent } from '../admin/avion/crear-avion/crear-avion.component';
import { EditarAvionComponent } from '../admin/avion/editar-avion/editar-avion.component';
import { VerAvionComponent } from '../admin/avion/ver-avion/ver-avion.component';

const routes: Routes = [
  {
    path: '', component: InicioComponent,
    children: [
      { path: 'adminDashboard', component: InicioComponent },
    ]
  },
  { path: 'avion/crear-avion', component: CrearAvionComponent },
  { path: 'avion/editar-avion', component: EditarAvionComponent },
  { path: 'avion/ver-avion', component: VerAvionComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
