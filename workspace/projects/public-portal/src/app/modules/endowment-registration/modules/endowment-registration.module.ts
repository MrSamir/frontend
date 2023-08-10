import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

 
import { RouterModule } from '@angular/router';
import { EndowmentRegistrationRoutingModule } from './endowment-registration-routing.module';
import { EndowmentRegistrationStartServiceComponent } from '../components/endowment-registration-start-service/endowment-registration-start-service.component';
import { EndowmentRegistrationNewComponent } from '../components/endowment-registration-new/endowment-registration-new.component';
import { ArchwizardModule } from 'angular-archwizard';
import { PublicPortalSharedModule } from '../../shared/modules/public-portal-shared.module';
import { EndowmentRegistrationSharedModule } from 'projects/shared-features-lib/src/lib/endowment-registration/modules/endowment-registration-shared.module';
 
 

@NgModule({
  declarations: [
    EndowmentRegistrationStartServiceComponent,
    EndowmentRegistrationNewComponent,

   
  ],
  imports: [
    ArchwizardModule,
    EndowmentRegistrationRoutingModule,
    EndowmentRegistrationSharedModule,
    PublicPortalSharedModule 


  ],
  exports: [
     
    RouterModule]
})
export class EndowmentRegistrationModule { }
