import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalOrAgriculturalAssetComponent } from './animal-or-agricultural-asset.component';

describe('AnimalOrAgriculturalAssetComponent', () => {
  let component: AnimalOrAgriculturalAssetComponent;
  let fixture: ComponentFixture<AnimalOrAgriculturalAssetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnimalOrAgriculturalAssetComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AnimalOrAgriculturalAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
