import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileViewerComponent } from './profile-viewer/profile-viewer.component';
import { ProfileEditorComponent } from './profile-editor/profile-editor.component';


const routes: Routes = [
  { path: 'edit', component: ProfileEditorComponent },
  { path: ':id', component: ProfileViewerComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
