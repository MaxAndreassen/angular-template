import { Component, OnInit, Input } from '@angular/core';
import { ValidationError } from '../../models/validation,models';

@Component({
  selector: 'app-validation-summary',
  templateUrl: './validation-summary.component.html',
  styleUrls: ['./validation-summary.component.scss']
})
export class ValidationSummaryComponent implements OnInit {
  @Input() errors: ValidationError[] = [];

  constructor() { }

  ngOnInit(): any {
  }

}
