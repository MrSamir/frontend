import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './compoenents/header/header.component';
import { FooterComponent } from './compoenents/footer/footer.component';
import { NavBarComponent } from './compoenents/nav-bar/nav-bar.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NavBarComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    HeaderComponent,
    FooterComponent,
    NavBarComponent
  ]
})
export class CoreModule { }
