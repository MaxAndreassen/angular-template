import { Component, OnInit } from '@angular/core';
import { PasswordReset } from '../../shared/models/auth.models';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../shared/services/auth/auth.service';
import { finalize } from 'rxjs/operators';
import { ValidationResult, IValidationResult } from '../../shared/models/validation,models';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  editor = new PasswordReset();
  validationResult: IValidationResult;
  loading = false;

  failed = false;
  succeeded = false;
  newLinkRequired = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit(): any {
    this.route.paramMap.subscribe(params => {
      this.editor.attemptUuid = params.get('uuid');
    });
  }

  submit(): any {
    this.validationResult = new ValidationResult();

    this.loading = true;
    this.failed = false;
    this.succeeded = false;

    this.authService.resetPassword(this.editor)
      .pipe(finalize(() => this.loading = false))
      .subscribe(p => {
        this.succeeded = true;
        this.router.navigateByUrl('/security/login?newPassword=true');
      }, err => {
        this.failed = true;

        if (err.status && err.status === 412) {
          this.validationResult = err.error;
        }
        if (err.status && err.status === 500) {
          this.validationResult = new ValidationResult('An Unknown Error Occured.');
        }
        if (err.status && (err.status === 404 || err.status === 400)) {
          this.validationResult = new ValidationResult('Oops, this link is expired! Please request a new link from the forgotten password page.');
          this.newLinkRequired = true;
        }
      });
  }

  routeForgottenPassword(): any {
    this.router.navigateByUrl('/security/forgotten-password');
  }
}
