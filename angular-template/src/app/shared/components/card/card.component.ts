import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() title: string;
  @Input() description: string;
  @Input() linkUrl: string;
  @Input() pictureUrl: string;
  @Input() buttonText: string;
  @Input() height = 200;
  @Input() status: number;

  constructor() { }

  ngOnInit(): any {
  }

}
