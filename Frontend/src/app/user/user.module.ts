import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { InicioComponent } from '../user/inicio/inicio.component';
import { ContactoComponent } from '../user/contacto/contacto.component';
import { AcercaDeComponent } from '../user/acerca-de/acerca-de.component';

@NgModule({
  declarations: [
    InicioComponent,
    ContactoComponent,
    AcercaDeComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
