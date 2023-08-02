/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EndowmentBeneficiariesListComponent } from './endowment-beneficiaries-list.component';

describe('EndowmentBeneficiariesListComponent', () => {
  let component: EndowmentBeneficiariesListComponent;
  let fixture: ComponentFixture<EndowmentBeneficiariesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EndowmentBeneficiariesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EndowmentBeneficiariesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
