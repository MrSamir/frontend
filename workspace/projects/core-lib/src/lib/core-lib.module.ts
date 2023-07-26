 
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { LoacalizationBaseComponent } from './loacalization-base/loacalization-base.component';
import { LocalizationService } from './services/localization/localization.service';
import { LocalizePipe } from './pipes/localize.pipe';
import { appCoreLoader } from './loaders/appCoreLoader';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpResponseInterceptor } from './interceptors/httpResponseInterceptor';
import { LoadingInterceptor } from './interceptors/loading-interceptor';
import { SpinnerComponent } from './components/spinner/spinner-component';
import { BreadcrumbComponent } from 'projects/shared-features-lib/src/public-api';
 

export function setupTranslateServiceFactory(
  service: LocalizationService): Function {
return () => service.use('ar');
}
 
@NgModule({
  declarations: [
 
    LoacalizationBaseComponent,
    LocalizePipe,
    SpinnerComponent,
     
  ],
  imports: [
    HttpClientModule
  ],
  exports: [
    
    LocalizePipe,
    LoacalizationBaseComponent,
    SpinnerComponent,
     
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpResponseInterceptor,
      multi: true
    },
    HttpClient,
    appCoreLoader,
    LocalizationService,
    {
      provide: APP_INITIALIZER,
      useFactory: setupTranslateServiceFactory,
      deps: [
        LocalizationService
      ],
      multi: true
    }
  ]
})
export class CoreLibModule { }
