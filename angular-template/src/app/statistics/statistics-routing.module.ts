import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransactionHistoryComponent } from './components/transaction-history/transaction-history.component';
import { PayoutComponent } from './components/payout/payout.component';


const routes: Routes = [
  { path: 'financials', component: TransactionHistoryComponent },
  { path: 'financials/payout', component: PayoutComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatisticsRoutingModule { }
