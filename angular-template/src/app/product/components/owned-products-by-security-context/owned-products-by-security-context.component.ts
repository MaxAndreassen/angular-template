import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { SecurityContext } from '../../../shared/models/auth.models';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { isPlatformServer } from '@angular/common';

@Component({
  selector: 'app-owned-products-by-security-context',
  templateUrl: './owned-products-by-security-context.component.html',
  styleUrls: ['./owned-products-by-security-context.component.scss']
})
export class OwnedProductsBySecurityContextComponent implements OnInit {

  securityContext: SecurityContext;

  constructor(
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: any,
    private router: Router
  ) { }

  ngOnInit(): any {
    if (isPlatformServer(this.platformId)) {
      return;
    }

    this.authService.securityCheck(this.router);

    this.authService.authStateChange$.subscribe((context: SecurityContext) => {
      this.securityContext = context;

      if (!this.securityContext.authenticated) {
        this.router.navigateByUrl('/security/login');
      }
    });
  }

}
