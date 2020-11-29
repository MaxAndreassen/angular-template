import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './components/card/card.component';
import { ValidationSummaryComponent } from './components/validation-summary/validation-summary.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CardComponent,
    ValidationSummaryComponent
  ],
  exports: [
    CardComponent,
    ValidationSummaryComponent
  ]
})
export class SharedModule { }
