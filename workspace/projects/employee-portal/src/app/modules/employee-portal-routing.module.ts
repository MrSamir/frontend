import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { YaqeenServiceComponent } from './inquiry-module/components/yaqeen-service/yaqeen-service.component';
import { MojServiceComponent } from './inquiry-module/components/moj-service/moj-service.component';



const routes: Routes = [ 
  { path: 'yaqeen/request', component: YaqeenServiceComponent },   
  { path: 'moj/request', component: MojServiceComponent }
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeePortalRoutingModule { }
