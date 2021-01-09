import { Injectable, Inject } from '@angular/core';
import { APP_CONFIG, IAppConfig } from '../../models/configuration.models';
import { HttpClient } from '@angular/common/http';
import { ProductGenre } from '../../models/product-genre.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductGenreService {

  constructor(
    @Inject(APP_CONFIG) public config: IAppConfig,
    private http: HttpClient
  ) { }

  listProductGenres(): Observable<ProductGenre[]> {
    const url = `${this.config.apiUrl}product-genres/list`;
    return this.http.get<ProductGenre[]>(url);
  }
}
