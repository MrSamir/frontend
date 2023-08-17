import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EndowmentRegistrationNewComponent } from '../components/endowment-registration-new/endowment-registration-new.component';
import { EndowmentRegistrationStartServiceComponent } from '../components/endowment-registration-start-service/endowment-registration-start-service.component';
import { EndowmentDirectRegisterationComponent } from '../components/endowment-direct-registeration/endowment-direct-registeration.component';
 


const routes: Routes = [
  {
    path: '',
    component: EndowmentRegistrationStartServiceComponent,
    data: { title: 'خدمة تسجيل وقف', breadcrumb: 'خدمة تسجيل وقف' },
  },

  // {path: 'wizard', component: EndowmentRegistrationNewComponent, canActivate:[PublicActiveProfileGuard]},
  {
    path: 'registrationform/:requestId/:pahseId',
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
    path: 'directregistrationform',
    component: EndowmentDirectRegisterationComponent,
    data: { title: 'خدمة تسجيل فوري لوقف', breadcrumb: 'خدمة تسجيل فوري لوقف' },
    title: 'خدمة تسجيل فوري لوقف',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EndowmentRegistrationRoutingModule { }
