import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { ClientLayoutComponent } from './layouts/client-layout/client-layout.component';


@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    UserLayoutComponent,
    ClientLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
   

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
