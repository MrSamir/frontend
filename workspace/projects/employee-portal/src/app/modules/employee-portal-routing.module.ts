import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { YaqeenServiceComponent } from './inquiry-module/components/yaqeen-service/yaqeen-service.component';
import { MojServiceComponent } from './inquiry-module/components/moj-service/moj-service.component';
import { LandingComponent } from './inquiry-module/components/landing/landing.component';



const routes: Routes = [ 
  { path: '', component: LandingComponent },
  { path: 'moj/request', component: MojServiceComponent },
  { path: 'yaqeen/request', component: YaqeenServiceComponent },   
  
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeePortalRoutingModule { }
