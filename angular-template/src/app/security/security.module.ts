import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SecurityRoutingModule } from './security-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SharedModule } from '../shared/shared.module';
import { ForgottenPasswordComponent } from './forgotten-password/forgotten-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SecurityRoutingModule,
    SharedModule
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgottenPasswordComponent,
    ResetPasswordComponent
  ]
})
export class SecurityModule { }
