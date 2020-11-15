import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { SecurityModule } from './security/security.module';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {
    path: '', component: MainComponent
  },
  {
    path: 'security',
    loadChildren: () => SecurityModule
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
