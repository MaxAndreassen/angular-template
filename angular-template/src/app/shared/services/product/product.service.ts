import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent } from '@angular/common/http';
import { IAppConfig, APP_CONFIG } from '../../models/configuration.models';
import {
  ProductVersionEditor,
  ProductQueryRequest,
  ProductFileQueryRequest,
  ProductFileSummary,
  ProductOwnership,
  ProductSummary,
  ProductVersionSummary,
  AssetContent
} from '../../models/product.models.ts';
import { Observable } from 'rxjs';
import { PaginatedList } from '../../models/base.models';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    @Inject(APP_CONFIG) public config: IAppConfig,
    private http: HttpClient
  ) { }

  createProduct(editor: ProductVersionEditor): Observable<HttpEvent<ProductVersionEditor>> {
    const url = `${this.config.apiUrl}product/update`;

    const formData: FormData = new FormData();
    if (!!editor.name) {
      formData.append('name', editor.name);
    }

    if (!!editor.description) {
      formData.append('description', editor.description);
    }

    if (!!editor.priceInPounds) {
      formData.append('priceInPounds', editor.priceInPounds.toString());
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

    if (!!editor.genreUuid) {
      formData.append('genreUuid', editor.genreUuid);
    }

    if (!!editor.categoryUuid) {
      formData.append('categoryUuid', editor.categoryUuid);
    }

    if (!!editor.keyWords) {
      formData.append('keyWords', editor.keyWords);
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

    return this.http.post<ProductVersionEditor>(url, formData, {
      headers: new HttpHeaders().set('enctype', 'multipart/form-data'),
      reportProgress: true,
      observe: 'events'
    });
  }

  listProducts(queryParams: ProductQueryRequest): Observable<PaginatedList<ProductSummary>> {
    const url = `${this.config.apiUrl}product/list`;
    return this.http.post<PaginatedList<ProductSummary>>(url, queryParams);
  }

  listApprovedProducts(queryParams: ProductQueryRequest): Observable<PaginatedList<ProductSummary>> {
    const url = `${this.config.apiUrl}product/list/approved`;
    return this.http.post<PaginatedList<ProductSummary>>(url, queryParams);
  }

  listFilesForProduct(productVersionUuid: string, includeAsset?: boolean): Observable<ProductFileSummary[]> {
    let url = `${this.config.apiUrl}product/${productVersionUuid}/files`;

    if (includeAsset) {
      url = url + `?includeAsset=${includeAsset}`;
    }

    return this.http.get<ProductFileSummary[]>(url);
  }

  getAssetContentsForProductVersion(productVersionUuid: string): Observable<AssetContent> {
    const url = `${this.config.apiUrl}product/${productVersionUuid}/asset/contents`;

    return this.http.get<AssetContent>(url);
  }

  getProduct(uuid: string): Observable<ProductVersionEditor> {
    const url = `${this.config.apiUrl}product/get/${uuid}`;
    return this.http.get<ProductVersionEditor>(url);
  }

  getIsProductOwnedByMe(uuid: string): Observable<ProductOwnership> {
    const url = `${this.config.apiUrl}product/${uuid}/owned-by-me`;
    return this.http.get<ProductOwnership>(url);
  }

  getProductSummary(uuid: string): Observable<ProductVersionSummary> {
    const url = `${this.config.apiUrl}product/get/${uuid}/summary`;
    return this.http.get<ProductVersionSummary>(url);
  }

  downloadProductVersionAsset(productVersionUuid: string, temporaryLinkUuid?: string): Observable<any> {
    let url = `${this.config.apiUrl}product/${productVersionUuid}/asset/download`;

    if (temporaryLinkUuid) {
      url += `?assetDownloadLink=${temporaryLinkUuid}`;
    }

    return this.http.get<any>(url, {
      headers: new HttpHeaders(),
      responseType: 'blob' as 'json',
      reportProgress: true,
      observe: 'events'
    });
  }

  downloadProductVersionAssetByLink(downloadUuid: string): Observable<any> {
    const url = `${this.config.apiUrl}product/${downloadUuid}/asset/download-by-link`;

    return this.http.get<any>(url, {
      headers: new HttpHeaders(),
      responseType: 'blob' as 'json',
      reportProgress: true,
      observe: 'events'
    });
  }
}
