import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { PaymentService } from '../../../shared/services/payment/payment.service';
import { finalize } from 'rxjs/operators';
import { DOCUMENT, isPlatformServer } from '@angular/common';
import { Account } from '../../../shared/models/payment.models';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { SecurityContext } from '../../../shared/models/auth.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-open-seller-account',
  templateUrl: './open-seller-account.component.html',
  styleUrls: ['./open-seller-account.component.scss']
})
export class OpenSellerAccountComponent implements OnInit {

  paymentLinkLoading = false;
  paymentCheckLoading = false;

  account: Account = new Account();
  securityContext: SecurityContext;

  constructor(
    private paymentService: PaymentService,
    private authService: AuthService,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: any,
    private router: Router
  ) { }

  ngOnInit(): any {
    if (isPlatformServer(this.platformId)) {
      return;
    }

    this.authService.authStateChange$.subscribe((context: SecurityContext) => {
      this.securityContext = context;


      if (!this.securityContext.authenticated) {
        this.router.navigateByUrl('/security/login');
      }
    });

    this.authService.securityCheck(this.router);

    if (!!this.securityContext.user) {
      this.paymentCheckLoading = true;

      this.paymentService
        .getAccount(this.securityContext.user.uuid)
        .pipe(finalize(() => this.paymentCheckLoading = false))
        .subscribe(result => {
          this.account = result;
        });
    }
  }

  paymentOnboarding(): any {
    this.paymentLinkLoading = true;

    this.paymentService
      .createAccountLink()
      .pipe(finalize(() => this.paymentLinkLoading = false))
      .subscribe(result => {
        this.document.location.href = result.url;
      });
  }
}
