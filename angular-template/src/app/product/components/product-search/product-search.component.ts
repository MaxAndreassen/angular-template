import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { ProductQueryRequest, ProductSummary } from '../../../shared/models/product.models.ts';
import { ProductService } from '../../../shared/services/product/product.service';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { Router } from '@angular/router';
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

    this.productService
      .listProducts(this.queryParams)
      .pipe(finalize(() => this.loading = false))
      .subscribe(res => {
        this.products = res;
      });
  }

  search(): any {
    this.loading = true;

    this.productService
      .listProducts(this.queryParams)
      .pipe(finalize(() => this.loading = false))
      .subscribe(res => {
        this.products = res;
      });
  }
}
