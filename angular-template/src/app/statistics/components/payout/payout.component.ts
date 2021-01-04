import { Component, OnInit, Inject } from '@angular/core';
import { PayOut, Account } from '../../../shared/models/payment.models';
import { SecurityContext } from '../../../shared/models/auth.models';
import { PaymentService } from '../../../shared/services/payment/payment.service';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-payout',
  templateUrl: './payout.component.html',
  styleUrls: ['./payout.component.scss']
})
export class PayoutComponent implements OnInit {
  payOuts: PayOut[] = [];
  account: Account = new Account();
  balance = null;
  pendingBalance = null;

  securityContext: SecurityContext;

  loading = false;
  paymentCheckLoading = false;
  paymentLinkLoading = false;
  balanceLoading = false;
  moreLoading = false;
  payoutRequestLoading = false;

  payoutRequestSubmitted = false;
  payoutRequestFailed = false;

  moreToLoad = true;

  constructor(
    private paymentService: PaymentService,
    private authService: AuthService,
    private router: Router,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit(): any {
    this.authService.securityCheck(this.router);

    this.authService.authStateChange$.subscribe((context: SecurityContext) => {
      this.securityContext = context;

      if (!this.securityContext.authenticated) {
        this.router.navigateByUrl('/security/login');
      }
    });

    this.paymentCheckLoading = true;

    this.paymentService
      .getAccount(this.securityContext.user.uuid)
      .pipe(finalize(() => this.paymentCheckLoading = false))
      .subscribe(result => {
        this.account = result;
        this.authService.setChargesEnabled(result.chargesEnabled);

        this.loading = true;

        if (this.account.payoutsEnabled) {
          this.paymentService
            .getAccountPayouts(this.securityContext.user.uuid)
            .pipe(finalize(() => this.loading = false))
            .subscribe(res => {
              this.payOuts = res;
            });

          this.balanceLoading = true;

          this.paymentService
            .getAccountBalance(this.securityContext.user.uuid)
            .pipe(finalize(() => this.balanceLoading = false))
            .subscribe(p => {
              this.balance = p.balance;
              this.pendingBalance = p.pendingBalance;
            });
        }
      });
  }

  loadMore(): any {
    const lastObject = this.payOuts[this.payOuts.length - 1].id;

    this.moreLoading = true;

    this.paymentService
      .getAccountPayouts(this.securityContext.user.uuid, lastObject)
      .pipe(finalize(() => this.moreLoading = false))
      .subscribe(res => {
        if (!res || res.length === 0) {
          this.moreToLoad = false;
        }

        this.payOuts = this.payOuts.concat(res);
      });
  }

  paymentOnboarding(): any {
    this.paymentLinkLoading = true;

    this.paymentService
      .createAccountLink('payout')
      .pipe(finalize(() => this.paymentLinkLoading = false))
      .subscribe(result => {
        this.document.location.href = result.url;
      });
  }

  payoutRequest(): any {
    this.payoutRequestLoading = true;
    this.payoutRequestFailed = false;

    this.paymentService
      .requestPayout(this.balance)
      .pipe(finalize(() => this.payoutRequestLoading = false))
      .subscribe(res => {
        this.payoutRequestSubmitted = true;
      }, err => {
        this.payoutRequestFailed = true;
      });

  }

}
