import { Component, OnInit } from '@angular/core';
import { Email } from '../../../shared/models/auth.models';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { finalize } from 'rxjs/operators';
import { OwnedProductsService } from '../../../shared/services/owned-products/owned-products.service';
import { IValidationResult, ValidationResult } from '../../../shared/models/validation,models';

@Component({
  selector: 'app-request-product-email',
  templateUrl: './request-product-email.component.html',
  styleUrls: ['./request-product-email.component.scss']
})
export class RequestProductEmailComponent implements OnInit {
  editor = new Email();
  validationResult: IValidationResult;
  loading = false;

  failed = false;
  succeeded = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ownedProductsService: OwnedProductsService
  ) { }

  ngOnInit(): any {
  }

  submit(): any {
    this.loading = true;
    this.failed = false;
    this.succeeded = false;

    this.ownedProductsService.createProductOwnerLink(this.editor)
      .pipe(finalize(() => this.loading = false))
      .subscribe(p => this.succeeded = true, err => {
        this.failed = true;
        if (err.status && err.status === 412) {
          this.validationResult = err.error;
        } else {
          this.validationResult = new ValidationResult('Unknown Error.');
        }
      });
  }
}
