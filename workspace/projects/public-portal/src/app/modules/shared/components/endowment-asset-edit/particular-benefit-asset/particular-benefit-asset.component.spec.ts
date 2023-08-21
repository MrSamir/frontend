import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticularBenefitAssetComponent } from './particular-benefit-asset.component';

describe('ParticularBenefitAssetComponent', () => {
  let component: ParticularBenefitAssetComponent;
  let fixture: ComponentFixture<ParticularBenefitAssetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParticularBenefitAssetComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ParticularBenefitAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
