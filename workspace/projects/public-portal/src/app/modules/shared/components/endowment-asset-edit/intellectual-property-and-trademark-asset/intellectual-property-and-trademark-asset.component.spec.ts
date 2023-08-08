import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntellectualPropertyAndTrademarkAssetComponent } from './intellectual-property-and-trademark-asset.component';

describe('IntellectualPropertyAndTrademarkAssetComponent', () => {
  let component: IntellectualPropertyAndTrademarkAssetComponent;
  let fixture: ComponentFixture<IntellectualPropertyAndTrademarkAssetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntellectualPropertyAndTrademarkAssetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntellectualPropertyAndTrademarkAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
