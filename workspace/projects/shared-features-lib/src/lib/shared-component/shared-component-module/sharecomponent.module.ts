//import { NgBootstrapHijriGregorianDatepickerModule } from './../../ng-bootstrap-hijri-gregorian-datepicker/ng-bootstrap-hijri-gregorian-datepicker.module';
import { NgModule } from '@angular/core';

import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { BreadcrumbModule } from 'primeng/breadcrumb';
//import { NgBootstrapHijriGregorianDatepickerComponent } from '../../ng-bootstrap-hijri-gregorian-datepicker/ng-bootstrap-hijri-gregorian-datepicker.component';



@NgModule({
  declarations: [BreadcrumbComponent ],
  imports: [
    BreadcrumbModule//,NgBootstrapHijriGregorianDatepickerModule
  ],
  exports:[
    BreadcrumbComponent//,NgBootstrapHijriGregorianDatepickerComponent
  ]

})
export class SharecomponentModule { }
