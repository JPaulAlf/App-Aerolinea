import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';

import { ClientRoutingModule } from './client-routing.module';
import { InicioComponent } from './inicio/inicio.component';
import { OfertasComponent } from './ofertas/ofertas.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ReservaComponent } from './reserva/reserva.component';
import { CheckInComponent } from './check-in/check-in.component';
import { HistoricoComponent } from './historico/historico.component';


@NgModule({
  declarations: [
    InicioComponent,
    OfertasComponent,
    PerfilComponent,
    ReservaComponent,
    CheckInComponent,
    HistoricoComponent,
  
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class ClientModule { }
