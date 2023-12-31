import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './compoenents/header/header.component';
import { FooterComponent } from './compoenents/footer/footer.component';
import { NavBarComponent } from './compoenents/nav-bar/nav-bar.component';
import {SidebarModule} from 'primeng/sidebar';
import {ButtonModule} from 'primeng/button';
import { LandingComponent } from '../modules/inquiry-module/components/landing/landing.component';
import { HttpClientModule } from '@angular/common/http';
import { CardModule } from 'primeng/card';
 
import { TabMenuModule } from 'primeng/tabmenu';
import { TabViewModule } from 'primeng/tabview';
import { LoginComponent } from './compoenents/login/login.component';
import { TableModule } from 'primeng/table';
import { EmployeePortalRoutingModule } from '../modules/employee-portal-routing.module';
 
@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NavBarComponent,
    LoginComponent
  ],
  imports: [
    CommonModule ,SidebarModule,ButtonModule,CardModule,HttpClientModule,EmployeePortalRoutingModule
    
  ],
  exports:[
    HeaderComponent,
    FooterComponent,
    NavBarComponent,LoginComponent
  ]
})
export class CoreModule { }
