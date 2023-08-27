import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CheckboxModule } from 'primeng/checkbox';
import { CoreLibModule } from 'projects/core-lib/src/public-api';
import { ButtonModule } from 'primeng/button';
import { AppMessageService } from 'projects/core-lib/src/lib/services/message/app-message.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { RadioButtonModule } from 'primeng/radiobutton';
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
import { API_BASE_URL } from './modules/shared/services/services-proxies/service-proxies';
import { AppConfigSubjectService } from 'projects/core-lib/src/lib/services/appConfigSubjectService';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DropdownModule } from 'primeng/dropdown';
import { PanelModule } from 'primeng/panel';
import { StepsModule } from 'primeng/steps';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
export const configApiBaseUrl = (ConfigSubject: AppConfigSubjectService) =>
  ConfigSubject.getAppConfig().baseApiUrl;
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    LandingComponent,
    //EndowmentSeerEditComponent,

    //SeerStepComponent


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
    CheckboxModule,
    RadioButtonModule,
    InputSwitchModule,
    DropdownModule,
    PanelModule,
    StepsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem("jwt");
        },
        headerName: 'Authorization',
        authScheme: 'Bearer ',
      },
    }),
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
    JwtHelperService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
