import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { PaymentIntentSecret } from '../../../shared/models/payment.models';
import { PaymentService } from '../../../shared/services/payment/payment.service';
import { finalize } from 'rxjs/operators';
import { isPlatformServer } from '@angular/common';
import { IAppConfig, APP_CONFIG } from '../../../shared/models/configuration.models';
import { ProductSummary } from '../../../shared/models/product.models.ts';
import { ProductService } from '../../../shared/services/product/product.service';
import { ActivatedRoute, Router } from '@angular/router';

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

  product: ProductSummary = new ProductSummary();

  stripe: any;
  card: any;

  vat: number;

  status: string;

  constructor(
    private paymentService: PaymentService,
    @Inject(APP_CONFIG) public config: IAppConfig,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {

  }

  ngOnInit(): any {
    this.route.paramMap.subscribe(params => {
      this.productLoading = true;

      this.productService
        .getProductSummary(params.get('productUuid'))
        .pipe(finalize(() => this.productLoading = false))
        .subscribe(result => {
          this.product = result;
          this.vat = Math.round((this.product.priceInPounds * 0.2) * 100) / 100;
        }, err => {
          this.failed = true;
        });

      this.loading = true;
      this.paymentService
        .createPaymentIntent(params.get('productUuid'))
        .pipe(finalize(() => this.loading = false))
        .subscribe(res => {
          this.paymentIntent = res;
          this.setupStripe();
        }, err => {
          this.failed = true;
        });
    });
  }

  backToProduct(): any {
    this.router.navigateByUrl(`product/view/${this.product.uuid}`);
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
      this.status = result.paymentIntent.status;
      this.paymentLoading = false;

      if (result.error) {
        // Show error to your customer (e.g., insufficient funds)
        console.log(result.error.message);
        this.paymentFailed = true;
        this.failureReason = result.error.message;
        this.paymentSucceed = false;
      } else {
        // The payment has been processed!
        if (result.paymentIntent.status === 'succeeded') {
          this.paymentSucceed = true;
          this.paymentFailed = false;
          console.log(result.paymentIntent.status);
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
