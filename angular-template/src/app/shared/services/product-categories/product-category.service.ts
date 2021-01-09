import { Injectable, Inject } from '@angular/core';
import { APP_CONFIG, IAppConfig } from '../../models/configuration.models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductCategory } from '../../models/product-category.models';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {

  constructor(
    @Inject(APP_CONFIG) public config: IAppConfig,
    private http: HttpClient
  ) { }

  listProductCategories(): Observable<ProductCategory[]> {
    const url = `${this.config.apiUrl}product-categories/list`;
    return this.http.get<ProductCategory[]>(url);
  }
}
