import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';


const routes: Routes = [
  
 // Rutas para usuario
  {path: '', component: UserLayoutComponent ,
    children:[
        {path:'',redirectTo:'/inicio',pathMatch:'full'},
        {path:'',loadChildren:()=>import('./user/user.module').then(m=>m.UserModule)},
        ]
      },

    //Rutas para administrador
  {path: '', component: AdminLayoutComponent ,
    children:[
          {path:'',redirectTo:'/adminDashboard',pathMatch:'full'},
          {path:'admin',loadChildren:()=>import('./admin/admin.module').then(m=>m.AdminModule)}
        ]
      },
      {path: '**', redirectTo: '', pathMatch: 'full'}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
