import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { UserEditor } from '../../models/profile.models';
import { isPlatformServer } from '@angular/common';
import { SecurityContext } from '../../../shared/models/auth.models';
import { UserService } from '../../services/user.service';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { PaymentService } from '../../../shared/services/payment/payment.service';
import { Upload, FileSummary } from '../../../shared/models/file.models';
import { IValidationResult, ValidationResult } from '../../../shared/models/validation,models';

@Component({
  selector: 'app-profile-editor',
  templateUrl: './profile-editor.component.html',
  styleUrls: ['./profile-editor.component.scss']
})
export class ProfileEditorComponent implements OnInit {
  loading = false;
  initialPageLoading = false;
  validationResult: IValidationResult = new ValidationResult();
  successfullyUpdated = false;

  emailSending = false;
  emailSent = false;

  failed = false;
  editor: UserEditor = new UserEditor();

  firstName: string;
  lastName: string;
  username: string;

  securityContext: SecurityContext;

  existingProfileImage: FileSummary[] = [];

  constructor(
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: any,
    private userService: UserService,
    private router: Router
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

    this.userService
      .getUser(this.securityContext.user.uuid)
      .pipe(finalize(() => this.initialPageLoading = false))
      .subscribe(result => {
        this.editor = result;
        this.firstName = this.editor.firstName;
        this.lastName = this.editor.lastName;
        this.username = this.editor.username;
      });
  }

  update(): any {
    this.loading = true;
    this.successfullyUpdated = false;

    this.userService
      .updateUser(this.editor)
      .pipe(finalize(() => this.loading = false))
      .subscribe(result => {
        this.validationResult = new ValidationResult();
        this.successfullyUpdated = true;

        this.editor = result;
        this.firstName = this.editor.firstName;
        this.lastName = this.editor.lastName;
        this.username = this.editor.username;
      }, err => {
        if (err.status && err.status === 412) {
          this.validationResult = err.error;
        }
        if (err.status && err.status === 500) {
          this.validationResult = new ValidationResult('An Unknown Error Occured.');
        }
      });
  }

  updateProfileImage(uploads: Upload[]): any {
    this.existingProfileImage = [];

    if (uploads.length === 0) {
      this.editor.profileImage = null;
    }

    this.editor.profileImage = uploads[0].file;
  }

  updateExistingProfileImage(existingFiles: FileSummary[]): any {
    if (existingFiles.length === 0) {
      this.editor.existingProfileUuid = null;
    }

    this.editor.existingProfileUuid = existingFiles.map(p => p.uuid).find(p => true);
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
