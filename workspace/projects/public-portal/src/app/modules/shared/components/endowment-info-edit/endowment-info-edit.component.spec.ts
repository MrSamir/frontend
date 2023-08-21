/* eslint-disable @typescript-eslint/no-unused-vars */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EndowmentInfoEditComponent } from './endowment-info-edit.component';

describe('EndowmentInfoEditComponent', () => {
  let component: EndowmentInfoEditComponent;
  let fixture: ComponentFixture<EndowmentInfoEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EndowmentInfoEditComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EndowmentInfoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
