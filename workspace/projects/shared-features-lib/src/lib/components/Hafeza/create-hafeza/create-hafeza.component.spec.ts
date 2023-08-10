import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHafezaComponent } from './create-hafeza.component';

describe('CreateHafezaComponent', () => {
  let component: CreateHafezaComponent;
  let fixture: ComponentFixture<CreateHafezaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateHafezaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateHafezaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
