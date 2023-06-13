import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeePortalRoutingModule } from '../../employee-portal-routing.module';
import { YaqeenServiceComponent } from '../components/yaqeen-service/yaqeen-service.component';
import { YaqeenServiceRequestComponent } from '../components/yaqeen-service/yaqeen-service-request/yaqeen-service-request.component';
import { YaqeenServiceResultComponent } from '../components/yaqeen-service/yaqeen-service-result/yaqeen-service-result.component';

 
 


@NgModule({
  declarations: [
    YaqeenServiceComponent,YaqeenServiceRequestComponent,YaqeenServiceResultComponent
  ],
  imports: [
    CommonModule,
    EmployeePortalRoutingModule,
    


  ],
  exports:[
     YaqeenServiceComponent,YaqeenServiceRequestComponent,YaqeenServiceResultComponent
  ]

})
export class EmployeePortalInquiryModule { }
