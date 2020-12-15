import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAppConfig, APP_CONFIG } from '../../models/configuration.models';
import { ProductSummary, ProductEditor, ProductQueryRequest } from '../../models/product.models.ts';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    @Inject(APP_CONFIG) public config: IAppConfig,
    private http: HttpClient
  ) { }

  createProduct(editor: ProductEditor): Observable<ProductEditor> {
    const url = `${this.config.apiUrl}product/update`;
    return this.http.post<ProductEditor>(url, editor);
  }

  listProducts(queryParams: ProductQueryRequest): Observable<ProductSummary[]> {
    const url = `${this.config.apiUrl}product/list`;
    return this.http.post<ProductSummary[]>(url, queryParams);
  }

  getProduct(uuid: string): Observable<ProductEditor> {
    const url = `${this.config.apiUrl}product/get/${uuid}`;
    return this.http.get<ProductEditor>(url);
  }

  getProductSummary(uuid: string): Observable<ProductSummary> {
    const url = `${this.config.apiUrl}product/get/${uuid}/summary`;
    return this.http.get<ProductSummary>(url);
  }
}
