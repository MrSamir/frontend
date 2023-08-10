import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHafezaComponent } from './edit-hafeza.component';

describe('EditHafezaComponent', () => {
  let component: EditHafezaComponent;
  let fixture: ComponentFixture<EditHafezaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditHafezaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditHafezaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
