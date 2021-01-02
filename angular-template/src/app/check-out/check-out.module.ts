import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckOutRoutingModule } from './check-out-routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CheckOutComponent } from './components/check-out/check-out.component';

@NgModule({
  imports: [
    CommonModule,
    CheckOutRoutingModule,
    FormsModule,
    SharedModule
  ],
  declarations: [
    CheckOutComponent
  ],
  exports: [
    CheckOutComponent
  ]
})
export class CheckOutModule { }
