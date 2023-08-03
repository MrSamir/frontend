import {Component, Input,EventEmitter,Output, OnInit, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { WizardComponent } from 'angular-archwizard';
import { EnumValidation } from 'projects/core-lib/src/public-api';
import { DateFormatterService } from 'projects/shared-features-lib/src/lib/components/ng-bootstrap-hijri-gregorian-datepicker/date-formatter.service';
import { CreateWaqfInputDto } from '../../models/CreateWaqfInputDto';
import { LookupService } from '../../models/lookup.service';
import { LookupModel } from '../../models/LookupModel';
import { InputEndowmentDto } from '../../services/services-proxies/service-proxies';
// import {WizardComponent} from "angular-archwizard";
// import {NgForm} from "@angular/forms";
// import {
//   CreateWaqfInputDto,
//   EditWaqfInputDto,
//   RegisterWaqfRequestServiceProxy, ServiceResponseOfCreateWaqfOutputDto,ServiceResponseOfGetRegisterWaqfDataByIdOutputDto
// } from "@app/services/services-proxies/service-proxies";
// import {EnumValidation} from "@app/enum/EnumValidation";
// import {LookupModel} from "@app/model/LookupModel";
// import {LookupService, ReverseLookupMap} from "@app/services/lookup/lookup.service";
 
// import {MapModel} from "@app/_shared/map/map.model";
// import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
// import {hijriDateExtensions} from "@app/lib/core/hijri-date-extensions";
// import {handleError, handleServiceProxyError, showSuccess} from "@app/services/alert/alert.service";
//  import { ServiceRequestTypeEnum } from '@app/enum/requestType.enum';

 

@Component({
  selector: 'app-endowment-info-edit',
  templateUrl: './endowment-info-edit.component.html',
  styleUrls: ['./endowment-info-edit.component.css']
})
export class EndowmentInfoEditComponent implements OnInit {
   @Input() public IsCreate: boolean=true;
   @Input() createWaqfInputDto: CreateWaqfInputDto;
   @Input() InputEndowmentDto: InputEndowmentDto;
   

   @Input()   cityLookup: LookupModel[] = [];
   @Input()  deedCitiesLookup: LookupModel[] = [];
 @Input() public wizard: WizardComponent;
  // @Input() map: MapModel = new MapModel() ;
   @Output() _createWaqfInputDto = new EventEmitter<CreateWaqfInputDto>();
 
   @Input() IsDeedDisabled :boolean=false;
  @Output() onNewWaqfRegistered = new EventEmitter<string>();
   @ViewChild(NgForm,{static:false}) form:NgForm;


  ePatternValidation = EnumValidation;


  // citiLookupsReverseMap: ReverseLookupMap = new ReverseLookupMap([]);


  // deedCitiesReverseMapLookup: ReverseLookupMap = new ReverseLookupMap([]);




  minHijriForWaqf: NgbDateStruct = {year: 1, month: 1, day: 1};
  minDeedDate: NgbDateStruct = {year: 912, month: 8, day: 22};
  maxDeedDate: NgbDateStruct = {year: 912, month: 8, day: 22};

   waqfInitialDate: NgbDateStruct;
   deedDate: NgbDateStruct;
   oldDeedAttachmentId: string;

   constructor(
    public lookupService: LookupService,
private dateHelper: DateFormatterService,
  //             //private registerWaqfServiceProxy: RegisterWaqfRequestServiceProxy
              )
               {}

  ngOnInit(): void {
    this.init();
  }

  init() {

    // if (!this.requestId || !!this.waqfInitialDate) {
    //   return;
    // }

    this.setDateLimits();
   
    this.lookupService.fetchWaqfTypeLookups();
    this.lookupService.fetchAwjuhElsarfLookups();
    this.lookupService.fetchRegionsLookups();

    this.lookupService.fetchIssuanceCourtLookups();

   if (this.createWaqfInputDto) {


    if (!!this.createWaqfInputDto.waqfInitialDate) {
      //this.waqfInitialDate = hijriDateExtensions.parseHijriString(this.createWaqfInputDto.waqfInitialDate);
    }
    else {
      this.createWaqfInputDto.waqfInitialDate = `${this.waqfInitialDate.year}/${this.waqfInitialDate.month}/${this.waqfInitialDate.day}`
      this.createWaqfInputDto.acceptDonations = false;
      this.createWaqfInputDto.acceptGiveaways = false;
    }

    if (!!this.createWaqfInputDto.deedDate) {
      //this.deedDate = hijriDateExtensions.parseHijriString(this.createWaqfInputDto.deedDate);
    }

    else {
      this.createWaqfInputDto.deedDate = `${this.deedDate.year}/${this.deedDate.month}/${this.deedDate.day}`
    }
  }
 
  }

  ngOnChanges() {
    this.init();

  }

  // onWaqfDateChange(date: NgbDateStruct) {

  //   if (!!date) {
  //     this.createWaqfInputDto.waqfInitialDate = `${date.year}/${date.month}/${date.day}`;
  //   }
  //   else if (date==undefined)
  //   {
  //     this.createWaqfInputDto.waqfInitialDate =undefined;
  //   }
  // }

  // onSakDateChange(date: NgbDateStruct) {
  //   if (!!date) {
  //     this.createWaqfInputDto.deedDate = `${date.year}/${date.month}/${date.day}`;
  //   }
  //   else if (date==undefined)
  //   {
  //     this.createWaqfInputDto.deedDate =undefined;
  //   }
  // }

  private setDateLimits() {
    this.minDeedDate = {year: 100, month: 1, day: 1};
    //this.maxDeedDate = this.dateHelper.GetTodayHijri();

    //this.deedDate = this.dateHelper.GetTodayHijri();
    //this.waqfInitialDate = this.dateHelper.GetTodayHijri();
    this.minHijriForWaqf = {year: 100, month: 1, day: 1};
  }

  // private setOptionsDefaultValues()
  // {
  //   this.createWaqfInputDto = new CreateWaqfInputDto();
  //   this.createWaqfInputDto.acceptDonations=false;
  //   this.createWaqfInputDto.acceptGiveaways=false;
  // }
  // onChangeMap() {
  //   if (this.map && this.map.longitude && this.map.latitude) {

  //     this.createWaqfInputDto.longitude = this.map.longitude;
  //     this.createWaqfInputDto.latitude = this.map.latitude;
  //   }
  // }
 
  getcityLookup(value: number, updateCity: boolean = false) {
    // this.lookupService.getCityByRegionID(value).subscribe((res: LookupModel[]) => {
    //   this.cityLookup = res;
    //   this.citiLookupsReverseMap = new ReverseLookupMap(this.cityLookup);
    //   if( updateCity ) {
    //     this.createWaqfInputDto.cityId = res[0].value;
    //   }
    // });
  }

   onNewDeedRegionSelected(newDeedRegionId: number, updateCity: boolean = false) {
  //   // this.lookupService.getCityByRegionID(newDeedRegionId).subscribe(
  //   //   (cities: LookupModel[]) => {
  //   //     this.deedCitiesLookup = cities;
  //   //     this.deedCitiesReverseMapLookup.rebuild(this.deedCitiesLookup);
  //   //     if( updateCity ) {
  //   //       this.createWaqfInputDto.deedCityId = cities[0].value;
  //   //     }
  //   //   },
  //   //   error => handleError<LookupModel[]>(error.error)
  //   // );
   }

   changewagafType(event: any) {
   
   }
  // loadHints()
  // {
   
  // }

  // mapNotSelectedYet() {
  //   return !this.createWaqfInputDto.longitude ||
  //     !this.createWaqfInputDto.latitude ||
  //     !this.createWaqfInputDto.deedAttachmentId;
  // }

   get navigationButtonsDisabled() {
return;
  //   return this.form?.invalid || this.mapNotSelectedYet() || !this.createWaqfInputDto.waqfInitialDate|| !this.createWaqfInputDto.deedDate ;
  }
  get requestType() {
     return null;//ServiceRequestTypeEnum;
  }


  onBackBtnClicked() {
    this.wizard.goToPreviousStep();
  }

   onNextBtnClicked() {
  //   if (this.IsCreate) {
  //     this._createWaqfInputDto.emit(this.createWaqfInputDto);
  //     this.onNewWaqfRegistered.emit(this.createWaqfInputDto.waqfTypeId.toString());
  //   }
  //   else
  //   {
  //     this._editWaqfInputDto.emit(this.createWaqfInputDto);
  //     this.onNewWaqfRegistered.emit(this.createWaqfInputDto.waqfTypeId.toString());


  //   }

 
   }


 

}
