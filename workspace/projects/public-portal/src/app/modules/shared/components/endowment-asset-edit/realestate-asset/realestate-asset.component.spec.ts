import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealestateAssetComponent } from './realestate-asset.component';

describe('RealestateAssetComponent', () => {
  let component: RealestateAssetComponent;
  let fixture: ComponentFixture<RealestateAssetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RealestateAssetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RealestateAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
