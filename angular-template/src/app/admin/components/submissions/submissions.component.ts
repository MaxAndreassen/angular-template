import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { ProductService } from '../../../shared/services/product/product.service';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductQueryRequest, ProductSummary } from '../../../shared/models/product.models.ts';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-submissions',
  templateUrl: './submissions.component.html',
  styleUrls: ['./submissions.component.scss']
})
export class SubmissionsComponent implements OnInit {

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

    this.authService.securityCheck(this.router);

    this.route.queryParamMap.subscribe(params => {
      this.loading = true;

      this.queryParams.searchTerm = params.get('term');
      this.currentPage = +params.get('page');
      this.queryParams.page = this.currentPage;
      this.queryParams.status = 1;

      this.productService
        .listProducts(this.queryParams)
        .pipe(finalize(() => this.loading = false))
        .subscribe(res => {
          this.products = res;
        });
    });
  }

  prev(): any {
    if (this.queryParams.searchTerm) {
      this.router.navigateByUrl(`admin/submissions?term=${this.queryParams.searchTerm}&page=${this.currentPage - 1}`);
    } else {
      this.router.navigateByUrl(`admin/submissions?page=${this.currentPage - 1}`);
    }
  }

  next(): any {
    if (this.queryParams.searchTerm) {
      this.router.navigateByUrl(`admin/submissions?term=${this.queryParams.searchTerm}&page=${this.currentPage + 1}`);
    } else {
      this.router.navigateByUrl(`admin/submissions?page=${this.currentPage + 1}`);
    }
  }

}
