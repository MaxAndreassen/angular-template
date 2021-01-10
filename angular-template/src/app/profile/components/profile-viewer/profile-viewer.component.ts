import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { UserEditor } from '../../models/profile.models';
import { isPlatformServer } from '@angular/common';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SecurityContext } from '../../../shared/models/auth.models';
import { finalize } from 'rxjs/operators';
import { PaymentService } from '../../../shared/services/payment/payment.service';
import { PaymentIntentSecret } from '../../../shared/models/payment.models';
import { ProductVersionSummary, ProductSummary, ProductQueryRequest } from '../../../shared/models/product.models.ts';
import { ProductService } from '../../../shared/services/product/product.service';

@Component({
  selector: 'app-profile-viewer',
  templateUrl: './profile-viewer.component.html',
  styleUrls: ['./profile-viewer.component.scss']
})
export class ProfileViewerComponent implements OnInit {
  failed = false;
  loading = false;
  data: UserEditor = new UserEditor();
  userUuid: string;

  products: ProductSummary[] = [];

  queryParams: ProductQueryRequest = new ProductQueryRequest();

  currentPage = 0;
  total = 0;

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private userService: UserService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): any {
    if (isPlatformServer(this.platformId)) {
      return;
    }

    this.route.queryParamMap.subscribe(queryParams => {
      this.queryParams.page = +queryParams.get('page');
      this.currentPage = +queryParams.get('page');

      this.route.paramMap.subscribe(params => {
        this.userUuid = params.get('uuid');

        this.loading = true;

        this.userService
          .getUser(this.userUuid)
          .pipe(finalize(() => this.loading = false))
          .subscribe(result => {
            this.data = result;
            this.data.createdAt = new Date(this.data.createdAt);
          });

        this.queryParams.creatorUserUuid = this.userUuid;

        this.productService
          .listApprovedProducts(this.queryParams)
          .subscribe(extraProducts => {
            this.products = extraProducts.items;
            this.total = extraProducts.totalItems;
          });

      });
    });
  }

  prev(): any {
    this.router.navigateByUrl(`profile/${this.userUuid}?page=${this.currentPage - 1}`);
  }

  next(): any {
    this.router.navigateByUrl(`profile/${this.userUuid}?page=${this.currentPage + 1}`);
  }
}
