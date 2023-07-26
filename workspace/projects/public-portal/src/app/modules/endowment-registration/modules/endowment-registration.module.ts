import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

 
 import { RouterModule } from '@angular/router';
import { EndowmentRegistrationRoutingModule } from './endowment-registration-routing.module';
import { EndowmentRegistrationStartServiceComponent } from '../components/endowment-registration-start-service/endowment-registration-start-service.component';
import { EndowmentRegistrationNewComponent } from '../components/endowment-registration-new/endowment-registration-new.component';
import { EndowmentRegistrationSharedModule } from 'projects/shared-features-lib/src/public-api';
import { ArchwizardModule } from 'angular-archwizard';
import { AutoCompleteModule } from 'primeng/autocomplete';
 

 
 

 

@NgModule({
  declarations: [
    EndowmentRegistrationStartServiceComponent,
    EndowmentRegistrationNewComponent,
  ],
  imports: [
    ArchwizardModule,
    EndowmentRegistrationRoutingModule,
    EndowmentRegistrationSharedModule, AutoCompleteModule

 
     


  ],
  exports: [
     
    RouterModule]
})
export class EndowmentRegistrationModule { }
