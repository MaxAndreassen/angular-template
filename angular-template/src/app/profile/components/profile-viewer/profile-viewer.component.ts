import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { UserEditor } from '../../models/profile.models';
import { isPlatformServer } from '@angular/common';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SecurityContext } from '../../../shared/models/auth.models';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-profile-viewer',
  templateUrl: './profile-viewer.component.html',
  styleUrls: ['./profile-viewer.component.scss']
})
export class ProfileViewerComponent implements OnInit {
  failed = false;
  loading = false;
  data: UserEditor = { firstName: 'Unknown', lastName: 'User', username: '' };
  userUuid: string;

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): any {
    if (isPlatformServer(this.platformId)) {
      return;
    }

    this.route.paramMap.subscribe(params => {
      this.userUuid = params.get('uuid');

      this.loading = true;

      this.userService
        .getUser(this.userUuid)
        .pipe(finalize(() => this.loading = false))
        .subscribe(result => {
          this.data = result;
        });
    });
  }

}
