import { NgModule } from '@angular/core';

 
import { EndowmentApplicantEditComponent } from '../components/endowment-applicant-edit/endowment-applicant-edit.component';
import { EndowmentAssetsEditComponent } from '../components/endowment-assets-edit/endowment-assets-edit.component';
import { EndowmentInfoEditComponent } from '../components/endowment-info-edit/endowment-info-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreLibModule } from 'projects/core-lib/src/public-api';
import { MultiSelectModule } from 'primeng/multiselect';
import { CommonModule } from '@angular/common';
import { SharecomponentModule } from 'projects/shared-features-lib/src/public-api';
 
 
 
import { FileUploadModule } from 'primeng/fileupload';

import { ToastModule } from 'primeng/toast';
 

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
 CoreLibModule,SharecomponentModule,
MultiSelectModule,FileUploadModule,ToastModule
  ],
  exports: [
    
    EndowmentApplicantEditComponent,
EndowmentAssetsEditComponent,
EndowmentInfoEditComponent
   

    ]
})
export class PublicPortalSharedModule { }
