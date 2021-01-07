import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../shared/services/product/product.service';
import { finalize } from 'rxjs/operators';
import { ProductVersionSummary, AssetContent, ProductSummary } from '../../../shared/models/product.models.ts';
import { FileSummary } from '../../../shared/models/file.models';
import { faFileContract, faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../../../profile/services/user.service';
import { UserEditor, SilentAccountResponse } from '../../../profile/models/profile.models';
import { FileSizeHelperService } from '../../../shared/services/file-size-helper/file-size-helper.service';
import { HttpEventType } from '@angular/common/http';
import { SecurityContext, AuthenticationRequest, User } from '../../../shared/models/auth.models';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { IValidationResult } from '../../../shared/models/validation,models';

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

  securityContext: SecurityContext;

  guestEmail: string;

  silentProfileSuccess = false;
  silentAccountLoading = false;
  silentAccountValidationResult: IValidationResult;

  loggingIn = false;
  loginEditor = new AuthenticationRequest();
  loginLoading = false;
  loginFailed = false;

  constructor(
    private productService: ProductService,
    private userService: UserService,
    private authService: AuthService,
    private fileSizeHelper: FileSizeHelperService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): any {
    this.loading = true;
    this.filesLoading = true;
    this.ownedLoading = true;

    this.authService.authStateChange$.subscribe((context: SecurityContext) => {
      this.securityContext = context;
    });

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

  createSilentAccount(): any {
    this.silentAccountLoading = true;
    this.silentAccountValidationResult = null;

    this.userService
      .createSilentAccount({ email: this.guestEmail })
      .pipe(finalize(() => this.silentAccountLoading = false))
      .subscribe(p => {
        this.authService.setGuestUuid(p.uuid);
        this.silentProfileSuccess = true;
      }, err => {
        if (err.status && err.status === 412) {
          this.silentAccountValidationResult = err.error;
        }
      });
  }

  toggleLogin(): any {
    this.loggingIn = !this.loggingIn;
  }

  login(): any {
    this.loginLoading = true;

    this.authService
      .login<User>(this.loginEditor)
      .pipe(finalize(() => this.loginLoading = false))
      .subscribe(res => {
        this.loginFailed = false;
      }, err => {
        if (err.status && (err.status === 412 || err.status === 401 || err.status === 400)) {
          this.loginFailed = true;
        }
      });
  }
}
