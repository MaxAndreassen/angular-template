/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RequestProductEmailComponent } from './request-product-email.component';

describe('RequestProductEmailComponent', () => {
  let component: RequestProductEmailComponent;
  let fixture: ComponentFixture<RequestProductEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestProductEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestProductEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
