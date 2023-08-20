/* eslint-disable @typescript-eslint/no-unused-vars */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EndowmentAssetsEditComponent } from './endowment-assets-edit.component';

describe('EndowmentAssetsEditComponent', () => {
  let component: EndowmentAssetsEditComponent;
  let fixture: ComponentFixture<EndowmentAssetsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EndowmentAssetsEditComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EndowmentAssetsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
