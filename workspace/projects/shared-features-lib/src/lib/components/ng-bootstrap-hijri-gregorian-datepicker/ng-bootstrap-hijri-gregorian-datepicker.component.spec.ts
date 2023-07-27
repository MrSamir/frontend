/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NgBootstrapHijriGregorianDatepickerComponent } from './ng-bootstrap-hijri-gregorian-datepicker.component';

describe('NgBootstrapHijriGregorianDatepickerComponent', () => {
  let component: NgBootstrapHijriGregorianDatepickerComponent;
  let fixture: ComponentFixture<NgBootstrapHijriGregorianDatepickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgBootstrapHijriGregorianDatepickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgBootstrapHijriGregorianDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
