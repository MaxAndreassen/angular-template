import { Injectable, Inject } from '@angular/core';
import { APP_CONFIG, IAppConfig } from '../../models/configuration.models';
import { HttpClient } from '@angular/common/http';
import { Observable, ObservedValueOf } from 'rxjs';
import { AccountLink, Account, PaymentIntentSecret, AccountBalance, Transfer, PayOut } from '../../models/payment.models';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(
    @Inject(APP_CONFIG) public config: IAppConfig,
    private http: HttpClient
  ) { }

  createAccountLink(returnLocation: string): Observable<AccountLink> {
    const url = `${this.config.apiUrl}payment/account-link?returnLocation=${returnLocation}`;
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

  createPaymentIntent(productUuid: string, userUuid: string): Observable<PaymentIntentSecret> {
    const url = `${this.config.apiUrl}payment/purchase/${productUuid}/user/${userUuid}`;
    return this.http.post<PaymentIntentSecret>(url, null);
  }

  requestPayout(amount: number, currency: string): Observable<boolean> {
    const url = `${this.config.apiUrl}payment/account/request-payout?amount=${amount}&currency=${currency}`;
    return this.http.get<boolean>(url);
  }

  getAccountTransfers(userUuid: string, startingAfter?: string): Observable<Transfer[]> {
    if (!startingAfter) {
      startingAfter = '';
    }

    const url = `${this.config.apiUrl}payment/account/${userUuid}/transfers?startingAfter=${startingAfter}`;
    return this.http.get<Transfer[]>(url);
  }

  getAccountPayouts(userUuid: string, startingAfter?: string): Observable<PayOut[]> {
    if (!startingAfter) {
      startingAfter = '';
    }

    const url = `${this.config.apiUrl}payment/account/${userUuid}/payouts?startingAfter=${startingAfter}`;
    return this.http.get<PayOut[]>(url);
  }

  getCurrencySymbol(currency: string): string {
    switch (currency) {
      case 'gbp': {
        return '£';
      }
      case 'eur': {
        return '€';
      }
      default: {
        return '$';
      }
    }
  }
}
