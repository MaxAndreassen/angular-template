import { Injectable, Inject } from '@angular/core';
import { APP_CONFIG, IAppConfig } from '../../models/configuration.models';
import { HttpClient } from '@angular/common/http';
import { ProductVersionSubmissionQueryParams, ProductVersionSubmissionSummary, ProductVersionSubmissionEditor } from '../../models/product.models.ts';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductVersionSubmissionService {

  constructor(
    @Inject(APP_CONFIG) public config: IAppConfig,
    private http: HttpClient
  ) { }

  listProductSubmissions(queryParams: ProductVersionSubmissionQueryParams): Observable<ProductVersionSubmissionSummary[]> {
    const url = `${this.config.apiUrl}product-submission/list`;
    return this.http.post<ProductVersionSubmissionSummary[]>(url, queryParams);
  }

  getProductSubmissions(uuid: string): Observable<ProductVersionSubmissionSummary> {
    const url = `${this.config.apiUrl}product-submission/${uuid}`;
    return this.http.get<ProductVersionSubmissionSummary>(url);
  }

  updateSubmission(editor: ProductVersionSubmissionEditor): Observable<ProductVersionSubmissionEditor> {
    const url = `${this.config.apiUrl}product-submission/update`;
    return this.http.post<ProductVersionSubmissionEditor>(url, editor);
  }

}
