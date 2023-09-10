
import { CUSTOM_ELEMENTS_SCHEMA, ErrorHandler, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';

import { LoacalizationBaseComponent } from './loacalization-base/loacalization-base.component';
import { LocalizationService } from './services/localization/localization.service';
import { LocalizePipe } from './pipes/localize.pipe';
import { appCoreLoader } from './loaders/appCoreLoader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpResponseInterceptor } from './interceptors/httpResponseInterceptor';
import { LoadingInterceptor } from './interceptors/loading-interceptor';
import { SpinnerComponent } from './components/spinner/spinner-component';
import { GlobalErrorHandler } from './Handlers/GlobalErrorHandler';
import { MessageAndspinnerComponent } from './components/messageAndspinner/messageAndspinner.component';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ValidationMessagesComponent } from './components/validationMessages/validationMessages.component';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { HintComponent } from './components/hint/hint.component';
import { PanelModule } from 'primeng/panel';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { SvgIconModule } from 'projects/shared-features-lib/src/lib/modules/svg-icon.module';

@NgModule({
  declarations: [
    LoacalizationBaseComponent,
    LocalizePipe,
    SpinnerComponent,
    MessageAndspinnerComponent,
    ValidationMessagesComponent,
    HintComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MessagesModule,
    ToastModule,
    ConfirmDialogModule,
    OverlayPanelModule,
    PanelModule,
    SvgIconModule
  ],
  exports: [
    LocalizePipe,
    LoacalizationBaseComponent,
    SpinnerComponent,
    MessageAndspinnerComponent,
    ValidationMessagesComponent,
    HintComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpResponseInterceptor,
      multi: true,
    },
    {
      // processes all errors
      provide: ErrorHandler,
      useClass: GlobalErrorHandler,
    },
    HttpClient,
    appCoreLoader,
    LocalizationService,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class CoreLibModule { }
