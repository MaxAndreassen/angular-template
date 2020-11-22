import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { SecurityContext } from './shared/models/auth.models';
import { Subscription } from 'rxjs';
import { AuthService } from './shared/services/auth/auth.service';
import { isPlatformServer } from '@angular/common';
import { AuthBaseComponent } from './shared/components/auth-base-component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends AuthBaseComponent implements OnInit {
  title = 'angular-template';

  constructor(
    authService: AuthService,
    @Inject(PLATFORM_ID) platformId: any,
  ) {
    super(authService, platformId);
  }
}
