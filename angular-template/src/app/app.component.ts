import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { SecurityContext } from './shared/models/auth.models';
import { Subscription } from 'rxjs';
import { AuthService } from './shared/services/auth/auth.service';
import { isPlatformServer } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-template';
  securityContext: SecurityContext = new SecurityContext();
  authSubscription: Subscription;

  constructor(
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: any,
  ) {
  }

  ngOnInit(): any {
    if (isPlatformServer(this.platformId)) {
      return;
    }

    this.authSubscription = this.authService.authStateChange$.subscribe((context: SecurityContext) => {
      this.securityContext = context;
    });
  }
}
