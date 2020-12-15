import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { ProductService } from '../../../shared/services/product/product.service';
import { ProductQueryRequest, ProductSummary } from '../../../shared/models/product.models.ts';
import { isPlatformServer } from '@angular/common';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { SecurityContext } from '../../../shared/models/auth.models';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-creator-product-dashboard',
  templateUrl: './creator-product-dashboard.component.html',
  styleUrls: ['./creator-product-dashboard.component.scss']
})
export class CreatorProductDashboardComponent implements OnInit {
  queryParams: ProductQueryRequest = new ProductQueryRequest();

  securityContext: SecurityContext;

  products: ProductSummary[] = [];

  loading = false;

  constructor(
    private productService: ProductService,
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: any,
    private router: Router
  ) { }

  ngOnInit(): any {
    if (isPlatformServer(this.platformId)) {
      return;
    }

    this.loading = true;
    this.authService.securityCheck(this.router);

    this.authService.authStateChange$.subscribe((context: SecurityContext) => {
      this.securityContext = context;

      if (!this.securityContext.authenticated) {
        this.router.navigateByUrl('/security/login');
      }
    });

    this.queryParams.creatorUserUuid = this.securityContext.user.uuid;
    this.productService
      .listProducts(this.queryParams)
      .pipe(finalize(() => this.loading = false))
      .subscribe(res => {
        this.products = res;
      });
  }

}
