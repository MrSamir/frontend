import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficiaryStepComponent } from './beneficiary-step.component';

describe('BeneficiaryStepComponent', () => {
  let component: BeneficiaryStepComponent;
  let fixture: ComponentFixture<BeneficiaryStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeneficiaryStepComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeneficiaryStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
