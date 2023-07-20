import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {SidebarModule} from 'primeng/sidebar';
import {ButtonModule} from 'primeng/button';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CardModule } from 'primeng/card';
 
import { TabMenuModule } from 'primeng/tabmenu';
import { TabViewModule } from 'primeng/tabview';

import { TableModule } from 'primeng/table';
import { HeaderComponent } from './components/layout/header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './components/layout/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { LandingComponent } from './components/landing/landing.component';

 
@NgModule({
  
  declarations: [
    HeaderComponent,FooterComponent,LoginComponent,LandingComponent
   
  ],
  imports: [
    CommonModule,NgbModule,RouterModule
    
  ],
  exports:[
    HeaderComponent,FooterComponent
   
  ]
})
export class CoreModule { }
