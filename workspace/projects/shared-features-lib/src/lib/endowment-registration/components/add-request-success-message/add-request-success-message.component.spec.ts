import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRequestSuccessMessageComponent } from './add-request-success-message.component';

describe('AddRequestSuccessMessageComponent', () => {
  let component: AddRequestSuccessMessageComponent;
  let fixture: ComponentFixture<AddRequestSuccessMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRequestSuccessMessageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRequestSuccessMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
