import { Component, OnInit } from '@angular/core';
import { SignUpRequest } from '../../shared/models/auth.models';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../shared/services/auth/auth.service';
import { finalize } from 'rxjs/operators';
import { IValidationResult, ValidationResult } from '../../shared/models/validation,models';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  editor = new SignUpRequest();
  validationResult: IValidationResult = new ValidationResult();
  loading = false;
  deactivated = false;
  reactivate = false;
  redirectUrl: string = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit(): any {
  }

  register(): any {
    this.loading = true;

    this.authService
      .register(this.editor)
      .pipe(finalize(() => this.loading = false))
      .subscribe(res => {
        this.router.navigateByUrl('/security/login');
      }, err => {
        if (err.status && err.status === 412) {
          this.validationResult = err.error;
        }
        if (err.status && err.status === 500) {
          this.validationResult  = new ValidationResult('An Unknown Error Occured.');
        }
      });
  }

  routeLogin(): any {
    this.router.navigateByUrl('/security/login');
  }

}
