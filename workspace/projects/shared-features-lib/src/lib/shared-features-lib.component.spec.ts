import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedFeaturesLibComponent } from './shared-features-lib.component';

describe('SharedFeaturesLibComponent', () => {
  let component: SharedFeaturesLibComponent;
  let fixture: ComponentFixture<SharedFeaturesLibComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SharedFeaturesLibComponent]
    });
    fixture = TestBed.createComponent(SharedFeaturesLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
