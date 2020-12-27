import { Component, OnInit } from '@angular/core';
import { ProductVersionSummary, ProductVersionSubmissionSummary, ProductVersionSubmissionEditor } from '../../../shared/models/product.models.ts';
import { UserEditor } from '../../../profile/models/profile.models';
import { FileSummary } from '../../../shared/models/file.models';
import { faFileContract, faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import { ProductService } from '../../../shared/services/product/product.service';
import { UserService } from '../../../profile/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { ProductVersionSubmissionService } from '../../../shared/services/product-version-submission/product-version-submission.service';
import { IValidationResult, ValidationResult } from '../../../shared/models/validation,models';

@Component({
  selector: 'app-asset-review',
  templateUrl: './asset-review.component.html',
  styleUrls: ['./asset-review.component.scss']
})
export class AssetReviewComponent implements OnInit {
  submission: ProductVersionSubmissionSummary = new ProductVersionSubmissionSummary();
  submissionEditor: ProductVersionSubmissionEditor = new ProductVersionSubmissionEditor();

  user: UserEditor = new UserEditor();

  loading = false;
  filesLoading = false;
  approvalLoading = false;

  files: FileSummary[] = [];

  licenseIcon = faFileContract;
  refundIcon = faShieldAlt;

  validationResult: IValidationResult = new ValidationResult();

  constructor(
    private productService: ProductService,
    private productVersionSubmissionService: ProductVersionSubmissionService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): any {
    this.route.paramMap.subscribe(params => {
      this.loading = true;
      this.filesLoading = true;

      this.productVersionSubmissionService
        .getProductSubmissions(params.get('uuid'))
        .pipe(finalize(() => this.loading = false))
        .subscribe(result => {
          this.submission = result;

          this.submissionEditor.uuid = params.get('uuid');
          this.submissionEditor.productVersionUuid = this.submission.productVersionUuid;

          this.userService
            .getUser(result.creatorUserUuid)
            .subscribe(user => {
              this.user = user;
            });

          this.productService
            .listFilesForProduct(this.submission.productVersionUuid)
            .pipe(finalize(() => this.filesLoading = false))
            .subscribe(fileResult => {
              this.files = fileResult;
            });
        });
    });
  }

  submit(approved: boolean): any {
    this.submissionEditor.approved = approved;
    this.approvalLoading = true;

    this.validationResult = new ValidationResult();

    this.productVersionSubmissionService
      .updateSubmission(this.submissionEditor)
      .pipe(finalize(() => this.approvalLoading = false))
      .subscribe(res => {
        this.router.navigateByUrl('admin/submissions');
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
