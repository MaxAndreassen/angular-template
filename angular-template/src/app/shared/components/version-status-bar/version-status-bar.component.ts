import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-version-status-bar',
  templateUrl: './version-status-bar.component.html',
  styleUrls: ['./version-status-bar.component.scss']
})
export class VersionStatusBarComponent{
  @Input() status: number;

  constructor() { }
}
