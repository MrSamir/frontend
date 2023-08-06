import {
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA,
  APP_INITIALIZER,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CoreLibModule } from 'projects/core-lib/src/public-api';
import { ButtonModule } from 'primeng/button';
import { AppMessageService } from 'projects/core-lib/src/lib/services/message/app-message.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';

import { PublicPortalSharedModule } from './modules/shared/modules/public-portal-shared.module';
import { MultiSelectModule } from 'primeng/multiselect';
import { SharecomponentModule } from 'projects/shared-features-lib/src/lib/modules/sharecomponent.module';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { LoginComponent } from './login/login.component';
import { LandingComponent } from './layout/landing/landing.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServicesProxyModule } from './modules/shared/services/services.module';
import { appCoreLoader } from 'projects/core-lib/src/lib/loaders/appCoreLoader';
import { API_BASE_URL } from './modules/shared/services/services-proxies/service-proxies';
import { AppInitializer } from '../../../core-lib/src/lib/application-configuration-loader/appInitializer';
import { AppConfigSubjectService } from 'projects/core-lib/src/lib/services/appConfigSubjectService';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export const configApiBaseUrl = (ConfigSubject :AppConfigSubjectService) => {
    return ConfigSubject.getAppConfig().BaseApiUrl;
};
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    LandingComponent,
  ],
  imports: [
    MultiSelectModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    SharecomponentModule,
    PublicPortalSharedModule,
    CommonModule,
    AppRoutingModule,
    ButtonModule,
    CoreLibModule,
    ButtonModule,
    MessagesModule,
    NgbModule,
    ServicesProxyModule,
  ],
  providers: [
    MessageService,
    AppMessageService,
    ConfirmationService,
    {
      provide: API_BASE_URL,
      useFactory: configApiBaseUrl,
      deps: [AppConfigSubjectService],
    },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
