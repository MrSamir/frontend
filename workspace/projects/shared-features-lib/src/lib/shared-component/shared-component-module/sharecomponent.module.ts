import { ValidationMessagesComponent } from './../validation-messages/validation-messages.component';

import { NgModule } from '@angular/core';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { NgBootstrapHijriGregorianDatepickerComponent } from '../ng-bootstrap-hijri-gregorian-datepicker/ng-bootstrap-hijri-gregorian-datepicker.component';
import { DateFormatterService } from '../ng-bootstrap-hijri-gregorian-datepicker/date-formatter.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { HijriDatepickerComponent } from '../ng-bootstrap-hijri-gregorian-datepicker/hijri-datepicker/hijri-datepicker.component';
import { IDNumberWithValidationComponent } from '../IDNumberWithValidation/IDNumberWithValidation.component';




@NgModule({
  declarations: [BreadcrumbComponent ,NgBootstrapHijriGregorianDatepickerComponent,HijriDatepickerComponent,
    IDNumberWithValidationComponent,ValidationMessagesComponent],
  imports: [
    BreadcrumbModule,FormsModule,BrowserModule,NgbDatepickerModule   ,ReactiveFormsModule
  ],
  exports:[
    BreadcrumbComponent,NgBootstrapHijriGregorianDatepickerComponent,IDNumberWithValidationComponent
  ],

  providers: [
    // { provide: NgbCalendar, useClass: NgbCalendarIslamicCivil },
		// { provide: NgbDatepickerI18n, useClass: IslamicI18n },
     DateFormatterService
  ],
  
})
export class SharecomponentModule { }
