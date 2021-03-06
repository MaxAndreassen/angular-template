/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ValidationSummaryComponent } from './validation-summary.component';

describe('ValidationSummaryComponent', () => {
  let component: ValidationSummaryComponent;
  let fixture: ComponentFixture<ValidationSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidationSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
