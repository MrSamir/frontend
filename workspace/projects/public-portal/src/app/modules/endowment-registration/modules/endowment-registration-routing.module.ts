import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EndowmentRegistrationNewComponent } from '../components/endowment-registration-new/endowment-registration-new.component';
import { EndowmentRegistrationStartServiceComponent } from '../components/endowment-registration-start-service/endowment-registration-start-service.component';
import { BeneficiaryStepComponent } from '../components/endowment-registration-new/beneficiary-step/beneficiary-step.component';
import { PublicActiveProfileGuardService } from 'projects/core-lib/src/lib/services/public-active-profile-guard.service';
import { AddRequestSuccessMessageComponent } from 'projects/shared-features-lib/src/lib/endowment-registration/components/add-request-success-message/add-request-success-message.component';
import { UpdateMissingSuccessMessageComponent } from 'projects/shared-features-lib/src/lib/endowment-registration/components/update-missing-success-message/update-missing-success-message.component';
import { EndowmentRegistrationReadonlyComponent } from '../components/endowment-registration-readonly/endowment-registration-readonly.component';

const routes: Routes = [
  {
    path: '',
    component: EndowmentRegistrationStartServiceComponent,
    data: { title: 'خدمة تسجيل وقف', breadcrumb: 'خدمة تسجيل وقف' },
  },

  // {path: 'wizard', component: EndowmentRegistrationNewComponent, canActivate:[PublicActiveProfileGuard]},
  {
    path: 'registrationform/:requestId/:step',
    component: EndowmentRegistrationNewComponent,
    data: { title: 'خدمة تسجيل وقف', breadcrumb: 'خدمة تسجيل وقف' },
    title: 'خدمة تسجيل وقف',
  },
  {
    path: 'registrationform/:requestId/:step/:serialnumber',
    component: EndowmentRegistrationNewComponent,
    data: { title: 'خدمة تسجيل وقف', breadcrumb: 'خدمة تسجيل وقف' },
    title: 'خدمة تسجيل وقف',
  },
  {
    path: 'registrationform',
    component: EndowmentRegistrationNewComponent,
    data: { title: 'خدمة تسجيل وقف', breadcrumb: 'خدمة تسجيل وقف' },
    title: 'خدمة تسجيل وقف',
  },
  {
    path: 'details/:requestId',
    component: EndowmentRegistrationReadonlyComponent,
    data: { title: 'تفاصيل الطلب', breadcrumb: 'تفاصيل الطلب' },
    title: 'تفاصيل الطلب',
  },
  /* {
    path: 'directregistrationform',
    component: EndowmentDirectRegisterationComponent,
    data: { title: 'خدمة تسجيل فوري لوقف', breadcrumb: 'خدمة تسجيل فوري لوقف' },
    title: 'خدمة تسجيل فوري لوقف',
  }, */
  {
    path: 'beneficiary',
    component: BeneficiaryStepComponent,
    title: 'المستفيدين',
  },
  //{ path: 'success/:reqnumber', component: AddRequestSuccessMessageComponent, canActivate: [PublicActiveProfileGuardService] },
  { path: 'success-message-return/:reqnumber', component: UpdateMissingSuccessMessageComponent },

  { path: 'success-message/:reqnumber', component: AddRequestSuccessMessageComponent },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EndowmentRegistrationRoutingModule { }
