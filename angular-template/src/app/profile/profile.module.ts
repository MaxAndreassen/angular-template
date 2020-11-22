import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileEditorComponent } from './profile-editor/profile-editor.component';
import { ProfileViewerComponent } from './profile-viewer/profile-viewer.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ProfileRoutingModule
  ],
  declarations: [
    ProfileEditorComponent,
    ProfileViewerComponent
  ]
})
export class ProfileModule { }
