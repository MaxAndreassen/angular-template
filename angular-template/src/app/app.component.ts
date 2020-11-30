import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { SecurityContext } from './shared/models/auth.models';
import { Subscription } from 'rxjs';
import { AuthService } from './shared/services/auth/auth.service';
import { isPlatformServer } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-template';
  sideBarOpen = true;

  securityContext: SecurityContext = new SecurityContext();

  constructor(
    private authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: any,
  ) {

    this.authService.sidebarEmitter
    .subscribe(p => this.sideBarOpen = p);
  }

  ngOnInit(): any {
    if (isPlatformServer(this.platformId)) {
        return;
    }

    this.authService.authStateChange$.subscribe((context: SecurityContext) => {
        this.securityContext = context;
    });
  }

  routeLogin(): any {
    this.router.navigateByUrl('/security/login');
  }

  signOut(): any {
    this.authService.logout();
  }
}
