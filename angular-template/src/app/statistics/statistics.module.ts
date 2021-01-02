import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionHistoryComponent } from './components/transaction-history/transaction-history.component';
import { StatisticsRoutingModule } from './statistics-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { PayoutComponent } from './components/payout/payout.component';

@NgModule({
  imports: [
    CommonModule,
    StatisticsRoutingModule,
    FormsModule,
    SharedModule,
    FontAwesomeModule
  ],
  declarations: [
    TransactionHistoryComponent,
    PayoutComponent
  ]
})
export class StatisticsModule { }
