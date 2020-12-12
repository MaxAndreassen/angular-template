import { Component, OnInit } from '@angular/core';
import { ProductEditor } from '../../../shared/models/product.models.ts';

@Component({
  selector: 'app-product-editor',
  templateUrl: './product-editor.component.html',
  styleUrls: ['./product-editor.component.scss']
})
export class ProductEditorComponent implements OnInit {

  editor: ProductEditor = new ProductEditor();
  creating = true;

  constructor() { }

  ngOnInit() {
  }

}
