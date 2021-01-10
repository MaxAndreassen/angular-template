import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { ProductService } from '../../../shared/services/product/product.service';
import { ProductQueryRequest, ProductVersionSummary, ProductSummary } from '../../../shared/models/product.models.ts';
import { isPlatformServer } from '@angular/common';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { SecurityContext } from '../../../shared/models/auth.models';
import { Router, ActivatedRoute } from '@angular/router';
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

  currentPage = 0;

  total = 0;

  constructor(
    private productService: ProductService,
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: any,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): any {
    if (isPlatformServer(this.platformId)) {
      return;
    }
    this.route.queryParamMap.subscribe(params => {
      this.loading = true;

      this.queryParams.searchTerm = params.get('term');
      this.currentPage = +params.get('page');
      this.queryParams.page = this.currentPage;

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
          this.products = res.items;
          this.total = res.totalItems;
        });
    });
  }

  prev(): any {
    if (!this.queryParams.searchTerm) {
      this.queryParams.searchTerm = '';
    }

    this.router.navigateByUrl(`product/me?term=${this.queryParams.searchTerm}&page=${this.currentPage - 1}`);
  }

  next(): any {
    if (!this.queryParams.searchTerm) {
      this.queryParams.searchTerm = '';
    }

    this.router.navigateByUrl(`product/me?term=${this.queryParams.searchTerm}&page=${this.currentPage + 1}`);
  }
}
