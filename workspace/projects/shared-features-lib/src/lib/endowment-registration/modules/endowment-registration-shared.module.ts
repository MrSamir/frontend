import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
 import { ApplicantEditComponent } from '../components/applicant-edit/applicant-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EndowmentInfoComponent } from '../components/endowment-info/endowment-info.component';
import { MultiSelectModule } from 'primeng/multiselect';

@NgModule({
  imports: [
    CommonModule,FormsModule,ReactiveFormsModule,MultiSelectModule
     
  ],
  exports: [
    CommonModule,
     ApplicantEditComponent,EndowmentInfoComponent
  ],
  declarations: [ApplicantEditComponent,EndowmentInfoComponent]
})
export class EndowmentRegistrationSharedModule { }
