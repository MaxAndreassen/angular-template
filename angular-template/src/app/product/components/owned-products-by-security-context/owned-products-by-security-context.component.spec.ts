/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OwnedProductsBySecurityContextComponent } from './owned-products-by-security-context.component';

describe('OwnedProductsBySecurityContextComponent', () => {
  let component: OwnedProductsBySecurityContextComponent;
  let fixture: ComponentFixture<OwnedProductsBySecurityContextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnedProductsBySecurityContextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnedProductsBySecurityContextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
