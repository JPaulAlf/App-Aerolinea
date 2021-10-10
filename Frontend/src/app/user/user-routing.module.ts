import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from '../user/inicio/inicio.component';
import { ContactoComponent } from '../user/contacto/contacto.component';
import { AcercaDeComponent } from '../user/acerca-de/acerca-de.component';


const routes: Routes = [
  {
    path: '', component: InicioComponent,
    children:[
      {path: 'inicio', component: InicioComponent },
    ],
  },
  {path: 'acerca-de', component: AcercaDeComponent },
  {path: 'contacto', component: ContactoComponent },
  {path: '**', redirectTo: '', pathMatch: 'full'}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
