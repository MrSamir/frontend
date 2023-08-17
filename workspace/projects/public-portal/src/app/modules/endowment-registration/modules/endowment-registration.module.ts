import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EndowmentRegistrationRoutingModule } from './endowment-registration-routing.module';
import { EndowmentRegistrationStartServiceComponent } from '../components/endowment-registration-start-service/endowment-registration-start-service.component';
import { EndowmentRegistrationNewComponent } from '../components/endowment-registration-new/endowment-registration-new.component';
 import { ArchwizardModule } from 'angular-archwizard';
import { PublicPortalSharedModule } from '../../shared/modules/public-portal-shared.module';
import { EndowmentRegistrationSharedModule } from 'projects/shared-features-lib/src/lib/endowment-registration/modules/endowment-registration-shared.module';
import { EndowmentDirectRegisterationComponent } from '../components/endowment-direct-registeration/endowment-direct-registeration.component';
import { CoreLibModule } from "../../../../../../core-lib/src/lib/core-lib.module";
import { FormsModule } from '@angular/forms';
import {PanelModule} from "primeng/panel";



@NgModule({
    declarations: [
        EndowmentRegistrationStartServiceComponent,
        EndowmentRegistrationNewComponent,
        EndowmentDirectRegisterationComponent
    ],
    exports: [ /*RouterModule*/],
    imports: [
        CommonModule, FormsModule,
        ArchwizardModule,
        EndowmentRegistrationRoutingModule,
        EndowmentRegistrationSharedModule,
        PublicPortalSharedModule,
        CoreLibModule, PanelModule
    ]
})
export class EndowmentRegistrationModule { }
