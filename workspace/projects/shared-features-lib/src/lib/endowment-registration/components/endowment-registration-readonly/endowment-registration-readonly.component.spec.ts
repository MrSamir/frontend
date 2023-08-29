import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndowmentRegistrationReadonlyComponent } from './endowment-registration-readonly.component';

describe('EndowmentRegistrationReadonlyComponent', () => {
  let component: EndowmentRegistrationReadonlyComponent;
  let fixture: ComponentFixture<EndowmentRegistrationReadonlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EndowmentRegistrationReadonlyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EndowmentRegistrationReadonlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
