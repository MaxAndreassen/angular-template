import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent } from '@angular/common/http';
import { IAppConfig, APP_CONFIG } from '../../models/configuration.models';
import { ProductSummary, ProductEditor, ProductQueryRequest, ProductFileQueryRequest, ProductFileSummary, ProductOwnership } from '../../models/product.models.ts';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    @Inject(APP_CONFIG) public config: IAppConfig,
    private http: HttpClient
  ) { }

  createProduct(editor: ProductEditor): Observable<HttpEvent<ProductEditor>> {
    const url = `${this.config.apiUrl}product/update`;

    const formData: FormData = new FormData();
    if (!!editor.name) {
      formData.append('name', editor.name);
    }

    if (!!editor.description) {
      formData.append('description', editor.description);
    }

    if (!!editor.priceInPounds) {
      formData.append('priceInPounds', editor.priceInPounds);
    }

    if (!!editor.uuid) {
      formData.append('uuid', editor.uuid);
    }

    if (!!editor.coverImage) {
      formData.append('coverImage', editor.coverImage, editor.coverImage.name);
    }

    if (!!editor.existingCoverImageUuid) {
      formData.append('existingCoverImageUuid', editor.existingCoverImageUuid);
    }

    if (!!editor.assetZip) {
      formData.append('assetZip', editor.assetZip, editor.assetZip.name);
    }

    if (!!editor.existingAssetZipUuid) {
      formData.append('existingAssetZipUuid', editor.existingAssetZipUuid);
    }

    if (!!editor.marketingMedia) {
      editor.marketingMedia.forEach(file => {
        if (!!file) {
          formData.append('marketingMedia', file, file.name);
        }
      });
    }

    if (!!editor.existingMarketingMediaUuids) {
      editor.existingMarketingMediaUuids.forEach(uuid => {
        if (!!uuid) {
          formData.append('existingMarketingMediaUuids', uuid);
        }
      });
    }

    return this.http.post<ProductEditor>(url, formData, {
      headers: new HttpHeaders().set('enctype', 'multipart/form-data'),
      reportProgress: true,
      observe: 'events'
    });
  }

  listProducts(queryParams: ProductQueryRequest): Observable<ProductSummary[]> {
    const url = `${this.config.apiUrl}product/list`;
    return this.http.post<ProductSummary[]>(url, queryParams);
  }

  listFilesForProduct(productUuid: string, includeAsset?: boolean): Observable<ProductFileSummary[]> {
    let url = `${this.config.apiUrl}product/${productUuid}/files`;

    if (includeAsset) {
      url = url + `?includeAsset=${includeAsset}`;
    }

    return this.http.get<ProductFileSummary[]>(url);
  }

  getProduct(uuid: string): Observable<ProductEditor> {
    const url = `${this.config.apiUrl}product/get/${uuid}`;
    return this.http.get<ProductEditor>(url);
  }

  getIsProductOwnedByMe(uuid: string): Observable<ProductOwnership> {
    const url = `${this.config.apiUrl}product/${uuid}/owned-by-me`;
    return this.http.get<ProductOwnership>(url);
  }

  getProductSummary(uuid: string): Observable<ProductSummary> {
    const url = `${this.config.apiUrl}product/get/${uuid}/summary`;
    return this.http.get<ProductSummary>(url);
  }
}
