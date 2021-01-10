import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit {

  @Input() searchTerm: string;

  @Input() route: string;

  @Input() placeholder: string;

  constructor(private router: Router) { }

  ngOnInit(): any {
    if (!this.placeholder) {
      this.placeholder = 'search for assets...';
    }
  }

  search(): any {
    this.router.navigateByUrl(`${this.route}term=${this.searchTerm}`);
  }
}
