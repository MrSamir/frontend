import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { EnumValidation } from 'projects/core-lib/src/public-api';
 

@Component({
  selector: 'app-endowment-info-edit',
  templateUrl: './endowment-info-edit.component.html',
  styleUrls: ['./endowment-info-edit.component.css']
})
export class EndowmentInfoEditComponent implements OnInit {
  
 constructor(
  // public lookupService: LookupService,
  //             private dateHelper: DateFormatterService,
  //             private registerWaqfServiceProxy: RegisterWaqfRequestServiceProxy
              
              ) {
  }

  ngOnInit(): void {
    //this.init();
  }




  // @Input() public IsCreate: boolean=true;
  // @Input() createWaqfInputDto: CreateWaqfInputDto;
  // @Input() editWaqfInputDto: EditWaqfInputDto;
  // @Input()   cityLookup: LookupModel[] = [];
  // @Input()  deedCitiesLookup: LookupModel[] = [];
  // @Input() public wizard: WizardComponent;
  // @Input() map: MapModel = new MapModel() ;
  // @Output() _createWaqfInputDto = new EventEmitter<CreateWaqfInputDto>();
  // @Output() _editWaqfInputDto = new EventEmitter<EditWaqfInputDto>();
  // @Input() IsDeedDisabled :boolean=false;
  // @Output() onNewWaqfRegistered = new EventEmitter<string>();
  // @ViewChild(NgForm,{static:false}) form:NgForm;


  // ePatternValidation = EnumValidation;


  // citiLookupsReverseMap: ReverseLookupMap = new ReverseLookupMap([]);


  // deedCitiesReverseMapLookup: ReverseLookupMap = new ReverseLookupMap([]);

  // //hints variables
  // wagftypehint:HintEntry;
  // revenuehint:HintEntry;
  // waqfDeedFilehint:HintEntry;
  // //--------------//


  // minHijriForWaqf: NgbDateStruct = {year: 1, month: 1, day: 1};
  // minDeedDate: NgbDateStruct = {year: 912, month: 8, day: 22};
  // maxDeedDate: NgbDateStruct = {year: 912, month: 8, day: 22};

  // waqfInitialDate: NgbDateStruct;
  // deedDate: NgbDateStruct;
  // oldDeedAttachmentId: string;

 

  // init() {

  //   // if (!this.requestId || !!this.waqfInitialDate) {
  //   //   return;
  //   // }

  //   this.setDateLimits();
  //   this.loadHints();
  //   this.lookupService.fetchWaqfTypeLookups();
  //   this.lookupService.fetchAwjuhElsarfLookups();
  //   this.lookupService.fetchRegionsLookups();

  //   this.lookupService.fetchIssuanceCourtLookups();

  //  if (this.createWaqfInputDto) {


  //   if (!!this.createWaqfInputDto.waqfInitialDate) {
  //     this.waqfInitialDate = hijriDateExtensions.parseHijriString(this.createWaqfInputDto.waqfInitialDate);
  //   }
  //   else {
  //     this.createWaqfInputDto.waqfInitialDate = `${this.waqfInitialDate.year}/${this.waqfInitialDate.month}/${this.waqfInitialDate.day}`
  //     this.createWaqfInputDto.acceptDonations = false;
  //     this.createWaqfInputDto.acceptGiveaways = false;
  //   }

  //   if (!!this.createWaqfInputDto.deedDate) {
  //     this.deedDate = hijriDateExtensions.parseHijriString(this.createWaqfInputDto.deedDate);
  //   }

  //   else {
  //     this.createWaqfInputDto.deedDate = `${this.deedDate.year}/${this.deedDate.month}/${this.deedDate.day}`
  //   }
  // }
  //   //this.fetchRequestWaqfData();
  // }

  // ngOnChanges() {
  //   this.init();

  // }

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

  // private setDateLimits() {
  //   this.minDeedDate = {year: 100, month: 1, day: 1};
  //   this.maxDeedDate = this.dateHelper.GetTodayHijri();

  //   this.deedDate = this.dateHelper.GetTodayHijri();
  //   this.waqfInitialDate = this.dateHelper.GetTodayHijri();
  //   this.minHijriForWaqf = {year: 100, month: 1, day: 1};
  // }

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
 

  // getcityLookup(value: number, updateCity: boolean = false) {
  //   this.lookupService.getCityByRegionID(value).subscribe((res: LookupModel[]) => {
  //     this.cityLookup = res;
  //     this.citiLookupsReverseMap = new ReverseLookupMap(this.cityLookup);
  //     if( updateCity ) {
  //       this.createWaqfInputDto.cityId = res[0].value;
  //     }
  //   });
  // }

  // onNewDeedRegionSelected(newDeedRegionId: number, updateCity: boolean = false) {
  //   this.lookupService.getCityByRegionID(newDeedRegionId).subscribe(
  //     (cities: LookupModel[]) => {
  //       this.deedCitiesLookup = cities;
  //       this.deedCitiesReverseMapLookup.rebuild(this.deedCitiesLookup);
  //       if( updateCity ) {
  //         this.createWaqfInputDto.deedCityId = cities[0].value;
  //       }
  //     },
  //     error => handleError<LookupModel[]>(error.error)
  //   );
  // }

  // changewagafType(event: any) {
    
  // }
  // loadHints()
  // {
  //   // waqftype
     
  // }

  // mapNotSelectedYet() {
  //   return !this.createWaqfInputDto.longitude ||
  //     !this.createWaqfInputDto.latitude ||
  //     !this.createWaqfInputDto.deedAttachmentId;
  // }

  // get navigationButtonsDisabled() {

  //   return this.form?.invalid || this.mapNotSelectedYet() || !this.createWaqfInputDto.waqfInitialDate|| !this.createWaqfInputDto.deedDate ;
  // }
  // get requestType() {
  //   return ServiceRequestTypeEnum;
  // }


  // onBackBtnClicked() {
  //   this.wizard.goToPreviousStep();
  // }

  // onNextBtnClicked() {
  //   if (this.IsCreate) {
  //     this._createWaqfInputDto.emit(this.createWaqfInputDto);
  //     this.onNewWaqfRegistered.emit(this.createWaqfInputDto.waqfTypeId.toString());
  //   }
  //   else
  //   {
  //     this._editWaqfInputDto.emit(this.createWaqfInputDto);
  //     this.onNewWaqfRegistered.emit(this.createWaqfInputDto.waqfTypeId.toString());


  //   }

   
  // }

 

}

