import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubmissionsComponent } from './components/submissions/submissions.component';
import { AdminRoutingModule } from './admin-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { AssetReviewComponent } from './components/asset-review/asset-review.component';
import { ProductModule } from '../product/product.module';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    SharedModule,
    FontAwesomeModule,
    ProductModule
  ],
  declarations: [
    SubmissionsComponent,
    AssetReviewComponent
  ]
})
export class AdminModule { }
