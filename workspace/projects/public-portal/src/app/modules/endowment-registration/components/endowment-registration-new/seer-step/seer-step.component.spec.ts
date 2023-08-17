import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeerStepComponent } from './seer-step.component';

describe('SeerStepComponent', () => {
  let component: SeerStepComponent;
  let fixture: ComponentFixture<SeerStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeerStepComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeerStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
