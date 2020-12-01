import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileEditorComponent } from './components/profile-editor/profile-editor.component';
import { ProfileViewerComponent } from './components/profile-viewer/profile-viewer.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ProfileRoutingModule,
    SharedModule
  ],
  declarations: [
    ProfileEditorComponent,
    ProfileViewerComponent
  ]
})
export class ProfileModule { }
