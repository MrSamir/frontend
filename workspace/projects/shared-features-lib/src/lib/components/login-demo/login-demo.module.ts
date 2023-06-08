import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginDemoComponent } from '../login-demo/login-demo.component';



@NgModule({
  declarations: [
    LoginDemoComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    LoginDemoComponent
  ]
})
export class LoginDemoModule { }
