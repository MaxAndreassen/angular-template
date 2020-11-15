import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth/auth.service';
import { AuthenticationRequest, User } from '../../shared/models/auth.models';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  editor = new AuthenticationRequest();
  // validationResult: IValidationResult;
  loading = false;
  deactivated = false;
  reactivate = false;
  redirectUrl: string = null;
  failed = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit(): any {
    this.route.queryParams.subscribe(params => {
      /* tslint:disable:no-string-literal */
      this.deactivated = params['deactivated'] === 'true';
      this.reactivate = params['reactivate'] === 'true';
      this.redirectUrl = params['redirectUrl'];
      /* tslint:enable:no-string-literal */

      if (!this.deactivated || this.reactivate) {
        this.editor.email = this.authService.latestEmail();
      }

      this.editor.remember = true;
    });
  }

  login(): any {
    this.loading = true;

    this.authService
      .login<User>(this.editor)
      .pipe(finalize(() => this.loading = false))
      .subscribe(res => {
        this.failed = false;
        this.router.navigateByUrl('/');
      }, err => {
        if (err.status && (err.status === 412 || err.status === 401 || err.status === 400)) {
          this.failed = true;
        }
      });
  }

}
