import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { AuthService } from '../../shared/services/auth/auth.service';
import { AuthBaseComponent } from '../../shared/components/auth-base-component';
import { Profile } from '../models/profile.models';

@Component({
  selector: 'app-profile-editor',
  templateUrl: './profile-editor.component.html',
  styleUrls: ['./profile-editor.component.scss']
})
export class ProfileEditorComponent extends AuthBaseComponent implements OnInit {
  loading = false;
  failed = false;
  editor: Profile = { firstName: 'Bob', lastName: 'Bobson', username: 'InfluencerBob42' };

  constructor(
    authService: AuthService,
    @Inject(PLATFORM_ID) platformId: any,
  ) {
    super(authService, platformId);
  }

  update(): any {

  }

}
