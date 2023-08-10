import {NgModule} from '@angular/core';


import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbDatepickerModule} from '@ng-bootstrap/ng-bootstrap';
import {BreadcrumbComponent} from '../components/breadcrumb/breadcrumb.component';
import {
  NgBootstrapHijriGregorianDatepickerComponent
} from '../components/ng-bootstrap-hijri-gregorian-datepicker/ng-bootstrap-hijri-gregorian-datepicker.component';
import {
  HijriDatepickerComponent
} from '../components/ng-bootstrap-hijri-gregorian-datepicker/hijri-datepicker/hijri-datepicker.component';
import {IDNumberWithValidationComponent} from '../components/IDNumberWithValidation/IDNumberWithValidation.component';
import {DateFormatterService} from '../components/ng-bootstrap-hijri-gregorian-datepicker/date-formatter.service';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {FileUploadModule} from 'primeng/fileupload';

import {ToastModule} from 'primeng/toast';
import {TableModule} from 'primeng/table';

import {FileUploaderComponent} from '../components/file-uploader/file-uploader.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CommonModule} from '@angular/common';
import {PublicUserProfileComponent} from "../components/public-user-profile/public-user-profile.component";
import {CoreLibModule} from "../../../../core-lib/src/lib/core-lib.module";
import {YakeenAlienViewComponent} from "../components/yakeenPerson/alien/yakeen-alien-view";
import {YakeenCitizenViewComponent} from "../components/yakeenPerson/citizen/yakeen-citizen-view";
import {YakeenPersonComponent} from "../components/yakeenPerson/yakeen-person.component";
import {ValidationMessagesComponent} from "../components/validation-messages/validation-messages.component";
import {YakeenPersonViewComponent} from "../components/yakeenPerson/yakeen-person-view/yakeen-person-view.component";
import {EditHafezaComponent} from "../components/Hafeza/edit-hafeza/edit-hafeza.component";
import {CreateHafezaComponent} from "../components/Hafeza/create-hafeza/create-hafeza.component";
import {ViewHafezaComponent} from "../components/Hafeza/view-hafeza/view-hafeza.component";


@NgModule({
  declarations: [BreadcrumbComponent, NgBootstrapHijriGregorianDatepickerComponent, HijriDatepickerComponent, FileUploaderComponent,
    IDNumberWithValidationComponent, PublicUserProfileComponent, YakeenAlienViewComponent, YakeenCitizenViewComponent, YakeenPersonComponent,
    ValidationMessagesComponent, YakeenPersonViewComponent, CreateHafezaComponent, EditHafezaComponent, ViewHafezaComponent],
  exports: [
    BreadcrumbComponent, NgBootstrapHijriGregorianDatepickerComponent, IDNumberWithValidationComponent, FileUploaderComponent,
    PublicUserProfileComponent, YakeenAlienViewComponent, YakeenCitizenViewComponent, YakeenPersonComponent, ValidationMessagesComponent
    ,YakeenPersonViewComponent, CreateHafezaComponent, EditHafezaComponent, ViewHafezaComponent
  ],
  providers: [
    // { provide: NgbCalendar, useClass: NgbCalendarIslamicCivil },
    // { provide: NgbDatepickerI18n, useClass: IslamicI18n },
    DateFormatterService
  ],
  imports: [
    BreadcrumbModule,
    FormsModule, NgbDatepickerModule, ReactiveFormsModule, FileUploadModule, ToastModule, CommonModule, TableModule,
    CoreLibModule
  ]
})
export class SharecomponentModule {
}
