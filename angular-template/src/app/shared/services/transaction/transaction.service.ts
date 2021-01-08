import { Injectable, Inject } from '@angular/core';
import { IAppConfig, APP_CONFIG } from '../../models/configuration.models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AssetDownloadLink } from '../../models/product.models.ts';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(
    @Inject(APP_CONFIG) public config: IAppConfig,
    private http: HttpClient
  ) { }

  fastTrackProductOwnership(paymentIntentId: string): Observable<AssetDownloadLink> {
    const url = `${this.config.apiUrl}transactions/${paymentIntentId}/fast-track-ownership`;
    return this.http.get<AssetDownloadLink>(url);
  }
}
