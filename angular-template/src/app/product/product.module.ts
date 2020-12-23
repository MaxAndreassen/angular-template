import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductRoutingModule } from './product-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { CreatorProductDashboardComponent } from './components/creator-product-dashboard/creator-product-dashboard.component';
import { ProductEditorComponent } from './components/product-editor/product-editor.component';
import { ProductSearchComponent } from './components/product-search/product-search.component';
import { ProductViewerComponent } from './components/product-viewer/product-viewer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProductSearchBoxComponent } from './components/product-search-box/product-search-box.component';

@NgModule({
  imports: [
    CommonModule,
    ProductRoutingModule,
    FormsModule,
    SharedModule,
    FontAwesomeModule
  ],
  declarations: [
    CreatorProductDashboardComponent,
    ProductEditorComponent,
    ProductSearchComponent,
    ProductViewerComponent,
    ProductSearchBoxComponent
  ]
})
export class ProductModule { }
