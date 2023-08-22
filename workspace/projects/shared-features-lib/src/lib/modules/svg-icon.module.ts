import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { IconComponent } from '../components/svg-icon/icon.component';



@NgModule({
  imports: [
    CommonModule,
    InlineSVGModule.forRoot(),
  ],
  declarations: [IconComponent],
  exports: [
    IconComponent
  ]
})
export class SvgIconModule { }
