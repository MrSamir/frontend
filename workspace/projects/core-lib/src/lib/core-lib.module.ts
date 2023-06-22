import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CoreLibComponent } from './core-lib.component';
import { LoacalizationBaseComponent } from './loacalization-base/loacalization-base.component';
import { LocalizationService } from './services/localization/localization.service';
import { LocalizePipe } from './pipes/localize.pipe';
import { appCoreLoader } from './loaders/appCoreLoader';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';

export function setupTranslateServiceFactory(
  service: LocalizationService): Function {
return () => service.use('ar');
}

@NgModule({
  declarations: [
    CoreLibComponent,
    LoacalizationBaseComponent,
    LocalizePipe
  ],
  imports: [
    HttpClientModule
  ],
  exports: [
    CoreLibComponent,
    LocalizePipe,
    LoacalizationBaseComponent
  ],
  providers: [
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
  ],

})
export class CoreLibModule { }
