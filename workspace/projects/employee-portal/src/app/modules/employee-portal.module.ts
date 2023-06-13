import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

 
import { EmployeePortalRoutingModule } from './employee-portal-routing.module';
import { RouterModule } from '@angular/router';
import { EmployeePortalInquiryModule } from './inquiry-module/modules/employee-portal-inquiry.module';


@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    EmployeePortalRoutingModule,
    EmployeePortalInquiryModule
     


  ],
  exports: [RouterModule]
})
export class EmployeePortalModule { }
