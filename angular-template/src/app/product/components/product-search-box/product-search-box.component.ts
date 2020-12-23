import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-search-box',
  templateUrl: './product-search-box.component.html',
  styleUrls: ['./product-search-box.component.scss']
})
export class ProductSearchBoxComponent implements OnInit {

  @Input()
  searchTerm: string;

  constructor(private router: Router) { }

  ngOnInit(): any {
  }

  search(): any {
    this.router.navigateByUrl(`product/search?term=${this.searchTerm}`);
  }
}
