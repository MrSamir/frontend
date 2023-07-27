import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessEntityAssetComponent } from './business-entity-asset.component';

describe('BusinessEntityAssetComponent', () => {
  let component: BusinessEntityAssetComponent;
  let fixture: ComponentFixture<BusinessEntityAssetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessEntityAssetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessEntityAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
