import { Component, OnInit } from '@angular/core';
import { UserEditor } from '../../models/profile.models';

@Component({
  selector: 'app-profile-viewer',
  templateUrl: './profile-viewer.component.html',
  styleUrls: ['./profile-viewer.component.scss']
})
export class ProfileViewerComponent {
  failed = false;
  loading = false;
  data: UserEditor = { firstName: 'Bob', lastName: 'Bobson', username: 'InfluencerBob42' };

  constructor() { }

}
