import { ApiException, EndowmentRegistrationServiceProxy, InputLookUpDto, LookupApplicationServiceProxy, LookupDto, LookupExtraData } from './../../services/services-proxies/service-proxies';
import {Component, Input,EventEmitter,Output, OnInit, ViewChild, Injector} from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { WizardComponent } from 'angular-archwizard';
import { EnumValidation } from 'projects/core-lib/src/public-api';
import { DateFormatterService } from 'projects/shared-features-lib/src/lib/components/ng-bootstrap-hijri-gregorian-datepicker/date-formatter.service';


import { InputEndowmentDto } from '../../services/services-proxies/service-proxies';
import { hijriDateExtensions } from '../../models/hijri-date-extensions';
import { ApiResponse } from 'projects/core-lib/src/lib/models/apiResponse';
import { ComponentBase } from 'projects/core-lib/src/lib/components/ComponentBase/ComponentBase.component';


@Component({
  selector: 'app-endowment-info-edit',
  templateUrl: './endowment-info-edit.component.html',
  styleUrls: ['./endowment-info-edit.component.css']
})
export class EndowmentInfoEditComponent extends ComponentBase  implements OnInit  {
   @Input() public IsCreate: boolean=true;
   @Input() InputEndowmentDto: InputEndowmentDto=new InputEndowmentDto();

   @Input() public wizard: WizardComponent;
   @Output() _InputEndowmentDto = new EventEmitter<InputEndowmentDto>();
   @Input() IsDeedDisabled :boolean=false;
   @Output() onNewWaqfRegistered = new EventEmitter<string>();
   @ViewChild(NgForm,{static:false}) form:NgForm;
   ePatternValidation = EnumValidation;
   lookupfliter:InputLookUpDto=new InputLookUpDto();
   spendingCategoriesLookup:LookupDto[] | undefined=[] ;
   EndowmentTypeLookup:LookupDto[] | undefined =[];
   RegioneLookup:LookupDto[] | undefined =[];
CityLookup:LookupDto[] | undefined =[];
IssuanceCourtsLookup:LookupDto[] | undefined =[];
   
   _lookupExtraData:   LookupExtraData=new LookupExtraData();





  minHijriForWaqf: NgbDateStruct = {year: 1, month: 1, day: 1};
  minDeedDate: NgbDateStruct = {year: 912, month: 8, day: 22};
  maxDeedDate: NgbDateStruct = {year: 912, month: 8, day: 22};

  endowmentInitialDate: NgbDateStruct;
  endowmentDeedDate: NgbDateStruct;
   oldDeedAttachmentId: string;

   constructor(injector: Injector,
 
private dateHelper: DateFormatterService,
           private registerWaqfServiceProxy: EndowmentRegistrationServiceProxy,
           private lookupssrv:LookupApplicationServiceProxy
           
              ) 
               {
super(injector);

               }

  ngOnInit(): void {

    this.init();
  }

  LoadSpendingCategories()
  {
    this.lookupfliter.lookUpName="SpendingCategory";
    this.lookupfliter.filters=[];
    this.lookupssrv.getAllLookups(this.lookupfliter).subscribe(
  (data ) => {
    this.spendingCategoriesLookup=data.dto!.items;
    console.log(data);
    this.LoadEndowmentType();
  },
);

  }


  LoadEndowmentType()
  {
    this.lookupfliter.lookUpName="EndowmentType";
    this.lookupfliter.filters=[];
    this.lookupssrv.getAllLookups(this.lookupfliter).subscribe(
  (data) => {
    this.EndowmentTypeLookup=data.dto!.items;
    console.log(data);
    this.  LoadRegion();

  }
);

  }



  LoadRegion()
  {
    this.lookupfliter.lookUpName="Region";
    this.lookupfliter.filters=[];
    this.lookupssrv.getAllLookups(this.lookupfliter).subscribe(
  (data) => {
    this.RegioneLookup=data.dto!.items;
    console.log(data);
    this.  LoadIssuanceCourt();
  }
);

  }


  LoadCitiesByRegion(RegionId:number)
  {
    this._lookupExtraData.dataName="RegionId"
    this._lookupExtraData.dataValue=RegionId.toString();
    this.lookupfliter.lookUpName="City";
    this.lookupfliter.filters=[this._lookupExtraData];
    this.lookupssrv.getAllLookups(this.lookupfliter).subscribe(
  (data) => {
    this.CityLookup=data.dto!.items;
    console.log(data);




  }
);

  }


  LoadIssuanceCourt()
  {

    this.lookupfliter.lookUpName="IssuanceCourt";
    this.lookupfliter.filters=[];
    this.lookupssrv.getAllLookups(this.lookupfliter).subscribe(
  (data) => {
    this.IssuanceCourtsLookup=data.dto!.items;
    console.log(data);

  }
);

  }
  init() {

    // if (!this.requestId || !!this.endowmentInitialDate) {
    //   return;
    // }

 this.LoadSpendingCategories();


    this.setDateLimits();





   /* if (this.InputEndowmentDto) {

    debugger;
    if (!!this.InputEndowmentDto?.endowmentInitialDate) {
       this.endowmentInitialDate = hijriDateExtensions.parseHijriString(this.InputEndowmentDto.endowmentInitialDate);
    }
    else {
      this.InputEndowmentDto.endowmentInitialDate = `${this.endowmentInitialDate.year}/${this.endowmentInitialDate.month}/${this.endowmentInitialDate.day}`
      this.InputEndowmentDto.acceptDonations = false;
      this.InputEndowmentDto.acceptGiveaways = false;
    }

    if (!!this.InputEndowmentDto.endowmentDeedDate) {
       //this.deedDate = hijriDateExtensions.parseHijriString(this.InputEndowmentDto.endowmentDeedDate);
    }

    else {
     // this.InputEndowmentDto.endowmentDeedDate = `${this.endowmentDeedDate.year}/${this.endowmentDeedDate.month}/${this.endowmentDeedDate.day}`
    }
  } */

  }

  ngOnChanges() {
    this.init();

  }

  // onWaqfDateChange(date: NgbDateStruct) {

  //   if (!!date) {
  //     this.InputEndowmentDto.endowmentInitialDate = `${date.year}/${date.month}/${date.day}`;
  //   }
  //   else if (date==undefined)
  //   {
  //     this.InputEndowmentDto.endowmentInitialDate =undefined;
  //   }
  // }

  // onSakDateChange(date: NgbDateStruct) {
  //   if (!!date) {
  //     this.InputEndowmentDto.deedDate = `${date.year}/${date.month}/${date.day}`;
  //   }
  //   else if (date==undefined)
  //   {
  //     this.InputEndowmentDto.deedDate =undefined;
  //   }
  // }

  private setDateLimits() {
    this.minDeedDate = {year: 100, month: 1, day: 1};
    //this.maxDeedDate = this.dateHelper.GetTodayHijri();

    //this.deedDate = this.dateHelper.GetTodayHijri();
    //this.endowmentInitialDate = this.dateHelper.GetTodayHijri();
    this.minHijriForWaqf = {year: 100, month: 1, day: 1};
  }

  // private setOptionsDefaultValues()
  // {
  //   this.InputEndowmentDto = new InputEndowmentDto();
  //   this.InputEndowmentDto.acceptDonations=false;
  //   this.InputEndowmentDto.acceptGiveaways=false;
  // }
  // onChangeMap() {
  //   if (this.map && this.map.longitude && this.map.latitude) {

  //     this.InputEndowmentDto.longitude = this.map.longitude;
  //     this.InputEndowmentDto.latitude = this.map.latitude;
  //   }
  // }

   changewagafType(event: any) {

   }
  // loadHints()
  // {

  // }


   get navigationButtonsDisabled() {
return;
  //   return this.form?.invalid || this.mapNotSelectedYet() || !this.InputEndowmentDto.endowmentInitialDate|| !this.InputEndowmentDto.deedDate ;
  }
  get requestType() {
     return null;//ServiceRequestTypeEnum;
  }


  onBackBtnClicked() {
    this.wizard.goToPreviousStep();
  }

   onNextBtnClicked() {
    // if (this.IsCreate) {
    //   this._InputEndowmentDto.emit(this.InputEndowmentDto);
    //   this.onNewWaqfRegistered.emit(this.InputEndowmentDto.waqfTypeId.toString());
    // }
    // else
    // {
    //   this._editWaqfInputDto.emit(this.InputEndowmentDto);
    //   this.onNewWaqfRegistered.emit(this.InputEndowmentDto.waqfTypeId.toString());


    // }
this.createOrEditWaqf();

  }

  createOrEditWaqf() {
    debugger;
    //this._editWaqfInputDto.requestId = this.requestId;
    //this.createWaqfInputDto.isDeedAttachmentChanged = (this.createWaqfInputDto != undefined && this.oldDeedAttachmentId != this.createWaqfInputDto.deedAttachmentId);
    this.InputEndowmentDto.deedNotes="";
    this.InputEndowmentDto.endowmentDeedDateHijri="";
    this.InputEndowmentDto.endowmentInitialDate="";
    this.InputEndowmentDto.seerRules="";
    this.InputEndowmentDto.endowmentDeedTypeName="";
    this.InputEndowmentDto.endowmentDeedStatusName="";
    this.InputEndowmentDto.requestId=    "2106622f-f9fd-4bc3-874d-08db0a91fca1";





    this.registerWaqfServiceProxy.createEndowment(this.InputEndowmentDto).subscribe(
        (res: any) => {
          this.wizard.goToNextStep()
         // showSuccess(res.message, () => );
        }, 
        )
      
      }




}
