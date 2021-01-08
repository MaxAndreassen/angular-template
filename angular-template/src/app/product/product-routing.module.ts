import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreatorProductDashboardComponent } from './components/creator-product-dashboard/creator-product-dashboard.component';
import { ProductEditorComponent } from './components/product-editor/product-editor.component';
import { ProductSearchComponent } from './components/product-search/product-search.component';
import { ProductViewerComponent } from './components/product-viewer/product-viewer.component';
import { ProductListingComponent } from './components/product-listing/product-listing.component';
import { OwnedProductsComponent } from './components/owned-products/owned-products.component';
import { OwnedProductsByLinkComponent } from './components/owned-products-by-link/owned-products-by-link.component';
import { OwnedProductsBySecurityContextComponent } from './components/owned-products-by-security-context/owned-products-by-security-context.component';
import { RequestProductEmailComponent } from './components/request-product-email/request-product-email.component';


const routes: Routes = [
  { path: 'me', component: CreatorProductDashboardComponent },
  { path: 'new', component: ProductEditorComponent },
  { path: 'search', component: ProductSearchComponent },
  { path: 'owned', component: OwnedProductsBySecurityContextComponent },
  { path: 'edit/:uuid', component: ProductEditorComponent },
  { path: 'view/:uuid', component: ProductListingComponent },
  { path: 'owned/:uuid', component: OwnedProductsByLinkComponent },
  { path: 'request-products', component: RequestProductEmailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
