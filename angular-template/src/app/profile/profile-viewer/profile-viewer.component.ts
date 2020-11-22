import { Component, OnInit } from '@angular/core';
import { Profile } from '../models/profile.models';

@Component({
  selector: 'app-profile-viewer',
  templateUrl: './profile-viewer.component.html',
  styleUrls: ['./profile-viewer.component.scss']
})
export class ProfileViewerComponent {
  failed = false;
  loading = false;
  data: Profile = { firstName: 'Bob', lastName: 'Bobson', username: 'InfluencerBob42' };

  constructor() { }

}
