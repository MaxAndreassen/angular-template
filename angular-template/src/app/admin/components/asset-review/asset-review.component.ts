import { Component, OnInit } from '@angular/core';
import { ProductVersionSummary } from '../../../shared/models/product.models.ts';
import { UserEditor } from '../../../profile/models/profile.models';
import { FileSummary } from '../../../shared/models/file.models';
import { faFileContract, faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import { ProductService } from '../../../shared/services/product/product.service';
import { UserService } from '../../../profile/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-asset-review',
  templateUrl: './asset-review.component.html',
  styleUrls: ['./asset-review.component.scss']
})
export class AssetReviewComponent implements OnInit {
  product: ProductVersionSummary = new ProductVersionSummary();
  user: UserEditor = new UserEditor();
  loading = false;
  filesLoading = false;

  files: FileSummary[] = [];

  licenseIcon = faFileContract;
  refundIcon = faShieldAlt;

  constructor(
    private productService: ProductService,
    private userService: UserService,
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
            .listFilesForProduct(params.get('uuid'))
            .pipe(finalize(() => this.filesLoading = false))
            .subscribe(fileResult => {
              this.files = fileResult;
            });
        });
    });
  }

  approve(): any {

  }

  reject(): any {

  }

}
