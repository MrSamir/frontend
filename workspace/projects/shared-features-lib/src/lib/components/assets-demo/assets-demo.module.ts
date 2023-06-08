import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetsDemoComponent } from './assets-demo.component';



@NgModule({
  declarations: [
    AssetsDemoComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    AssetsDemoComponent
  ]
})
export class AssetsDemoModule { }
