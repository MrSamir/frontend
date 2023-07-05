import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeePortalRoutingModule } from '../../employee-portal-routing.module';
import { YaqeenServiceComponent } from '../components/yaqeen-service/yaqeen-service.component';
import { YaqeenServiceRequestComponent } from '../components/yaqeen-service/yaqeen-service-request/yaqeen-service-request.component';
import { YaqeenServiceResultComponent } from '../components/yaqeen-service/yaqeen-service-result/yaqeen-service-result.component';
import { LandingComponent } from '../components/landing/landing.component';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { ReactiveFormsModule } from '@angular/forms';
import { MojServiceRequestComponent } from '../components/moj-service/moj-service-request/moj-service-request.component';
import { MojServiceResultComponent } from '../components/moj-service/moj-service-result/moj-service-result.component';
import { MojServiceComponent } from '../components/moj-service/moj-service.component';
 
 


@NgModule({
  declarations: [
    YaqeenServiceComponent,YaqeenServiceRequestComponent,YaqeenServiceResultComponent,LandingComponent,MojServiceRequestComponent,MojServiceResultComponent,MojServiceComponent
  ],
  imports: [
    CommonModule,
    EmployeePortalRoutingModule,
    TabViewModule,
    TableModule ,
    CardModule,
    PanelModule ,
    ReactiveFormsModule


  ],
  exports:[
     YaqeenServiceComponent,YaqeenServiceRequestComponent,YaqeenServiceResultComponent,LandingComponent,MojServiceRequestComponent,MojServiceResultComponent
  ]

})
export class EmployeePortalInquiryModule { }
