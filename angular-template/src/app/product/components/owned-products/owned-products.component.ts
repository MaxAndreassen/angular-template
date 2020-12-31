import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { ProductQueryRequest, ProductSummary, ProductVersionSummary } from '../../../shared/models/product.models.ts';
import { SecurityContext } from '../../../shared/models/auth.models';
import { isPlatformServer } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { ProductService } from '../../../shared/services/product/product.service';
import { finalize } from 'rxjs/operators';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-owned-products',
  templateUrl: './owned-products.component.html',
  styleUrls: ['./owned-products.component.scss']
})
export class OwnedProductsComponent implements OnInit {
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

    this.queryParams.ownerUserUuid = this.securityContext.user.uuid;
    this.productService
      .listApprovedProducts(this.queryParams)
      .pipe(finalize(() => this.loading = false))
      .subscribe(res => {
        this.products = res;
      });
  }

  download(productVersion: ProductSummary): any {
    productVersion.downloadFailed = false;
    productVersion.downloading = true;
    productVersion.downloadPercentage = 1;

    this.productService.downloadProductVersionAsset(productVersion.versionUuid)
      .subscribe(resp => {
        if (resp.type === HttpEventType.Response) {
          productVersion.downloading = false;
          const a: any = document.createElement('a');
          document.body.appendChild(a);
          a.style = 'display: none';
          const url = window.URL.createObjectURL(resp.body);
          a.href = url;
          a.download = productVersion.name;
          a.click();
          window.URL.revokeObjectURL(url);
        }

        if (resp.type === HttpEventType.Sent) {
          productVersion.downloadPercentage = 10;
        }

        if (resp.type === HttpEventType.DownloadProgress) {
          productVersion.downloadPercentage = Math.max(10, Math.min(Math.floor(100 * resp.loaded / resp.total), 99));
        }
      }, err => {
        productVersion.downloadFailed = true;
      });
  }

}
