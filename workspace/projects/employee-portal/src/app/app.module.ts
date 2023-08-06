import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {CoreModule} from "./core/core.module";
 
 

import { HttpClient } from '@angular/common/http';
import { TableModule } from 'primeng/table';


import { ButtonModule } from 'primeng/button';
import { /*...,*/ APP_INITIALIZER } from '@angular/core';
import {  HttpClientModule } from '@angular/common/http';
import { AppconfigurationLoaderService } from 'projects/core-lib/src/lib/application-configuration-loader/appconfiguration-loader.service';
import { AppConfig } from './app-config';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { AppMessageService } from 'projects/core-lib/src/lib/services/message/app-message.service';
import { ConfirmationService, MessageService } from 'primeng/api';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { LoadingService } from 'projects/core-lib/src/lib/services/loading.service';
import { CoreLibModule } from 'projects/core-lib/src/public-api';
import { SharecomponentModule } from 'projects/shared-features-lib/src/lib/modules/sharecomponent.module';
 
 

 

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
    SharecomponentModule,
    
    CoreLibModule,
    BrowserAnimationsModule ,
    ButtonModule,
    HttpClientModule,MessagesModule,ToastModule,ConfirmDialogModule,
    TableModule
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
    LoadingService,
    HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
