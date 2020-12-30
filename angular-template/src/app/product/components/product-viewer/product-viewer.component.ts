import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../shared/services/product/product.service';
import { finalize } from 'rxjs/operators';
import { ProductVersionSummary, AssetContent } from '../../../shared/models/product.models.ts';
import { FileSummary } from '../../../shared/models/file.models';
import { faFileContract, faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../../../profile/services/user.service';
import { UserEditor } from '../../../profile/models/profile.models';
import { FileSizeHelperService } from '../../../shared/services/file-size-helper/file-size-helper.service';

@Component({
  selector: 'app-product-viewer',
  templateUrl: './product-viewer.component.html',
  styleUrls: ['./product-viewer.component.scss']
})
export class ProductViewerComponent implements OnInit {

  product: ProductVersionSummary = new ProductVersionSummary();
  user: UserEditor = new UserEditor();
  extraProducts: ProductVersionSummary[] = [];
  files: FileSummary[] = [];
  assetContent: AssetContent = new AssetContent();

  loading = false;
  filesLoading = false;
  ownsProduct = false;

  licenseIcon = faFileContract;
  refundIcon = faShieldAlt;

  constructor(
    private productService: ProductService,
    private userService: UserService,
    private fileSizeHelper: FileSizeHelperService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): any {
    this.route.paramMap.subscribe(params => {
      this.loading = true;
      this.filesLoading = true;

      this.productService
        .getProductSummary(params.get('uuid'))
        .pipe(finalize(() => this.loading = false))
        .subscribe(result => {
          this.product = result;

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
            .getIsProductOwnedByMe(params.get('uuid'))
            .subscribe(ownership => {
              this.ownsProduct = ownership.ownsProduct;
            });

          this.productService
            .getAssetContentsForProductVersion(params.get('uuid'))
            .subscribe(p => {
              this.assetContent = p;
              this.assetContent.fileSizeFriendly = this.fileSizeHelper.getFileSize(this.assetContent.fileSize);
            });

          this.productService
            .listFilesForProduct(params.get('uuid'))
            .pipe(finalize(() => this.filesLoading = false))
            .subscribe(fileResult => {
              this.files = fileResult;
            });
        });
    });
  }

  purchase(): any {
    this.router.navigateByUrl(`purchase/${this.product.uuid}`);
  }

}
