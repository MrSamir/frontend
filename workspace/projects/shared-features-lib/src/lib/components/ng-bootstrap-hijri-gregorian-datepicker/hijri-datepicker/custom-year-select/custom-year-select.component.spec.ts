import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomYearSelectComponent } from './custom-year-select.component';

describe('CustomYearSelectComponent', () => {
  let component: CustomYearSelectComponent;
  let fixture: ComponentFixture<CustomYearSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomYearSelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomYearSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
