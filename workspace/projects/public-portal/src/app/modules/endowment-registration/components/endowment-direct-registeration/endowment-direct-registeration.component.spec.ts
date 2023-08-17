import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndowmentDirectRegisterationComponent } from './endowment-direct-registeration.component';

describe('EndowmentDirectRegisterationComponent', () => {
  let component: EndowmentDirectRegisterationComponent;
  let fixture: ComponentFixture<EndowmentDirectRegisterationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EndowmentDirectRegisterationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EndowmentDirectRegisterationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
