import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './compoenents/header/header.component';
import { FooterComponent } from './compoenents/footer/footer.component';
import { NavBarComponent } from './compoenents/nav-bar/nav-bar.component';
import {SidebarModule} from 'primeng/sidebar';
import {ButtonModule} from 'primeng/button';
import { LandingComponent } from './compoenents/landing/landing.component';
import { HttpClientModule } from '@angular/common/http';
import { CardModule } from 'primeng/card';
 
import { TabMenuModule } from 'primeng/tabmenu';
import { TabViewModule } from 'primeng/tabview';
import { LoginComponent } from './compoenents/login/login.component';
 
@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NavBarComponent,
    LandingComponent,LoginComponent
  ],
  imports: [
    CommonModule ,SidebarModule,ButtonModule,CardModule, TabMenuModule,TabViewModule,HttpClientModule
    
  ],
  exports:[
    HeaderComponent,
    FooterComponent,
    NavBarComponent,LandingComponent,LoginComponent
  ]
})
export class CoreModule { }
