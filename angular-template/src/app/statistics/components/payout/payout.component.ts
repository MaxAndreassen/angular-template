import { Component, OnInit } from '@angular/core';
import { PayOut } from '../../../shared/models/payment.models';
import { SecurityContext } from '../../../shared/models/auth.models';
import { PaymentService } from '../../../shared/services/payment/payment.service';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payout',
  templateUrl: './payout.component.html',
  styleUrls: ['./payout.component.scss']
})
export class PayoutComponent implements OnInit {
  payOuts: PayOut[] = [];

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
  }

}
