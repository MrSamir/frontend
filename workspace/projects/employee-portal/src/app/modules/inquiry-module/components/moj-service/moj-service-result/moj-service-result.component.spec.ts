/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MojServiceResultComponent } from './moj-service-result.component';

describe('MojServiceResultComponent', () => {
  let component: MojServiceResultComponent;
  let fixture: ComponentFixture<MojServiceResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MojServiceResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MojServiceResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
