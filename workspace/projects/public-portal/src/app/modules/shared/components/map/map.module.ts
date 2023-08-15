import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MapComponent} from './map.component';
import {AgmCoreModule, GoogleMapsAPIWrapper} from "@agm/core";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {AppComponent} from "@app/app.component";


@NgModule({
  declarations: [
    MapComponent
  ],
  imports: [
    NgbModule,
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey:"AIzaSyCvmBlv7K2uypX65NgMKyh3Q3T59_nGWW8",// AppComponent.googleMapApiKey,
      libraries: ['places']
    })
  ],
  exports: [
    MapComponent
  ],
  providers: [
    GoogleMapsAPIWrapper
  ]
})
export class MapModule { }
