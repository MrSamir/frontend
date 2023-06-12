import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {CoreModule} from "./core/core.module";
import { SharecomponentModule } from 'projects/shared-features-lib/src/public-api';
 

 
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SharecomponentModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
