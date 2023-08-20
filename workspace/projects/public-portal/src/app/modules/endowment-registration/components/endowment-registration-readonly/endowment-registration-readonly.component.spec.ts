/* eslint-disable @typescript-eslint/no-unused-vars */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EndowmentRegistrationReadonlyComponent } from './endowment-registration-readonly.component';

describe('EndowmentRegistrationReadonlyComponent', () => {
  let component: EndowmentRegistrationReadonlyComponent;
  let fixture: ComponentFixture<EndowmentRegistrationReadonlyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EndowmentRegistrationReadonlyComponent],
    }).compileComponents();
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
