import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EndowmentRegistrationNewComponent } from '../components/endowment-registration-new/endowment-registration-new.component';
import { EndowmentRegistrationStartServiceComponent } from '../components/endowment-registration-new/endowment-registration-start-service/endowment-registration-start-service.component';
 


const routes: Routes = [ 
  { path: '', component: EndowmentRegistrationStartServiceComponent,data: { title: 'خدمة تسجيل وقف' ,breadcrumb:'خدمة تسجيل وقف' } },


  // {path: 'wizard', component: EndowmentRegistrationNewComponent, canActivate:[PublicActiveProfileGuard]},
  {path: 'endowmentregistration/new', component: EndowmentRegistrationNewComponent,data: { title: 'خدمة تسجيل وقف' ,breadcrumb:'خدمة تسجيل وقف' },title:'خدمة تسجيل وقف'},

  
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EndowmentRegistrationRoutingModule { }
