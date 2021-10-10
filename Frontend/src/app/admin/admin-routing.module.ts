import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from '../admin/inicio/inicio.component';

const routes: Routes = [
  {
    path: '', component: InicioComponent,
    children:[
      {path: 'admin', component: InicioComponent },
    ]
  },
  //{path: 'admin', component: InicioComponent },
  {path: '**', redirectTo: '', pathMatch: 'full'}

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
