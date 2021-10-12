import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';

import { InicioComponent } from '../admin/inicio/inicio.component';

import { CrearAvionComponent } from './avion/crear-avion/crear-avion.component';
import { EditarAvionComponent } from './avion/editar-avion/editar-avion.component';
import { VerAvionComponent } from './avion/ver-avion/ver-avion.component';



@NgModule({
  declarations: [
    InicioComponent,
    CrearAvionComponent,
    EditarAvionComponent,
    VerAvionComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
