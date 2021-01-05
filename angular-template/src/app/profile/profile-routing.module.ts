import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileViewerComponent } from './components/profile-viewer/profile-viewer.component';
import { ProfileEditorComponent } from './components/profile-editor/profile-editor.component';
import { OpenSellerAccountComponent } from './components/open-seller-account/open-seller-account.component';
import { VerifyLandingComponent } from './components/verify-landing/verify-landing.component';


const routes: Routes = [
  { path: 'edit', component: ProfileEditorComponent },
  { path: 'become-seller', component: OpenSellerAccountComponent },
  { path: 'verify/:uuid', component: VerifyLandingComponent },
  { path: ':uuid', component: ProfileViewerComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
