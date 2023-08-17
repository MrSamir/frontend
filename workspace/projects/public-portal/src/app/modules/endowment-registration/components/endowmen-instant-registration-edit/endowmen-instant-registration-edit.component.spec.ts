import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndowmenInstantRegistrationEditComponent } from './endowmen-instant-registration-edit.component';

describe('EndowmenInstantRegistrationEditComponent', () => {
  let component: EndowmenInstantRegistrationEditComponent;
  let fixture: ComponentFixture<EndowmenInstantRegistrationEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EndowmenInstantRegistrationEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EndowmenInstantRegistrationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
