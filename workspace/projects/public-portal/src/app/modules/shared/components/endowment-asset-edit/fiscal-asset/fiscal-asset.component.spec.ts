import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiscalAssetComponent } from './fiscal-asset.component';

describe('FiscalAssetComponent', () => {
  let component: FiscalAssetComponent;
  let fixture: ComponentFixture<FiscalAssetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FiscalAssetComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FiscalAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
