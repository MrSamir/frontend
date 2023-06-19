import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {CoreModule} from "./core/core.module";
import { ButtonModule } from 'primeng/button';
import { /*...,*/ APP_INITIALIZER } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppconfigurationLoaderService } from 'projects/core-lib/src/lib/application-configuration-loader/appconfiguration-loader.service';
import { AppConfig } from './app-config';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { AppMessageService } from 'projects/core-lib/src/lib/services/app-message.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CoreLibModule } from 'core-lib';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { HttpResponseInterceptor } from 'projects/core-lib/src/lib/services/interceptors/httpResponseInterceptor';
import { LoadingService } from 'projects/core-lib/src/lib/services/loading.service';


export function setupAppConfigServiceFactory(
  service:AppconfigurationLoaderService, 
  appConfigSetting?: AppConfig
): Function {
  return () => service.load('app.config.json',appConfigSetting);
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    CoreLibModule,
    BrowserAnimationsModule ,
    ButtonModule,
    HttpClientModule,MessagesModule,ToastModule,ConfirmDialogModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
        useFactory: setupAppConfigServiceFactory,
        deps: [
            AppconfigurationLoaderService
        ],
        multi: true
    },
    MessageService,
    AppMessageService,ConfirmationService,
    LoadingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
