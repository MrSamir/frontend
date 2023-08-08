import {Component, EventEmitter, Input, NgZone, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {GoogleMapsAPIWrapper, MapsAPILoader} from "@agm/core";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import { MapModel } from './map.model';
//import {MapModel} from "@app/_shared/map/map.model";

declare var google: any;

@Component({
  selector: 'google-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  @ViewChild('outSideOfSaudiArabia', {static: true, read: TemplateRef}) outSideOfSaudiArabia: TemplateRef<any>;

  geocoder:any;

  @Input() disabled: boolean;

  _map: MapModel;

  @Input()
  set map(val: MapModel) {
    this.mapChange.emit(val);
    this._map = val;
  }
  get map() {
    return this._map;
  }
  @Output()
  mapChange: EventEmitter<MapModel> = new EventEmitter<MapModel>();

  initZoom = 4;
  zoom = 12;
  initLat = 23.69665233084885;
  initLong = 45.657655575820215;

  constructor(public mapsApiLoader: MapsAPILoader,
              private zone: NgZone,
              private wrapper: GoogleMapsAPIWrapper,
              private modalService: NgbModal
  ) {

    this.mapsApiLoader = mapsApiLoader;
    this.zone = zone;
    this.wrapper = wrapper;
    this.mapsApiLoader.load().then(() => {
      this.geocoder = new google.maps.Geocoder();
    });
  }

  ngOnInit() {

  }

  onClickLocation(event: any) {

    ////////////YOU SHOULD DELETE THIS AFTER GETTING THE API KEY///////////////
    if(!this.disabled){
      this.map = new MapModel();
      this.map.latitude = event.coords.lat;
      this.map.longitude = event.coords.lng;

    }
    ///////////////////////////////////////////////////////////////////////////

    // if (!this.disabled) {
    //
    //   this.geocoder.geocode({
    //     'location': {
    //       lat: event.coords.lat,
    //       lng: event.coords.lng
    //     }
    //   }, (results : any) => {
    //
    //     let countryName : string = this.getCountryName(results);
    //
    //     if(countryName === "Saudi Arabia" || countryName === "السعودية"){
    //
    //       this.map = new MapModel();
    //       this.map.latitude = event.coords.lat;
    //       this.map.longitude = event.coords.lng;
    //
    //     }else {
    //
    //       this.modalService.open(this.outSideOfSaudiArabia, {size: 'sm', centered: true});
    //     }
    //   });
    //
    // }
  }

  getCountryName(results : any) : string{

    if(results.length){
      if(results[results.length-1].formatted_address){
        return (results[results.length-1].formatted_address) as string;
      }
    }
    return "";
  }

}
