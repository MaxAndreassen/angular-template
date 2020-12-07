import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckOutComponent } from './components/check-out/check-out.component';


const routes: Routes = [
  { path: ':productUuid', component: CheckOutComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckOutRoutingModule { }
