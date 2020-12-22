import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../shared/services/product/product.service';
import { finalize } from 'rxjs/operators';
import { ProductSummary } from '../../../shared/models/product.models.ts';
import { FileSummary } from '../../../shared/models/file.models';

@Component({
  selector: 'app-product-viewer',
  templateUrl: './product-viewer.component.html',
  styleUrls: ['./product-viewer.component.scss']
})
export class ProductViewerComponent implements OnInit {

  product: ProductSummary = new ProductSummary();
  loading = false;
  filesLoading = false;

  files: FileSummary[] = [];

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): any {
    this.route.paramMap.subscribe(params => {
        this.loading = true;
        this.filesLoading = true;

        this.productService
          .getProductSummary(params.get('uuid'))
          .pipe(finalize(() => this.loading = false))
          .subscribe(result => {
            this.product = result;

            this.productService
            .listFilesForProduct(params.get('uuid'))
            .pipe(finalize(() => this.filesLoading = false))
            .subscribe(fileResult => {
              this.files = fileResult;
            });
          });
    });
  }

  purchase(): any {
    this.router.navigateByUrl(`purchase/${this.product.uuid}`);
  }

}
