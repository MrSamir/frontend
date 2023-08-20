import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonetaryAssetComponent } from './monetary-asset.component';

describe('MonetaryAssetComponent', () => {
  let component: MonetaryAssetComponent;
  let fixture: ComponentFixture<MonetaryAssetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MonetaryAssetComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MonetaryAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
