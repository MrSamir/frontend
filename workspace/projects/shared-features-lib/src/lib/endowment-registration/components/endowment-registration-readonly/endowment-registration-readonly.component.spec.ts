import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EndowmentRegistrationReadonlyComponent } from 'projects/public-portal/src/app/modules/endowment-registration/components/endowment-registration-readonly/endowment-registration-readonly.component';


describe('EndowmentRegistrationReadonlyComponent', () => {
  let component: EndowmentRegistrationReadonlyComponent;
  let fixture: ComponentFixture<EndowmentRegistrationReadonlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EndowmentRegistrationReadonlyComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(EndowmentRegistrationReadonlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
