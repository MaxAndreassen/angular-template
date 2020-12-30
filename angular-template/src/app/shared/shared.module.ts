import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './components/card/card.component';
import { ValidationSummaryComponent } from './components/validation-summary/validation-summary.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { FileUploaderComponent } from './components/file-uploader/file-uploader.component';
import { FileGalleryComponent } from './components/file-gallery/file-gallery.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { VersionStatusBarComponent } from './components/version-status-bar/version-status-bar.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { FormsModule } from '@angular/forms';
import { AssetRowComponent } from './components/asset-row/asset-row.component';

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule
  ],
  declarations: [
    CardComponent,
    ValidationSummaryComponent,
    LoadingSpinnerComponent,
    FileUploaderComponent,
    FileGalleryComponent,
    VersionStatusBarComponent,
    SearchBoxComponent,
    AssetRowComponent
  ],
  exports: [
    CardComponent,
    ValidationSummaryComponent,
    LoadingSpinnerComponent,
    FileUploaderComponent,
    FileGalleryComponent,
    VersionStatusBarComponent,
    SearchBoxComponent,
    AssetRowComponent
  ]
})
export class SharedModule { }
