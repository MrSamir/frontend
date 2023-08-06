 
import { ErrorHandler, NgModule } from '@angular/core';

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

@NgModule({
  declarations: [
    LoacalizationBaseComponent,
    LocalizePipe,
    SpinnerComponent,
    MessageAndspinnerComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MessagesModule,
    ToastModule,
    ConfirmDialogModule,
  ],
  exports: [
    LocalizePipe,
    LoacalizationBaseComponent,
    SpinnerComponent,
    MessageAndspinnerComponent,
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
})
export class CoreLibModule {}
