import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
 
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CoreLibModule } from 'projects/core-lib/src/public-api';
 import { EndowmentSeersListComponent } from '../components/endowment-seers-list/endowment-seers-list.component';
import { EndowmentBeneficiariesListComponent } from '../components/endowment-beneficiaries-list/endowment-beneficiaries-list.component';
import { EndowmentEndowersListComponent } from '../components/endowment-endowers-list/endowment-endowers-list.component';
 import { MultiSelectModule } from 'primeng/multiselect';

@NgModule({
  imports: [
    CommonModule,
     ReactiveFormsModule,CoreLibModule,MultiSelectModule
  ],
  exports: [
    CommonModule,
      

   EndowmentEndowersListComponent,
EndowmentBeneficiariesListComponent,
EndowmentSeersListComponent
 



  ],
  declarations: [
    
    EndowmentEndowersListComponent,
  
    EndowmentSeersListComponent,
    EndowmentBeneficiariesListComponent,
   
    
  
  ]
})
export class EndowmentRegistrationSharedModule { }
