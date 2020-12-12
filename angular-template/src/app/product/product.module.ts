import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductRoutingModule } from './product-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { CreatorProductDashboardComponent } from './components/creator-product-dashboard/creator-product-dashboard.component';
import { ProductEditorComponent } from './components/product-editor/product-editor.component';

@NgModule({
  imports: [
    CommonModule,
    ProductRoutingModule,
    FormsModule,
    SharedModule
  ],
  declarations: [
    CreatorProductDashboardComponent,
    ProductEditorComponent
  ]
})
export class ProductModule { }
