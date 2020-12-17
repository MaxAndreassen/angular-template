import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './components/card/card.component';
import { ValidationSummaryComponent } from './components/validation-summary/validation-summary.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { FileUploaderComponent } from './components/file-uploader/file-uploader.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CardComponent,
    ValidationSummaryComponent,
    LoadingSpinnerComponent,
    FileUploaderComponent
  ],
  exports: [
    CardComponent,
    ValidationSummaryComponent,
    LoadingSpinnerComponent,
    FileUploaderComponent
  ]
})
export class SharedModule { }
