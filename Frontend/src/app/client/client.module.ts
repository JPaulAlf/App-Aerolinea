import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { InicioComponent } from './inicio/inicio.component';


@NgModule({
  declarations: [
    InicioComponent,
  
  ],
  imports: [
    CommonModule,
    ClientRoutingModule
  ]
})
export class ClientModule { }
