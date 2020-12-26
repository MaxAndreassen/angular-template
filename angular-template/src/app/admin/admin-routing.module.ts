import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubmissionsComponent } from './components/submissions/submissions.component';
import { AssetReviewComponent } from './components/asset-review/asset-review.component';


const routes: Routes = [
  { path: 'submissions', component: SubmissionsComponent },
  { path: 'review/:uuid', component: AssetReviewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
