import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
 import { ApplicantEditComponent } from '../components/applicant-edit/applicant-edit.component';

@NgModule({
  imports: [
    CommonModule,
     
  ],
  exports: [
    CommonModule,
     ApplicantEditComponent
  ],
  declarations: [ApplicantEditComponent]
})
export class EndowmentRegistrationSharedModule { }
