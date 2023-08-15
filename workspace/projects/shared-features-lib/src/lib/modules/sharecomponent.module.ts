
import { NgModule } from '@angular/core';

 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { BreadcrumbComponent } from '../components/breadcrumb/breadcrumb.component';
import { NgBootstrapHijriGregorianDatepickerComponent } from '../components/ng-bootstrap-hijri-gregorian-datepicker/ng-bootstrap-hijri-gregorian-datepicker.component';
import { HijriDatepickerComponent } from '../components/ng-bootstrap-hijri-gregorian-datepicker/hijri-datepicker/hijri-datepicker.component';
import { IDNumberWithValidationComponent } from '../components/IDNumberWithValidation/IDNumberWithValidation.component';
import { DateFormatterService } from '../components/ng-bootstrap-hijri-gregorian-datepicker/date-formatter.service';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { FileUploadModule } from 'primeng/fileupload';

import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';

import { FileUploaderComponent } from '../components/file-uploader/file-uploader.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { AttachmentViewerComponent } from '../components/AttachmentViewer/AttachmentViewer.component';
 import { GalleriaModule } from 'primeng/galleria';



@NgModule({
  declarations: [
    BreadcrumbComponent,
    NgBootstrapHijriGregorianDatepickerComponent,
    HijriDatepickerComponent,
    FileUploaderComponent,
    IDNumberWithValidationComponent,
    AttachmentViewerComponent,
  ],
  imports: [
    BreadcrumbModule,
    FormsModule,
    NgbDatepickerModule,
    ReactiveFormsModule,
    FileUploadModule,
    ToastModule,
    CommonModule,
    TableModule,
    GalleriaModule,
  ],
  exports: [
    BreadcrumbComponent,
    NgBootstrapHijriGregorianDatepickerComponent,
    IDNumberWithValidationComponent,
    FileUploaderComponent,
    AttachmentViewerComponent,
  ],

  providers: [
    // { provide: NgbCalendar, useClass: NgbCalendarIslamicCivil },
    // { provide: NgbDatepickerI18n, useClass: IslamicI18n },
    DateFormatterService,
  ],
})
export class SharecomponentModule {}
