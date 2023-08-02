/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PagetwoComponent } from './pagetwo.component';

describe('PagetwoComponent', () => {
  let component: PagetwoComponent;
  let fixture: ComponentFixture<PagetwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagetwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagetwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
