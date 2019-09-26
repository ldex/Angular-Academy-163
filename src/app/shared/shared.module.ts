import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { ErrorComponent } from './error.component';
import { AdminComponent } from './admin.component';
import { ContactComponent } from './contact.component';


@NgModule({
  declarations: [
    HomeComponent,
    ErrorComponent,
    AdminComponent,
    ContactComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
