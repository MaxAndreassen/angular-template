import { Component, OnInit, Input } from '@angular/core';
import { UserEditor } from '../../../profile/models/profile.models';

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
  @Input() user: UserEditor;
  @Input() subText: string;
  @Input() userUuid: string;
  @Input() username: string;
  @Input() profileUrl: string;
  @Input() showBottom: boolean;

  constructor() { }

  ngOnInit(): any {
  }

}
