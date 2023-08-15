import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';

 
import { EndowmentAssetsEditComponent } from '../components/endowment-assets-edit/endowment-assets-edit.component';
import { EndowmentInfoEditComponent } from '../components/endowment-info-edit/endowment-info-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreLibModule } from 'projects/core-lib/src/public-api';
import { MultiSelectModule } from 'primeng/multiselect';
import { CommonModule } from '@angular/common';
import { SharecomponentModule } from 'projects/shared-features-lib/src/public-api';
 
 
 
import { FileUploadModule } from 'primeng/fileupload';

import { ToastModule } from 'primeng/toast';
import { EndowmentApplicantCreateOrEditComponent } from '../components/endowment-applicant-CreateOrEdit/endowment-applicant-CreateOrEdit.component';
import { CheckboxModule } from 'primeng/checkbox';
import { InputSwitchModule } from 'primeng/inputswitch';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DropdownModule } from 'primeng/dropdown';
 import { PanelModule } from 'primeng/panel';
import { HintComponent } from 'projects/core-lib/src/lib/components/hint/hint.component';
import { StepsModule } from 'primeng/steps';
@NgModule({
  declarations: [
    EndowmentApplicantCreateOrEditComponent,
    EndowmentAssetsEditComponent,
    EndowmentInfoEditComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CoreLibModule,
    SharecomponentModule,
    MultiSelectModule,
    FileUploadModule,
    ToastModule,
    CheckboxModule,
    RadioButtonModule,
    InputSwitchModule,
    SelectButtonModule,
    DropdownModule,
    PanelModule,
    StepsModule,
  ],
  exports: [
    EndowmentApplicantCreateOrEditComponent,
    EndowmentAssetsEditComponent,
    EndowmentInfoEditComponent,
  ],
})
export class PublicPortalSharedModule {}
