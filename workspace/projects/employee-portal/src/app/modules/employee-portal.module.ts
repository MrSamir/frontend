import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

 
import { EmployeePortalRoutingModule } from './employee-portal-routing.module';
import { RouterModule } from '@angular/router';
import { EmployeePortalInquiryModule } from './inquiry-module/modules/employee-portal-inquiry.module';
import { TableModule } from 'primeng/table';
import { LandingComponent } from './inquiry-module/components/landing/landing.component';
import { TabViewModule } from 'primeng/tabview';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [
     
  ],
  imports: [
    CommonModule,

    EmployeePortalRoutingModule,
    EmployeePortalInquiryModule,
    
     


  ],
  exports: [
     
    RouterModule]
})
export class EmployeePortalModule { }
