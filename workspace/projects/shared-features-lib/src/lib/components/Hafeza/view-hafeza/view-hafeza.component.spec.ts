import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewHafezaComponent } from './view-hafeza.component';

describe('ViewHafezaComponent', () => {
  let component: ViewHafezaComponent;
  let fixture: ComponentFixture<ViewHafezaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewHafezaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewHafezaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
