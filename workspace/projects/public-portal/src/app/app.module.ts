import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//import { AssetsDemoComponent, LoginDemoComponent } from 'projects/shared-features-lib/src/public-api';
import { AssetsDemoModule, LoginDemoModule } from 'projects/shared-features-lib/src/public-api';
import { CoreLibModule } from 'projects/core-lib/src/public-api';

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
    CoreLibModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
