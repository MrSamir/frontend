import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndowmentBeneficiaryEditComponent } from './endowment-beneficiary-edit.component';

describe('EndowmentBeneficiaryEditComponent', () => {
  let component: EndowmentBeneficiaryEditComponent;
  let fixture: ComponentFixture<EndowmentBeneficiaryEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EndowmentBeneficiaryEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EndowmentBeneficiaryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
