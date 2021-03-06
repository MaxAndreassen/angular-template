import { Component, OnInit } from '@angular/core';
import { Email } from '../../shared/models/auth.models';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../shared/services/auth/auth.service';
import { finalize } from 'rxjs/operators';
import { IValidationResult, ValidationResult } from '../../shared/models/validation,models';

@Component({
  selector: 'app-forgotten-password',
  templateUrl: './forgotten-password.component.html',
  styleUrls: ['./forgotten-password.component.scss']
})
export class ForgottenPasswordComponent implements OnInit {
  editor = new Email();
  validationResult: IValidationResult;
  loading = false;

  failed = false;
  succeeded = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit(): any {
  }

  submit(): any {
    this.loading = true;
    this.failed = false;
    this.succeeded = false;

    this.authService.forgottenPassword(this.editor)
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

  routeLogin(): any {
    this.router.navigateByUrl('/security/login');
  }

  routeRegister(): any {
    this.router.navigateByUrl('/security/register');
  }
}
