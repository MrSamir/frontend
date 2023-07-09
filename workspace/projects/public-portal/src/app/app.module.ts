import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//import { AssetsDemoComponent, LoginDemoComponent } from 'projects/shared-features-lib/src/public-api';
import { AssetsDemoModule, LoginDemoModule } from 'projects/shared-features-lib/src/public-api';
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
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    LoginDemoModule,
    AssetsDemoModule,
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
