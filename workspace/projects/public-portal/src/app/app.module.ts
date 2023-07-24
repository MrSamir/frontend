import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//import { AssetsDemoComponent, LoginDemoComponent } from 'projects/shared-features-lib/src/public-api';
import { AssetsDemoModule, LoginDemoModule, SharecomponentModule } from 'projects/shared-features-lib/src/public-api';
 import { CoreModule } from './core/core.module';
import { EndowmentRegistrationModule } from './modules/endowment-registration/modules/endowment-registration.module';
 
 
import { CoreLibModule } from 'projects/core-lib/src/public-api';
import { ButtonModule } from 'primeng/button';
import { AppMessageService } from 'projects/core-lib/src/lib/services/app-message.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [

    EndowmentRegistrationModule,
    BrowserModule,
    SharecomponentModule,

    CommonModule,
    AppRoutingModule,
    LoginDemoModule,
    AssetsDemoModule,ButtonModule,CoreModule
     ,
    CoreLibModule,
    ButtonModule,
    MessagesModule
  ],
  providers: [
    MessageService,
    AppMessageService,
    ConfirmationService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
