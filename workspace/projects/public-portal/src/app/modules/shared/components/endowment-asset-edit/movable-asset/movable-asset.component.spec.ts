import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovableAssetComponent } from './movable-asset.component';

describe('MovableAssetComponent', () => {
  let component: MovableAssetComponent;
  let fixture: ComponentFixture<MovableAssetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovableAssetComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MovableAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
