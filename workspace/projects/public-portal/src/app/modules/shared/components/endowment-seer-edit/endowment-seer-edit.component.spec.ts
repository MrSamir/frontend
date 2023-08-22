import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndowmentSeerEditComponent } from './endowment-seer-edit.component';

describe('EndowmentSeerEditComponent', () => {
  let component: EndowmentSeerEditComponent;
  let fixture: ComponentFixture<EndowmentSeerEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EndowmentSeerEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EndowmentSeerEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
