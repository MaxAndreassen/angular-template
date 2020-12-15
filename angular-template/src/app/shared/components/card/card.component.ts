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
  @Input() buttonText: string;

  constructor() { }

  ngOnInit(): any {
  }

}
