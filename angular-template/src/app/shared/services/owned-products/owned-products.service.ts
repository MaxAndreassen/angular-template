import { Injectable, Inject } from '@angular/core';
import { IAppConfig, APP_CONFIG } from '../../models/configuration.models';
import { HttpClient } from '@angular/common/http';
import { ProductOwnerLink } from '../../models/product.models.ts';
import { Observable } from 'rxjs';
import { Email } from '../../models/auth.models';

@Injectable({
  providedIn: 'root'
})
export class OwnedProductsService {

  constructor(
    @Inject(APP_CONFIG) public config: IAppConfig,
    private http: HttpClient
  ) { }

  getProductOwnerLink(uuid: string): Observable<ProductOwnerLink> {
    const url = `${this.config.apiUrl}owned-products/get-link/${uuid}`;
    return this.http.get<ProductOwnerLink>(url);
  }

  createProductOwnerLink(email: Email): Observable<boolean> {
    const url = `${this.config.apiUrl}owned-products/create-link`;
    return this.http.post<boolean>(url, email);
  }
}
