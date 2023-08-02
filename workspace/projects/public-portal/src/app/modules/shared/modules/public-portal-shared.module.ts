import { NgModule } from '@angular/core';

 
import { EndowmentApplicantEditComponent } from '../components/endowment-applicant-edit/endowment-applicant-edit.component';
import { EndowmentAssetsEditComponent } from '../components/endowment-assets-edit/endowment-assets-edit.component';
import { EndowmentInfoEditComponent } from '../components/endowment-info-edit/endowment-info-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreLibModule } from 'projects/core-lib/src/public-api';
import { MultiSelectModule } from 'primeng/multiselect';
import { CommonModule } from '@angular/common';
 
 
 
 
 

@NgModule({
  declarations: [
 
EndowmentApplicantEditComponent,
EndowmentAssetsEditComponent,
EndowmentInfoEditComponent
 
  ],
  imports: [
    FormsModule,
 CommonModule,
    ReactiveFormsModule,
 CoreLibModule,
MultiSelectModule
  ],
  exports: [
    
    EndowmentApplicantEditComponent,
EndowmentAssetsEditComponent,
EndowmentInfoEditComponent
   

    ]
})
export class PublicPortalSharedModule { }
