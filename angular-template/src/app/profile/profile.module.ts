import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileEditorComponent } from './components/profile-editor/profile-editor.component';
import { ProfileViewerComponent } from './components/profile-viewer/profile-viewer.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { OpenSellerAccountComponent } from './components/open-seller-account/open-seller-account.component';
import { VerifyLandingComponent } from './components/verify-landing/verify-landing.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ProfileRoutingModule,
    SharedModule
  ],
  declarations: [
    ProfileEditorComponent,
    ProfileViewerComponent,
    OpenSellerAccountComponent,
    VerifyLandingComponent
  ]
})
export class ProfileModule { }
