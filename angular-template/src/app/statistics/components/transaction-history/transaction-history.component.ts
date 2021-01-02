import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../../shared/services/payment/payment.service';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
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

  previousPageTransfer: string;
  startPageTransfer: string;
  currentPage: number;

  loading = false;
  moreLoading = false;
  moreToLoad = true;

  constructor(
    private paymentService: PaymentService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
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

  loadMore(): any {
    const lastObject = this.transfers[this.transfers.length - 1].id;

    this.moreLoading = true;

    this.paymentService
      .getAccountTransfers(this.securityContext.user.uuid, lastObject)
      .pipe(finalize(() => this.moreLoading = false))
      .subscribe(res => {
        if (!res || res.length === 0) {
          this.moreToLoad = false;
        }

        this.transfers = this.transfers.concat(res);
      });
  }

}
