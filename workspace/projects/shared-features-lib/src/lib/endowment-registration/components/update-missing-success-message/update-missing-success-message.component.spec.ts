import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMissingSuccessMessageComponent } from './update-missing-success-message.component';

describe('UpdateMissingSuccessMessageComponent', () => {
  let component: UpdateMissingSuccessMessageComponent;
  let fixture: ComponentFixture<UpdateMissingSuccessMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateMissingSuccessMessageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateMissingSuccessMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
