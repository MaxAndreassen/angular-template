import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.scss']
})
export class ProductListingComponent implements OnInit {

  productVersionUuid: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): any {
    this.route.paramMap.subscribe(params => {
      this.productVersionUuid = params.get('uuid');
    });
  }

}
