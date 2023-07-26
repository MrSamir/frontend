import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
 import { EndowmentApplicantEditComponent } from '../components/endowment-applicant-edit/endowment-applicant-edit.component';
 
import { ReactiveFormsModule } from '@angular/forms';
import { CoreLibModule } from 'projects/core-lib/src/public-api';
 import { EndowmentSeersListComponent } from '../components/endowment-seers-list/endowment-seers-list.component';
import { EndowmentBeneficiariesListComponent } from '../components/endowment-beneficiaries-list/endowment-beneficiaries-list.component';
import { EndowmentEndowersListComponent } from '../components/endowment-endowers-list/endowment-endowers-list.component';
import { EndowmentInfoEditComponent } from '../components/endowment-info-edit/endowment-info-edit.component';
import { EndowmentAssetsEditComponent } from '../components/endowment-assets-edit/endowment-assets-edit.component';
import { MultiSelectModule } from 'primeng/multiselect';

@NgModule({
  imports: [
    CommonModule,
     ReactiveFormsModule,CoreLibModule,MultiSelectModule
  ],
  exports: [
    CommonModule,
      
   EndowmentApplicantEditComponent,
   EndowmentEndowersListComponent,
EndowmentBeneficiariesListComponent,
EndowmentSeersListComponent,
EndowmentInfoEditComponent,
EndowmentAssetsEditComponent


  ],
  declarations: [
    
    EndowmentEndowersListComponent,
    EndowmentApplicantEditComponent,
    EndowmentSeersListComponent,
    EndowmentBeneficiariesListComponent,
    EndowmentInfoEditComponent,
    EndowmentAssetsEditComponent
  
  ]
})
export class EndowmentRegistrationSharedModule { }
