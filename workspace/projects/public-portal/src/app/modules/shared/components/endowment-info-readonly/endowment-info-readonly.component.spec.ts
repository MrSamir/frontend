/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EndowmentInfoReadonlyComponent } from './endowment-info-readonly.component';

describe('EndowmentInfoReadonlyComponent', () => {
  let component: EndowmentInfoReadonlyComponent;
  let fixture: ComponentFixture<EndowmentInfoReadonlyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EndowmentInfoReadonlyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EndowmentInfoReadonlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
