import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../../shared/services/payment/payment.service';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { Router } from '@angular/router';
import { SecurityContext } from '../../../shared/models/auth.models';
import { Transfer } from '../../../shared/models/payment.models';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.scss']
})
export class TransactionHistoryComponent implements OnInit {
  transfers: Transfer[] = [];

  securityContext: SecurityContext;

  loading = false;

  constructor(
    private paymentService: PaymentService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): any {

    this.authService.securityCheck(this.router);

    this.authService.authStateChange$.subscribe((context: SecurityContext) => {
      this.securityContext = context;

      if (!this.securityContext.authenticated) {
        this.router.navigateByUrl('/security/login');
      }
    });

    this.loading = true;

    this.paymentService
      .getAccountTransfers(this.securityContext.user.uuid)
      .pipe(finalize(() => this.loading = false))
      .subscribe(res => {
        this.transfers = res;
      });
  }

}
