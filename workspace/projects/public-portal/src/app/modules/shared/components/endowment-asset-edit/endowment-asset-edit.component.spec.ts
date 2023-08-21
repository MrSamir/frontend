import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndowmentSharedAssetEditComponent } from './endowment-asset-edit.component';

describe('EndowmentSharedAssetEditComponent', () => {
  let component: EndowmentSharedAssetEditComponent;
  let fixture: ComponentFixture<EndowmentSharedAssetEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EndowmentSharedAssetEditComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EndowmentSharedAssetEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
