import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAwqafsComponent } from './my-awqafs.component';

describe('MyAwqafsComponent', () => {
  let component: MyAwqafsComponent;
  let fixture: ComponentFixture<MyAwqafsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyAwqafsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyAwqafsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
