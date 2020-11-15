import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SecurityRoutingModule } from './security-routing.module';
import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SecurityRoutingModule
  ],
  declarations: [
    LoginComponent
  ]
})
export class SecurityModule { }
