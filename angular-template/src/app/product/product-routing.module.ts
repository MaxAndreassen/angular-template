import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreatorProductDashboardComponent } from './components/creator-product-dashboard/creator-product-dashboard.component';
import { ProductEditorComponent } from './components/product-editor/product-editor.component';
import { ProductSearchComponent } from './components/product-search/product-search.component';
import { ProductViewerComponent } from './components/product-viewer/product-viewer.component';


const routes: Routes = [
  { path: 'me', component: CreatorProductDashboardComponent },
  { path: 'new', component: ProductEditorComponent },
  { path: 'search', component: ProductSearchComponent },
  { path: 'edit/:uuid', component: ProductEditorComponent },
  { path: 'view/:uuid', component: ProductViewerComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }