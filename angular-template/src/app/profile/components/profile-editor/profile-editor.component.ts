import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { UserEditor } from '../../models/profile.models';
import { isPlatformServer } from '@angular/common';
import { SecurityContext } from '../../../shared/models/auth.models';
import { UserService } from '../../services/user.service';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { PaymentService } from '../../../shared/services/payment/payment.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-profile-editor',
  templateUrl: './profile-editor.component.html',
  styleUrls: ['./profile-editor.component.scss']
})
export class ProfileEditorComponent implements OnInit {
  loading = false;
  initialPageLoading = false;
  paymentLinkLoading = false;
  paymentCheckLoading = false;

  failed = false;
  editor: UserEditor = { firstName: 'placeholder', lastName: 'placeholder', username: 'placeholder' };

  firstName: string;
  lastName: string;

  paymentProviderAccountCreated = false;

  securityContext: SecurityContext;

  constructor(
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: any,
    private userService: UserService,
    private router: Router,
    private paymentService: PaymentService,
    @Inject(DOCUMENT) private document: Document
  ) {
  }

  ngOnInit(): any {
    if (isPlatformServer(this.platformId)) {
      return;
    }

    this.authService.securityCheck(this.router);

    this.authService.authStateChange$.subscribe((context: SecurityContext) => {
      this.securityContext = context;

      if (!this.securityContext.authenticated) {
        this.router.navigateByUrl('/security/login');
      }
    });

    this.initialPageLoading = true;
    this.paymentCheckLoading = true;

    this.paymentService
    .getAccount(this.securityContext.user.uuid)
    .pipe(finalize(() => this.paymentCheckLoading = false))
    .subscribe(result => {
      this.paymentProviderAccountCreated = result.payoutsEnabled;
    });

    this.userService
      .getUser(this.securityContext.user.uuid)
      .pipe(finalize(() => this.initialPageLoading = false))
      .subscribe(result => {
        this.editor = result;
        this.firstName = this.editor.firstName;
        this.lastName = this.editor.lastName;
      });
  }

  update(): any {
    this.loading = true;

    this.userService
      .updateUser(this.editor)
      .pipe(finalize(() => this.loading = false))
      .subscribe(result => {
        this.editor = result;
        this.firstName = this.editor.firstName;
        this.lastName = this.editor.lastName;
      });
  }

  paymentOnboarding(): any {
    this.paymentLinkLoading = true;

    this.paymentService
      .createAccountLink()
      .pipe(finalize(() => this.paymentLinkLoading = false))
      .subscribe(result => {
        this.document.location.href = result.url;
      });
  }
}
