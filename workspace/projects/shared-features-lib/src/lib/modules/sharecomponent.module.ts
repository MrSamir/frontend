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
import { CommonModule } from '@angular/common';
import { PublicUserProfileComponent } from '../components/public-user-profile/public-user-profile.component';
import { CoreLibModule } from '../../../../core-lib/src/lib/core-lib.module';
import { YakeenAlienViewComponent } from '../components/yakeenPerson/alien/yakeen-alien-view';
import { YakeenCitizenViewComponent } from '../components/yakeenPerson/citizen/yakeen-citizen-view';
import { YakeenPersonComponent } from '../components/yakeenPerson/yakeen-person.component';
import { ValidationMessagesComponent } from '../components/validation-messages/validation-messages.component';
import { YakeenPersonViewComponent } from '../components/yakeenPerson/yakeen-person-view/yakeen-person-view.component';
import { EditHafezaComponent } from '../components/Hafeza/edit-hafeza/edit-hafeza.component';
import { CreateHafezaComponent } from '../components/Hafeza/create-hafeza/create-hafeza.component';
import { ViewHafezaComponent } from '../components/Hafeza/view-hafeza/view-hafeza.component';
import { EmailConfirmationComponent } from '../components/email-confirmation/email-confirmation.component';
import { AttachmentViewerComponent } from '../components/AttachmentViewer/AttachmentViewer.component';
import { GalleriaModule } from 'primeng/galleria';
import { CustomYearSelectComponent } from '../components/ng-bootstrap-hijri-gregorian-datepicker/hijri-datepicker/custom-year-select/custom-year-select.component';

@NgModule({
  declarations: [
    BreadcrumbComponent,
    NgBootstrapHijriGregorianDatepickerComponent,
    HijriDatepickerComponent,
    FileUploaderComponent,
    IDNumberWithValidationComponent,
    AttachmentViewerComponent,
    PublicUserProfileComponent,
    YakeenAlienViewComponent,
    YakeenCitizenViewComponent,
    YakeenPersonComponent,
    ValidationMessagesComponent,
    YakeenPersonViewComponent,
    CreateHafezaComponent,
    EditHafezaComponent,
    ViewHafezaComponent,
    EmailConfirmationComponent,
    CustomYearSelectComponent,
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
    CoreLibModule,
  ],
  exports: [
    BreadcrumbComponent,
    NgBootstrapHijriGregorianDatepickerComponent,
    IDNumberWithValidationComponent,
    FileUploaderComponent,
    AttachmentViewerComponent,
    PublicUserProfileComponent,
    YakeenAlienViewComponent,
    YakeenCitizenViewComponent,
    YakeenPersonComponent,
    ValidationMessagesComponent,
    YakeenPersonViewComponent,
    CreateHafezaComponent,
    EditHafezaComponent,
    ViewHafezaComponent,
    EmailConfirmationComponent,
    CustomYearSelectComponent,
  ],
  providers: [
    // { provide: NgbCalendar, useClass: NgbCalendarIslamicCivil },
    // { provide: NgbDatepickerI18n, useClass: IslamicI18n },
    DateFormatterService,
  ],
})
export class SharecomponentModule { }
