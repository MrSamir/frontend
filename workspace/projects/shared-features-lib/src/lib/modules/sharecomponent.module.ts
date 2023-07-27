
import { NgModule } from '@angular/core';

 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { BreadcrumbComponent } from '../components/breadcrumb/breadcrumb.component';
import { NgBootstrapHijriGregorianDatepickerComponent } from '../components/ng-bootstrap-hijri-gregorian-datepicker/ng-bootstrap-hijri-gregorian-datepicker.component';
import { HijriDatepickerComponent } from '../components/ng-bootstrap-hijri-gregorian-datepicker/hijri-datepicker/hijri-datepicker.component';
import { IDNumberWithValidationComponent } from '../components/IDNumberWithValidation/IDNumberWithValidation.component';
import { DateFormatterService } from '../components/ng-bootstrap-hijri-gregorian-datepicker/date-formatter.service';
import { BreadcrumbModule } from 'primeng/breadcrumb';
 



@NgModule({
  declarations: [BreadcrumbComponent ,NgBootstrapHijriGregorianDatepickerComponent,HijriDatepickerComponent,
    IDNumberWithValidationComponent],
  imports: [
    
    BreadcrumbModule,
    FormsModule,NgbDatepickerModule   ,ReactiveFormsModule
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
