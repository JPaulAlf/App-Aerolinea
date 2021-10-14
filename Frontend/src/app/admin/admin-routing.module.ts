import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InicioComponent } from '../admin/inicio/inicio.component';

import { CrearVueloComponent } from './vuelo/crear-vuelo/crear-vuelo.component';
import { EditarVueloComponent } from './vuelo/editar-vuelo/editar-vuelo.component';
import { VerVueloComponent } from './vuelo/ver-vuelo/ver-vuelo.component';

import { VerHorarioComponent } from './horario/ver-horario/ver-horario.component';
import { CrearHorarioComponent } from './horario/crear-horario/crear-horario.component';
import { EditarHorarioComponent } from './horario/editar-horario/editar-horario.component';

import { CrearAvionComponent } from '../admin/avion/crear-avion/crear-avion.component';
import { EditarAvionComponent } from '../admin/avion/editar-avion/editar-avion.component';
import { VerAvionComponent } from '../admin/avion/ver-avion/ver-avion.component';

import { CrearAeropuertoComponent } from './aeropuerto/crear-aeropuerto/crear-aeropuerto.component';
import { EditarAeropuertoComponent } from './aeropuerto/editar-aeropuerto/editar-aeropuerto.component';
import { VerAeropuertoComponent } from './aeropuerto/ver-aeropuerto/ver-aeropuerto.component';

import { CrearClienteComponent } from './cliente/crear-cliente/crear-cliente.component';
import { EditarClienteComponent } from './cliente/editar-cliente/editar-cliente.component';
import { VerClienteComponent } from './cliente/ver-cliente/ver-cliente.component';

const routes: Routes = [
  {
    path: '', component: InicioComponent,
    children: [
      { path: '/admin-dashboard', component: InicioComponent },
    ]
  },
  { path: 'avion/crear-avion', component: CrearAvionComponent },
  { path: 'avion/editar-avion', component: EditarAvionComponent },
  { path: 'avion/ver-avion', component: VerAvionComponent },

  //direcciones en ingles, para que en el NAVEGADOR salgan acorde al sitio para

  { path: 'flight/add-flight', component: CrearVueloComponent },
  { path: 'flight/edit-flight', component: EditarVueloComponent },
  { path: 'flight/overview-flight', component: VerVueloComponent },

  { path: 'schedule/add-schedule', component: CrearHorarioComponent },
  { path: 'schedule/edit-schedule', component: EditarHorarioComponent },
  { path: 'schedule/overview-schedule', component: VerHorarioComponent },

  { path: 'airplane/add-airplane', component: CrearAvionComponent },
  { path: 'airplane/edit-airplane', component: EditarAvionComponent },
  { path: 'airplane/overview-airplane', component: VerAvionComponent },

  { path: 'airport/add-airport', component: CrearAeropuertoComponent },
  { path: 'airport/edit-airport', component: EditarAeropuertoComponent },
  { path: 'airport/overview-airport', component: VerAeropuertoComponent },

  { path: 'customer/add-customer', component: CrearClienteComponent },
  { path: 'customer/edit-customer', component: EditarClienteComponent },
  { path: 'customer/overview-customer', component: VerClienteComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
