import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductRoutingModule } from './product-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { CreatorProductDashboardComponent } from './components/creator-product-dashboard/creator-product-dashboard.component';
import { ProductEditorComponent } from './components/product-editor/product-editor.component';
import { ProductSearchComponent } from './components/product-search/product-search.component';
import { ProductViewerComponent } from './components/product-viewer/product-viewer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProductListingComponent } from './components/product-listing/product-listing.component';
import { OwnedProductsComponent } from './components/owned-products/owned-products.component';
import { CheckOutModule } from '../check-out/check-out.module';
import { OwnedProductsByLinkComponent } from './components/owned-products-by-link/owned-products-by-link.component';
import { OwnedProductsBySecurityContextComponent } from './components/owned-products-by-security-context/owned-products-by-security-context.component';
import { RequestProductEmailComponent } from './components/request-product-email/request-product-email.component';

@NgModule({
  imports: [
    CommonModule,
    ProductRoutingModule,
    FormsModule,
    SharedModule,
    FontAwesomeModule,
    CheckOutModule,
    NgSelectModule
  ],
  declarations: [
    CreatorProductDashboardComponent,
    ProductEditorComponent,
    ProductSearchComponent,
    ProductViewerComponent,
    ProductListingComponent,
    OwnedProductsComponent,
    OwnedProductsByLinkComponent,
    OwnedProductsBySecurityContextComponent,
    RequestProductEmailComponent
  ],
  exports: [
    ProductViewerComponent
  ]
})
export class ProductModule { }
