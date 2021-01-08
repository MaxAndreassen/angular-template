import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth/auth.service';
import { AuthenticationRequest, User } from '../../shared/models/auth.models';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { faLaptopHouse } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  editor = new AuthenticationRequest();
  // validationResult: IValidationResult;
  loading = false;
  failed = false;
  newPassword = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit(): any {
    this.route.queryParams.subscribe(params => {
      /* tslint:disable:no-string-literal */
      const email = params['email'];

      if (!!email) {
        this.editor.email = email;
      }
      /* tslint:enable:no-string-literal */

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

  routeRegister(): any {
    this.router.navigateByUrl('/security/register');
  }

  routeForgottenPassword(): any {
    this.router.navigateByUrl('/security/forgotten-password');
  }
}
