import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { AuthService } from '../../shared/services/auth/auth.service';
import { Profile } from '../models/profile.models';
import { isPlatformServer } from '@angular/common';
import { SecurityContext } from '../../shared/models/auth.models';

@Component({
  selector: 'app-profile-editor',
  templateUrl: './profile-editor.component.html',
  styleUrls: ['./profile-editor.component.scss']
})
export class ProfileEditorComponent implements OnInit {
  loading = false;
  failed = false;
  editor: Profile = { firstName: 'Bob', lastName: 'Bobson', username: 'InfluencerBob42' };

  securityContext: SecurityContext;

  constructor(
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: any,
  ) {
  }

  ngOnInit(): any {
    if (isPlatformServer(this.platformId)) {
        return;
    }

    this.authService.authStateChange$.subscribe((context: SecurityContext) => {
        this.securityContext = context;
    });
  }

  update(): any {

  }

}
