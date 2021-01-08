import { Component, OnInit, PLATFORM_ID, Inject, Input, OnDestroy } from '@angular/core';
import { ProductQueryRequest, ProductSummary, ProductVersionSummary, ProductOwnerLink } from '../../../shared/models/product.models.ts';
import { SecurityContext } from '../../../shared/models/auth.models';
import { isPlatformServer } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { ProductService } from '../../../shared/services/product/product.service';
import { finalize } from 'rxjs/operators';
import { HttpEventType } from '@angular/common/http';
import { OwnedProductsService } from '../../../shared/services/owned-products/owned-products.service';

@Component({
  selector: 'app-owned-products',
  templateUrl: './owned-products.component.html',
  styleUrls: ['./owned-products.component.scss']
})
export class OwnedProductsComponent implements OnInit, OnDestroy {
  queryParams: ProductQueryRequest = new ProductQueryRequest();

  products: ProductSummary[] = [];

  loading = false;
  pageExpired: boolean;

  @Input() userUuid: string;
  @Input() temporaryLinkUuid: string;

  temporaryLink: ProductOwnerLink;
  temporaryLinkLoading = false;

  expiryVisual: string;
  expiryInterval: any;

  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private ownedProductsService: OwnedProductsService,
    @Inject(PLATFORM_ID) private platformId: any,
    private router: Router
  ) { }

  ngOnInit(): any {
    if (isPlatformServer(this.platformId)) {
      return;
    }

    this.loading = true;

    if (this.userUuid || this.temporaryLinkUuid) {
      this.queryParams.ownerUserUuid = this.userUuid;
      this.queryParams.temporaryOwnerLinkUuid = this.temporaryLinkUuid;

      this.productService
        .listApprovedProducts(this.queryParams)
        .pipe(finalize(() => this.loading = false))
        .subscribe(res => {
          this.products = res;
        });

      if (this.temporaryLinkUuid) {
        this.temporaryLinkLoading = true;

        this.ownedProductsService
          .getProductOwnerLink(this.temporaryLinkUuid)
          .pipe(finalize(() => this.temporaryLinkLoading = false))
          .subscribe(res => {
            this.temporaryLink = res;

            if (new Date(res.expiresAt) < new Date()) {
              this.pageExpired = true;
            } else {
              this.pageExpired = false;
            }

            this.expiryCountDown(res.expiresAt);
          });
      }
    }
  }

  ngOnDestroy(): any {
    if (!!this.expiryInterval) {
      clearInterval(this.expiryInterval);
    }
  }

  download(productVersion: ProductSummary): any {
    productVersion.downloadFailed = false;
    productVersion.downloading = true;
    productVersion.downloadPercentage = 1;

    this.productService.downloadProductVersionAsset(productVersion.versionUuid, this.temporaryLinkUuid)
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

  expiryCountDown(expiryDate: Date): any {
    const expiryTime = new Date(expiryDate).getTime();
    this.expiryCountDownCalc(expiryTime);

    this.expiryInterval = setInterval(() => {
      this.expiryCountDownCalc(expiryTime);
    }, 1000);
  }

  expiryCountDownCalc(expiryTime: number): any {
    const now = new Date().getTime();

    // Find the distance between now and the count down date
    const distance = expiryTime - now;

    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the element with id="demo"
    this.expiryVisual = minutes + 'm ' + seconds + 's ';

    // If the count down is finished, write some text
    if (distance < 0) {
      this.expiryVisual = '';
    }
  }
}
