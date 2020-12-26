import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { SecurityModule } from './security/security.module';
import { MainComponent } from './main/main.component';
import { ProfileModule } from './profile/profile.module';
import { CheckOutModule } from './check-out/check-out.module';
import { ProductModule } from './product/product.module';
import { ProductSearchComponent } from './product/components/product-search/product-search.component';
import { AdminModule } from './admin/admin.module';

const routes: Routes = [
  {
    path: '', component: ProductSearchComponent
  },
  {
    path: 'security',
    loadChildren: () => SecurityModule
  },
  {
    path: 'profile',
    loadChildren: () => ProfileModule
  },
  {
    path: 'purchase',
    loadChildren: () => CheckOutModule
  },
  {
    path: 'product',
    loadChildren: () => ProductModule
  },
  {
    path: 'admin',
    loadChildren: () => AdminModule
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
