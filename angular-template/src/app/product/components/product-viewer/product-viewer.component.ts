import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../shared/services/product/product.service';
import { finalize } from 'rxjs/operators';
import { ProductVersionSummary, AssetContent, ProductSummary } from '../../../shared/models/product.models.ts';
import { FileSummary } from '../../../shared/models/file.models';
import { faFileContract, faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../../../profile/services/user.service';
import { UserEditor } from '../../../profile/models/profile.models';
import { FileSizeHelperService } from '../../../shared/services/file-size-helper/file-size-helper.service';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-product-viewer',
  templateUrl: './product-viewer.component.html',
  styleUrls: ['./product-viewer.component.scss']
})
export class ProductViewerComponent implements OnInit {
  @Input() productVersionUuid: string;
  @Input() externalFacing: boolean;

  modalOpen = false;
  closeModal = false;

  productVersion: ProductVersionSummary = new ProductVersionSummary();
  user: UserEditor = new UserEditor();
  extraProducts: ProductSummary[] = [];
  files: FileSummary[] = [];
  assetContent: AssetContent = new AssetContent();

  loading = false;
  filesLoading = false;
  ownsProduct = false;

  ownedLoading = false;

  licenseIcon = faFileContract;
  refundIcon = faShieldAlt;

  downloadFailed = false;
  downloading = false;
  downloadPercentage = 1;
  possibleTooEarlyDownload = false;

  constructor(
    private productService: ProductService,
    private userService: UserService,
    private fileSizeHelper: FileSizeHelperService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): any {
    this.loading = true;
    this.filesLoading = true;
    this.ownedLoading = true;

    this.productService
      .getProductSummary(this.productVersionUuid)
      .pipe(finalize(() => this.loading = false))
      .subscribe(result => {
        this.productVersion = result;

        this.userService
          .getUser(result.creatorUserUuid)
          .subscribe(user => {
            this.user = user;
          });

        this.productService
          .listApprovedProducts({ creatorUserUuid: result.creatorUserUuid })
          .subscribe(extraProducts => {
            this.extraProducts = extraProducts;
          });

        this.productService
          .getIsProductOwnedByMe(this.productVersion.productUuid)
          .pipe(finalize(() => this.ownedLoading = false))
          .subscribe(ownership => {
            this.ownsProduct = ownership.ownsProduct;
          });

        this.productService
          .getAssetContentsForProductVersion(this.productVersionUuid)
          .subscribe(p => {
            this.assetContent = p;
            this.assetContent.fileSizeFriendly = this.fileSizeHelper.getFileSize(this.assetContent.fileSize);
          });

        this.productService
          .listFilesForProduct(this.productVersionUuid)
          .pipe(finalize(() => this.filesLoading = false))
          .subscribe(fileResult => {
            this.files = fileResult;
          });
      });
  }

  purchase(): any {
    this.modalOpen = true;
  }

  setCloseModal(event: boolean): any {
    this.closeModal = event;
    this.ownsProduct = true;
  }

  download(): any {
    this.possibleTooEarlyDownload = false;
    this.downloadFailed = false;
    this.downloading = true;
    this.downloadPercentage = 1;

    this.productService.downloadProductVersionAsset(this.productVersion.uuid)
      .pipe(finalize(() => this.downloading = false))
      .subscribe(resp => {
        if (resp.type === HttpEventType.Response) {
          this.downloading = false;
          const a: any = document.createElement('a');
          document.body.appendChild(a);
          a.style = 'display: none';
          const url = window.URL.createObjectURL(resp.body);
          a.href = url;
          a.download = this.productVersion.name;
          a.click();
          window.URL.revokeObjectURL(url);
        }

        if (resp.type === HttpEventType.Sent) {
          this.downloadPercentage = 10;
        }

        if (resp.type === HttpEventType.DownloadProgress) {
          this.downloadPercentage = Math.max(10, Math.min(Math.floor(100 * resp.loaded / resp.total), 99));
        }
      }, err => {
        if (err.status && err.status === 403) {
          this.possibleTooEarlyDownload = true;
        }

        this.downloadFailed = true;
      });
  }
}
