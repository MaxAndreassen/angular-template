import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { ProductService } from '../../../shared/services/product/product.service';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductQueryRequest, ProductSummary, ProductVersionSubmissionQueryParams, ProductVersionSubmissionSummary } from '../../../shared/models/product.models.ts';
import { finalize } from 'rxjs/operators';
import { ProductVersionSubmissionService } from '../../../shared/services/product-version-submission/product-version-submission.service';

@Component({
  selector: 'app-submissions',
  templateUrl: './submissions.component.html',
  styleUrls: ['./submissions.component.scss']
})
export class SubmissionsComponent implements OnInit {

  queryParams: ProductVersionSubmissionQueryParams = new ProductVersionSubmissionQueryParams();

  products: ProductVersionSubmissionSummary[] = [];

  currentPage = 0;

  loading = false;

  constructor(
    private productVersionSubmissionService: ProductVersionSubmissionService,
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

      this.productVersionSubmissionService
        .listProductSubmissions(this.queryParams)
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
