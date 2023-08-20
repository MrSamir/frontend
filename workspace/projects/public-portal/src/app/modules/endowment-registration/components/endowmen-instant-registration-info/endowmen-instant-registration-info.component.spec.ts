import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndowmenInstantRegistrationInfoComponent } from './endowmen-instant-registration-info.component';

describe('EndowmenInstantRegistrationInfoComponent', () => {
  let component: EndowmenInstantRegistrationInfoComponent;
  let fixture: ComponentFixture<EndowmenInstantRegistrationInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EndowmenInstantRegistrationInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EndowmenInstantRegistrationInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
