import { Injectable, Inject } from '@angular/core';
import { APP_CONFIG, IAppConfig } from '../../models/configuration.models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountLink, Account, PaymentIntentSecret, AccountBalance, Transfer } from '../../models/payment.models';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(
    @Inject(APP_CONFIG) public config: IAppConfig,
    private http: HttpClient
  ) { }

  createAccountLink(): Observable<AccountLink> {
    const url = `${this.config.apiUrl}payment/account-link`;
    return this.http.post<AccountLink>(url, null);
  }

  getAccount(userUuid: string): Observable<Account> {
    const url = `${this.config.apiUrl}payment/account/${userUuid}`;
    return this.http.get<Account>(url);
  }

  getAccountBalance(userUuid: string): Observable<AccountBalance> {
    const url = `${this.config.apiUrl}payment/account/${userUuid}/balance`;
    return this.http.get<AccountBalance>(url);
  }

  createPaymentIntent(productUuid: string): Observable<PaymentIntentSecret> {
    const url = `${this.config.apiUrl}payment/purchase/${productUuid}`;
    return this.http.post<PaymentIntentSecret>(url, null);
  }

  getAccountTransfers(userUuid: string, startingAfter?: string): Observable<Transfer[]> {
    if (!startingAfter) {
      startingAfter = '';
    }

    const url = `${this.config.apiUrl}payment/account/${userUuid}/transfers?startingAfter=${startingAfter}`;
    return this.http.get<Transfer[]>(url);
  }
}
