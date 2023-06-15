import { NgModule } from '@angular/core';
import { CoreLibComponent } from './core-lib.component';
import { LoacalizationBaseComponent } from './loacalization-base/loacalization-base.component';



@NgModule({
  declarations: [
    CoreLibComponent,
    LoacalizationBaseComponent
  ],
  imports: [
  ],
  exports: [
    CoreLibComponent
  ]
})
export class CoreLibModule { }
