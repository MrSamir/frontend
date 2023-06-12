import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { BreadcrumbModule } from 'primeng/breadcrumb';


@NgModule({
  declarations: [BreadcrumbComponent],
  imports: [
    CommonModule,BreadcrumbModule
  ],
  exports:[
    BreadcrumbComponent
  ]

})
export class SharecomponentModule { }
