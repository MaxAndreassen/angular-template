import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-owned-products-by-link',
  templateUrl: './owned-products-by-link.component.html',
  styleUrls: ['./owned-products-by-link.component.scss']
})
export class OwnedProductsByLinkComponent implements OnInit {

  temporaryLinkUuid: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): any {
    this.route.paramMap.subscribe(params => {
      this.temporaryLinkUuid = params.get('uuid');
    });
  }
}
