import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SecurityModule } from './security/security.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_CONFIG } from './shared/models/configuration.models';
import { AppConfig } from './app.config';
import { AuthInterceptor } from './shared/services/auth-interceptor/auth-interceptor.service';
import { FormsModule } from '@angular/forms';
import { MainModule } from './main/main.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    SecurityModule,
    MainModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [
    { provide: APP_CONFIG, useClass: AppConfig },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }
