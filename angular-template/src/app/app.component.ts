import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { SecurityContext } from './shared/models/auth.models';
import { Subscription } from 'rxjs';
import { AuthService } from './shared/services/auth/auth.service';
import { isPlatformServer } from '@angular/common';
import { Router } from '@angular/router';
import { faToggleOn, faToggleOff, faSearch, faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-template';
  sideBarOpen = true;
  toggleOn = faToggleOn;
  searchIcon = faSearch;
  burger = faBars;

  burgerNavOpen = false;

  securityContext: SecurityContext = new SecurityContext();

  constructor(
    private authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: any,
  ) {

    this.authService.sidebarEmitter
      .subscribe(p => this.sideBarOpen = p);

    this.authService.securityCheck();
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
    this.burgerNavOpen = false;
  }

  toggleBurgerNav(): any {
    this.burgerNavOpen = !this.burgerNavOpen;
  }
}
