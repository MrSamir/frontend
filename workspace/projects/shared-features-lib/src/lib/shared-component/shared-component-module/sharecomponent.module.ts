import { HijriDatepickerComponent, IslamicI18n } from './../ng-bootstrap-hijri-gregorian-datepicker/hijri-datepicker/hijri-datepicker.component';
import { NgModule } from '@angular/core';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { NgBootstrapHijriGregorianDatepickerComponent } from '../ng-bootstrap-hijri-gregorian-datepicker/ng-bootstrap-hijri-gregorian-datepicker.component';
import { DateFormatterService } from '../ng-bootstrap-hijri-gregorian-datepicker/date-formatter.service';
import { FormsModule } from '@angular/forms';
import {  NgbCalendar, NgbCalendarIslamicCivil, NgbDatepickerI18n, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [BreadcrumbComponent,HijriDatepickerComponent ,NgBootstrapHijriGregorianDatepickerComponent],
  imports: [
    BreadcrumbModule,FormsModule,BrowserModule,NgbDatepickerModule
  ],
  exports:[
    BreadcrumbComponent,NgBootstrapHijriGregorianDatepickerComponent
  ],

  providers: [
    { provide: NgbCalendar, useClass: NgbCalendarIslamicCivil },
		{ provide: NgbDatepickerI18n, useClass: IslamicI18n },
    DateFormatterService
  ],
  
})
export class SharecomponentModule { }
