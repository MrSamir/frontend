/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EndowmentRegistrationReadonlyComponent } from './endowment-registration-readonly.component';

describe('EndowmentRegistrationReadonlyComponent', () => {
  let component: EndowmentRegistrationReadonlyComponent;
  let fixture: ComponentFixture<EndowmentRegistrationReadonlyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EndowmentRegistrationReadonlyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EndowmentRegistrationReadonlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
