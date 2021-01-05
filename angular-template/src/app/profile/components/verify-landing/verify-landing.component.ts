import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-verify-landing',
  templateUrl: './verify-landing.component.html',
  styleUrls: ['./verify-landing.component.scss']
})
export class VerifyLandingComponent implements OnInit {

  loading = false;
  success = false;

  emailSending = false;
  emailSent = false;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): any {
    this.loading = true;
    this.route.paramMap.subscribe(params => {
      this.userService
        .verifyAccount(params.get('uuid'))
        .pipe(finalize(() => this.loading = false))
        .subscribe(p => {
          this.success = true;
        });
    });
  }

  home(): any {
    this.router.navigateByUrl('/profile/edit');
  }

  sendVerifyEmail(): any {
    this.emailSending = true;

    this.userService
      .resendVerifyEmail()
      .pipe(finalize(() => this.emailSending = false))
      .subscribe(p => {
        this.emailSent = true;
      });
  }
}
