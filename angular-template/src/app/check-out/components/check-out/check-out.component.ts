import { Component, OnInit, ViewChild, Inject, Input, Output, EventEmitter } from '@angular/core';
import { PaymentIntentSecret } from '../../../shared/models/payment.models';
import { PaymentService } from '../../../shared/services/payment/payment.service';
import { finalize } from 'rxjs/operators';
import { isPlatformServer } from '@angular/common';
import { IAppConfig, APP_CONFIG } from '../../../shared/models/configuration.models';
import { ProductVersionSummary, AssetDownloadLink } from '../../../shared/models/product.models.ts';
import { ProductService } from '../../../shared/services/product/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { SecurityContext } from '../../../shared/models/auth.models';
import { TransactionService } from '../../../shared/services/transaction/transaction.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit {

  loading = false;
  productLoading = false;
  failed = false;

  paymentSubmitted = false;
  paymentLoading = false;
  paymentSucceed = false;
  paymentFailed = false;
  failureReason = '';

  paymentIntent: PaymentIntentSecret;

  productVersion: ProductVersionSummary = new ProductVersionSummary();

  stripe: any;
  card: any;

  vat: number;

  purchaseId: string;

  isGuest = false;

  securityContext: SecurityContext;

  @Input() productVersionUuid: string;

  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();
  @Output() assetDownloadLinkEmitter: EventEmitter<AssetDownloadLink> = new EventEmitter();

  constructor(
    private paymentService: PaymentService,
    @Inject(APP_CONFIG) public config: IAppConfig,
    private productService: ProductService,
    private authService: AuthService,
    private transactionService: TransactionService,
    private route: ActivatedRoute,
    private router: Router
  ) {

  }

  ngOnInit(): any {
    this.productLoading = true;

    this.authService.authStateChange$.subscribe((context: SecurityContext) => {
      this.securityContext = context;
    });

    this.productService
      .getProductSummary(this.productVersionUuid)
      .pipe(finalize(() => this.productLoading = false))
      .subscribe(result => {
        this.productVersion = result;
        this.vat = Math.round((this.productVersion.priceInPounds * 0.2) * 100) / 100;

        let userUuid = this.authService.getGuestUuid();

        if (this.securityContext.authenticated) {
          userUuid = this.securityContext.user.uuid;
        } else {
          this.isGuest = true;
        }

        this.loading = true;
        this.paymentService
          .createPaymentIntent(this.productVersion.uuid, userUuid)
          .pipe(finalize(() => this.loading = false))
          .subscribe(res => {
            this.paymentIntent = res;
            this.setupStripe();
          }, err => {
            this.failed = true;
          });
      }, err => {
        this.failed = true;
      });
  }

  setupStripe(): any {
    /* tslint:disable */
    //@ts-ignore
    this.stripe = Stripe(this.config.stripeApiKey);
    var elements = this.stripe.elements();

    var style = {
      base: {
        color: "#32325d",
      }
    };

    this.card = elements.create("card", { style: style });
    this.card.mount("#card-element");

    this.card.on('change', ({ error }) => {
      let displayError = document.getElementById('card-errors');
      if (error) {
        displayError.textContent = error.message;
      } else {
        displayError.textContent = '';
      }
    });
    /* tslint:enable */
  }

  submit(ev: any): any {

    this.paymentSubmitted = true;
    this.paymentLoading = true;

    /* tslint:disable */
    ev.preventDefault();
    this.stripe.confirmCardPayment(this.paymentIntent.secretKey, {
      payment_method: {
        card: this.card,
        billing_details: {
          name: 'Test Name'
        }
      }
    }).then(result => {
      if (result.error) {
        // Show error to your customer (e.g., insufficient funds)
        this.paymentLoading = false;
        this.paymentFailed = true;
        this.paymentSubmitted = false;
        this.failureReason = result.error.message;
        this.paymentSucceed = false;
      } else {
        // The payment has been processed!
        if (result.paymentIntent.status === 'succeeded') {
          this.transactionService
            .fastTrackProductOwnership(result.paymentIntent.id)
            .pipe(finalize(() => {
              this.paymentLoading = false;
              this.paymentSucceed = true;
              this.paymentFailed = false;
              this.closeModal.emit(true);
            }))
            .subscribe(p => {
              this.purchaseId = p.transactionIdentifier;
              this.assetDownloadLinkEmitter.emit(p);
            });


          // Show a success message to your customer
          // There's a risk of the customer closing the window before callback
          // execution. Set up a webhook or plugin to listen for the
          // payment_intent.succeeded event that handles any business critical
          // post-payment actions.
        }
      }
    });
    /* tslint:enable */
  }

}
