import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { ProductQueryRequest, ProductVersionSummary, ProductSummary } from '../../../shared/models/product.models.ts';
import { ProductService } from '../../../shared/services/product/product.service';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { isPlatformServer } from '@angular/common';
import { SecurityContext } from '../../../shared/models/auth.models';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss']
})
export class ProductSearchComponent implements OnInit {

  queryParams: ProductQueryRequest = new ProductQueryRequest();

  products: ProductSummary[] = [];

  currentPage = 0;

  loading = false;

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

      this.productService
        .listApprovedProducts(this.queryParams)
        .pipe(finalize(() => this.loading = false))
        .subscribe(res => {
          this.products = res;
        });
    });
  }

  prev(): any {
    if (this.queryParams.searchTerm) {
      this.router.navigateByUrl(`product/search?term=${this.queryParams.searchTerm}&page=${this.currentPage - 1}`);
    } else {
      this.router.navigateByUrl(`product/search?page=${this.currentPage - 1}`);
    }
  }

  next(): any {
    if (this.queryParams.searchTerm) {
      this.router.navigateByUrl(`product/search?term=${this.queryParams.searchTerm}&page=${this.currentPage + 1}`);
    } else {
      this.router.navigateByUrl(`product/search?page=${this.currentPage + 1}`);
    }
  }

}
