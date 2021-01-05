import { Component, OnInit } from '@angular/core';
import { ProductVersionEditor, ProductFileSummary } from '../../../shared/models/product.models.ts';
import { ProductService } from '../../../shared/services/product/product.service';
import { finalize } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { SecurityContext } from '../../../shared/models/auth.models';
import { Upload, FileSummary } from '../../../shared/models/file.models';
import { ValidationResult, IValidationResult } from '../../../shared/models/validation,models';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-product-editor',
  templateUrl: './product-editor.component.html',
  styleUrls: ['./product-editor.component.scss']
})
export class ProductEditorComponent implements OnInit {
  editor: ProductVersionEditor = new ProductVersionEditor();
  validationResult: IValidationResult = new ValidationResult();

  existingCoverImage: FileSummary[] = [];
  existingAssetZip: FileSummary[] = [];
  existingMarketingMedia: FileSummary[] = [];

  securityContext: SecurityContext = new SecurityContext();

  creating = true;
  loading = false;
  submitLoading = false;
  existingFilesLoading = false;
  successfullyUpdated = false;

  uploadPercentage = 0;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit(): any {
    this.authService.securityCheck(this.router);

    this.authService.authStateChange$.subscribe((context: SecurityContext) => {
      this.securityContext = context;

      if (!this.securityContext.authenticated) {
        this.router.navigateByUrl('/security/login');
      }
    });

    this.route.paramMap.subscribe(params => {
      this.creating = !params.get('uuid');

      if (!this.creating) {
        this.loading = true;

        this.productService
          .getProduct(params.get('uuid'))
          .pipe(finalize(() => this.loading = false))
          .subscribe(result => {
            if (!this.securityContext.user || !this.securityContext.authenticated ||
              result.creatorUserUuid !== this.securityContext.user.uuid) {
              this.router.navigateByUrl(`/product/view/${params.get('uuid')}`);
            }

            this.editor = result;

            this.existingFilesLoading = true;

            this.productService
              .listFilesForProduct(params.get('uuid'), true)
              .pipe(finalize(() => this.existingFilesLoading = false))
              .subscribe(fileResult => {
                this.existingCoverImage = fileResult.filter(p => p.type === 3);

                if (this.existingCoverImage && this.existingCoverImage.length > 0) {
                  this.editor.existingCoverImageUuid = this.existingCoverImage[0].uuid;
                }

                this.existingMarketingMedia = fileResult.filter(p => p.type === 2);

                if (this.existingMarketingMedia && this.existingMarketingMedia.length > 0) {
                  this.editor.existingMarketingMediaUuids = this.existingMarketingMedia.map(p => p.uuid);
                }

                this.existingAssetZip = fileResult.filter(p => p.type === 1);

                if (this.existingAssetZip && this.existingAssetZip.length > 0) {
                  this.editor.existingAssetZipUuid = this.existingAssetZip[0].uuid;
                }
              });
          });
      }
    });
  }

  updateMarketingMedia(uploads: Upload[]): any {
    this.editor.marketingMedia = uploads.map(p => p.file);
  }

  updateExistingMarketingMedia(existingFiles: FileSummary[]): any {
    this.editor.existingMarketingMediaUuids = existingFiles.map(p => p.uuid);
  }

  updateCoverImage(uploads: Upload[]): any {
    if (uploads.length === 0) {
      this.editor.coverImage = null;
    }

    this.editor.coverImage = uploads[0].file;
  }

  updateExistingCoverImage(existingFiles: FileSummary[]): any {
    this.editor.existingCoverImageUuid = null;
  }

  updateAssetZip(uploads: Upload[]): any {
    if (uploads.length === 0) {
      this.editor.assetZip = null;
    }

    this.editor.assetZip = uploads[0].file;
  }

  updateExistingAssetZip(existingFiles: FileSummary[]): any {
    this.editor.existingAssetZipUuid = null;
  }

  submit(): any {
    this.submitLoading = true;
    this.successfullyUpdated = false;
    this.uploadPercentage = 0;
    this.validationResult = new ValidationResult();

    this.productService
      .createProduct(this.editor)
      .pipe(finalize(() => this.submitLoading = false))
      .subscribe(resp => {
        if (resp.type === HttpEventType.Response) {
          this.successfullyUpdated = true;
          this.uploadPercentage = 100;

          this.router.navigateByUrl(`product/me`);
        }

        if (resp.type === HttpEventType.UploadProgress) {
          this.uploadPercentage = Math.min(Math.floor(100 * resp.loaded / resp.total), 99);
        }
      }, err => {
        if (err.status && err.status === 412) {
          this.validationResult = err.error;
        }
        if (err.status && err.status === 500) {
          this.validationResult = new ValidationResult('An Unknown Error Occured.');
        }
      });
  }
}
