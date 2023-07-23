import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//import { AssetsDemoComponent, LoginDemoComponent } from 'projects/shared-features-lib/src/public-api';
import { AssetsDemoModule, LoginDemoModule, SharecomponentModule } from 'projects/shared-features-lib/src/public-api';
import { ButtonModule } from 'primeng/button';
import { CoreModule } from './core/core.module';
import { EndowmentRegistrationModule } from './modules/endowment-registration/modules/endowment-registration.module';
 
 
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
