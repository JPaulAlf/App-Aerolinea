import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from '../admin/inicio/inicio.component';

const routes: Routes = [
  {
    path: '', component: InicioComponent,
    children:[
      {path: 'adminDashboard', component: InicioComponent },
    ]
  },
  //{path: 'admin', component: InicioComponent },
 

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
