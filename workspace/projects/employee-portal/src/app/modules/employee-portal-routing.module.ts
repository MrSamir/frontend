import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { YaqeenServiceComponent } from './inquiry-module/components/yaqeen-service/yaqeen-service.component';
import { MojServiceComponent } from './inquiry-module/components/moj-service/moj-service.component';
import { LandingComponent } from './inquiry-module/components/landing/landing.component';



const routes: Routes = [ 
  { path: '', component: LandingComponent,data: { title: 'منصة الاستعلامات' ,breadcrumb:'منصة الاستعلامات' } },
  { path: 'moj/request', component: MojServiceComponent ,data: { title: 'وزارة العدل',breadcrumb: 'تحقق الوكالات' }},
  { path: 'yaqeen/request', component: YaqeenServiceComponent ,data: { title: 'وزارة الداخلية' ,breadcrumb: 'تحقق يقين' }},   
  
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeePortalRoutingModule { }
