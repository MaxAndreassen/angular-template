import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { ProductQueryRequest, ProductVersionSummary, ProductSummary } from '../../../shared/models/product.models.ts';
import { ProductService } from '../../../shared/services/product/product.service';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { isPlatformServer } from '@angular/common';
import { SecurityContext } from '../../../shared/models/auth.models';
import { finalize } from 'rxjs/operators';
import { ProductGenre } from '../../../shared/models/product-genre.models';
import { ProductCategory } from '../../../shared/models/product-category.models';
import { ProductGenreService } from '../../../shared/services/product-genres/product-genre.service';
import { ProductCategoryService } from '../../../shared/services/product-categories/product-category.service';
import { faArrowUp, faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss']
})
export class ProductSearchComponent implements OnInit {

  maxAllowedPrice = 9999;

  queryParams: ProductQueryRequest = new ProductQueryRequest();

  products: ProductSummary[] = [];

  openIcon = faChevronUp;
  closeIcon = faChevronDown;

  currentPage = 0;

  loading = false;

  genres: ProductGenre[] = [];
  genresLoading = false;

  categories: ProductCategory[] = [];
  categoriesLoading = false;

  filtersOpen = false;

  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private productCategoryService: ProductCategoryService,
    private productGenreService: ProductGenreService,
    @Inject(PLATFORM_ID) private platformId: any,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): any {
    if (isPlatformServer(this.platformId)) {
      return;
    }

    this.categoriesLoading = true;

    this.productCategoryService
      .listProductCategories()
      .pipe(finalize(() => this.categoriesLoading = false))
      .subscribe(res => {
        this.categories = res;
      });

    this.genresLoading = true;

    this.productGenreService
      .listProductGenres()
      .pipe(finalize(() => this.genresLoading = false))
      .subscribe(res => {
        this.genres = res;
      });

    this.route.queryParamMap.subscribe(params => {
      this.loading = true;

      this.queryParams.searchTerm = params.get('term');
      this.queryParams.category = !params.get('category') ? null : params.get('category');
      this.queryParams.genre = !params.get('genre') ? null : params.get('genre');
      this.currentPage = +params.get('page');

      const maximum = params.get('maximumPrice');
      if (!maximum && maximum !== '0') {
        this.queryParams.maximumPrice = this.maxAllowedPrice;
      } else {
        this.queryParams.maximumPrice = +maximum;
      }

      this.queryParams.minimumPrice = +params.get('minimumPrice');

      this.queryParams.page = this.currentPage;

      this.productService
        .listApprovedProducts(this.queryParams)
        .pipe(finalize(() => this.loading = false))
        .subscribe(res => {
          this.products = res.items;
        });
    });
  }

  toggleFilters(): any {
    this.filtersOpen = !this.filtersOpen;
  }

  prev(): any {
    this.cleanseQueryParams();

    this.router.navigateByUrl(`product/search?term=${this.queryParams.searchTerm}&minimumPrice=${this.queryParams.minimumPrice}&maximumPrice=${this.queryParams.maximumPrice}&genre=${this.queryParams.genre}&category=${this.queryParams.category}&page=${this.currentPage - 1}`);
  }

  next(): any {
    this.cleanseQueryParams();

    this.router.navigateByUrl(`product/search?term=${this.queryParams.searchTerm}&minimumPrice=${this.queryParams.minimumPrice}&maximumPrice=${this.queryParams.maximumPrice}&genre=${this.queryParams.genre}&category=${this.queryParams.category}&page=${this.currentPage + 1}`);
  }

  refresh(): any {
    this.cleanseQueryParams();

    this.router.navigateByUrl(`product/search?term=${this.queryParams.searchTerm}&minimumPrice=${this.queryParams.minimumPrice}&maximumPrice=${this.queryParams.maximumPrice}&genre=${this.queryParams.genre}&category=${this.queryParams.category}`);
  }

  cleanseQueryParams(): any {
    if (!this.queryParams.searchTerm) {
      this.queryParams.searchTerm = '';
    }

    if (!this.queryParams.category) {
      this.queryParams.category = '';
    }

    if (!this.queryParams.genre) {
      this.queryParams.genre = '';
    }

    if (!this.queryParams.maximumPrice && this.queryParams.maximumPrice !== 0) {
      this.queryParams.maximumPrice = this.maxAllowedPrice;
    }

    if (!this.queryParams.minimumPrice) {
      this.queryParams.minimumPrice = 0;
    }
  }

}
