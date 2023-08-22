
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

 
import { RouterModule } from '@angular/router';
import { EndowmentRegistrationRoutingModule } from './endowment-registration-routing.module';
import { EndowmentRegistrationStartServiceComponent } from '../components/endowment-registration-start-service/endowment-registration-start-service.component';
import { EndowmentRegistrationNewComponent } from '../components/endowment-registration-new/endowment-registration-new.component';
import { ArchwizardModule } from 'angular-archwizard';
import { PublicPortalSharedModule } from '../../shared/modules/public-portal-shared.module';
import { EndowmentRegistrationSharedModule } from 'projects/shared-features-lib/src/lib/endowment-registration/modules/endowment-registration-shared.module';
import { EndowmenInstantRegistrationEditComponent } from '../components/endowmen-instant-registration-edit/endowmen-instant-registration-edit.component';
import { EndowmenInstantRegistrationInfoComponent } from '../components/endowmen-instant-registration-info/endowmen-instant-registration-info.component';
 import {AccordionModule}    from 'primeng/accordion';
 import {MultiSelectModule}    from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';
import { CoreLibModule } from 'projects/core-lib/src/public-api';
import { SeerStepComponent } from '../components/endowment-registration-new/seer-step/seer-step.component';
import { BeneficiaryStepComponent } from '../components/endowment-registration-new/beneficiary-step/beneficiary-step.component';
import { EndowmentDirectRegisterationComponent } from '../components/endowment-direct-registeration/endowment-direct-registeration.component';
import {PanelModule} from "primeng/panel";


@NgModule({
  declarations: [
    EndowmentRegistrationStartServiceComponent,
    EndowmentRegistrationNewComponent,
    EndowmenInstantRegistrationEditComponent,
    EndowmenInstantRegistrationInfoComponent,
    SeerStepComponent,
    BeneficiaryStepComponent,
    EndowmentDirectRegisterationComponent
  ],
  imports: [
    ArchwizardModule,
    EndowmentRegistrationRoutingModule,
    EndowmentRegistrationSharedModule,
    PanelModule,


    PublicPortalSharedModule,
    AccordionModule,
    FormsModule,
    CoreLibModule,
    MultiSelectModule,

  ],
  exports: [ /*RouterModule*/]
})
export class EndowmentRegistrationModule { }
