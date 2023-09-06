
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MapComponent } from './map.component';

@NgModule({
  declarations: [MapComponent],
  imports: [
    NgbModule,
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyCvmBlv7K2uypX65NgMKyh3Q3T59_nGWW8",
      libraries: ['places'],
    }),
  ],
  exports: [MapComponent],
  providers: [GoogleMapsAPIWrapper],
})
export class MapModule {}
