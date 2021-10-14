import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from '../user/inicio/inicio.component';
import { ContactoComponent } from '../user/contacto/contacto.component';
import { AcercaDeComponent } from '../user/acerca-de/acerca-de.component';


const routes: Routes = [
  {
    path: '', component: InicioComponent,
    children:[
      {path: 'home', component: InicioComponent },
    ],
  },
  {path: 'about-us', component: AcercaDeComponent },
  {path: 'contact', component: ContactoComponent },

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
