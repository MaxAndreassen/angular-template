import { Component, OnInit } from '@angular/core';
import { ProductEditor } from '../../../shared/models/product.models.ts';
import { ProductService } from '../../../shared/services/product/product.service';
import { finalize } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { SecurityContext } from '../../../shared/models/auth.models';
import { Upload } from '../../../shared/models/file.models';

@Component({
  selector: 'app-product-editor',
  templateUrl: './product-editor.component.html',
  styleUrls: ['./product-editor.component.scss']
})
export class ProductEditorComponent implements OnInit {
  editor: ProductEditor = new ProductEditor();
  creating = true;
  loading = false;

  securityContext: SecurityContext = new SecurityContext();

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
            if (result.userUuid !== this.securityContext.user.uuid) {
              this.router.navigateByUrl(`/product/view/${params.get('uuid')}`);
            }

            this.editor = result;
          });
      }
    });
  }

  updateMarketingMedia(uploads: Upload[]): any {
    this.editor.marketingMedia = uploads.map(p => p.file);
  }

  updateCoverImage(uploads: Upload[]): any {
    if (uploads.length === 0) {
      this.editor.coverImage = null;
    }

    this.editor.coverImage = uploads[0].file;
  }

  updateAssetZip(uploads: Upload[]): any {
    if (uploads.length === 0) {
      this.editor.assetZip = null;
    }

    this.editor.assetZip = uploads[0].file;
  }

  submit(): any {
    this.loading = true;

    this.productService
      .createProduct(this.editor)
      .pipe(finalize(() => this.loading = false))
      .subscribe(result => {
        this.editor = result;

        if (this.creating) {
          this.router.navigateByUrl(`product/edit/${result.uuid}`);
        }
      });
  }
}
