import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetsDemoComponent } from './assets-demo.component';

describe('AssetsDemoComponent', () => {
  let component: AssetsDemoComponent;
  let fixture: ComponentFixture<AssetsDemoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssetsDemoComponent]
    });
    fixture = TestBed.createComponent(AssetsDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
