import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreatorProductDashboardComponent } from './components/creator-product-dashboard/creator-product-dashboard.component';
import { ProductEditorComponent } from './components/product-editor/product-editor.component';


const routes: Routes = [
  { path: 'me', component: CreatorProductDashboardComponent },
  { path: 'new', component: ProductEditorComponent },
  { path: 'edit/:uuid', component: ProductEditorComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
