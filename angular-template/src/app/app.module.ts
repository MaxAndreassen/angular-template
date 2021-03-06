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
import { ProfileModule } from './profile/profile.module';
import { CheckOutModule } from './check-out/check-out.module';
import { ProductModule } from './product/product.module';
import { AdminModule } from './admin/admin.module';
import { StatisticsModule } from './statistics/statistics.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    SecurityModule,
    ProfileModule,
    MainModule,
    HttpClientModule,
    SharedModule,
    CheckOutModule,
    ProductModule,
    AdminModule,
    StatisticsModule,
    FontAwesomeModule,
    NgSelectModule
  ],
  providers: [
    { provide: APP_CONFIG, useClass: AppConfig },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
