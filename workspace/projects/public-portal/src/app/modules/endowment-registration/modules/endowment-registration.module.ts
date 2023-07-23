import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

 
 import { RouterModule } from '@angular/router';
import { EndowmentRegistrationRoutingModule } from './endowment-registration-routing.module';
import { EndowmentRegistrationStartServiceComponent } from '../components/endowment-registration-new/endowment-registration-start-service/endowment-registration-start-service.component';
import { EndowmentRegistrationNewComponent } from '../components/endowment-registration-new/endowment-registration-new.component';

 

@NgModule({
  declarations: [
    EndowmentRegistrationStartServiceComponent,
    EndowmentRegistrationNewComponent
  ],
  imports: [
    CommonModule,
    EndowmentRegistrationRoutingModule

 
     


  ],
  exports: [
     
    RouterModule]
})
export class EndowmentRegistrationModule { }
