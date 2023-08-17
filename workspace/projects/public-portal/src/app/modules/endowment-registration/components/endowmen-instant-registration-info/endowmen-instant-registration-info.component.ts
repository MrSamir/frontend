import { Component, Input, OnInit } from '@angular/core';
import { ApiResponseOfOutputEndowmentDetailsDto, EndowmentRegistrationServiceProxy, InputLookUpDto, LookupApplicationServiceProxy, LookupExtraData, OutputEndowmentDetailsDto } from '../../../shared/services/services-proxies/service-proxies';
import { DateFormatterService } from 'projects/shared-features-lib/src/lib/components/ng-bootstrap-hijri-gregorian-datepicker/date-formatter.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { EnumValidation } from 'projects/core-lib/src/public-api';
import { ApiResponse } from 'projects/core-lib/src/lib/models/apiResponse';

@Component({
  selector: 'app-endowmen-instant-registration-info',
  templateUrl: './endowmen-instant-registration-info.component.html',
  styleUrls: ['./endowmen-instant-registration-info.component.css']
})
export class EndowmenInstantRegistrationInfoComponent   implements OnInit{

  @Input() public requestId: string;
  IsDeedDisabled :boolean=true;
  endowmentDetails:OutputEndowmentDetailsDto;
  ePatternValidation = EnumValidation;
  lookupfliter: InputLookUpDto = new InputLookUpDto();
  spendingCategoriesLookup: any = [];
  EndowmentTypeLookup: any = [];
  RegioneLookup: any = [];
  CityLookup: any = [];
  IssuanceCourtsLookup: any = [];
 _lookupExtraData: LookupExtraData = new LookupExtraData();
  minHijriForWaqf: NgbDateStruct = { year: 1, month: 1, day: 1 };
  minDeedDate: NgbDateStruct = { year: 912, month: 8, day: 22 };
  maxDeedDate: NgbDateStruct = { year: 912, month: 8, day: 22 };
  endowmentInitialDate: NgbDateStruct;
  endowmentDeedDate: NgbDateStruct;
  oldDeedAttachmentId: string;

  constructor(private dateHelper: DateFormatterService,private registerWaqfServiceProxy: EndowmentRegistrationServiceProxy,
    private lookupssrv:LookupApplicationServiceProxy){}

    ngOnInit(): void {
      this.requestId='06EC682A-9455-476C-94EF-17190CBA3C99'
      this.init();
    }

  init() {
    if (!this.requestId || !!this.endowmentInitialDate) {
      return;
    }

    this.LoadSpendingCategories();
    this.setDateLimits();
    this.fetchRequestWaqfData();
  }

  fetchRequestWaqfData() {
    this.registerWaqfServiceProxy.getEndowmentDataByRequestId(this.requestId)
      .subscribe(
        (res: ApiResponseOfOutputEndowmentDetailsDto ) => {
          this.endowmentDetails = res.dto;
           //this.getcityLookup(this.waqfInfo.regionId);
          // this.onNewDeedRegionSelected(this.waqfInfo.deedRegionId);
          // if(this.waqfInfo.waqfInitialDate && this.waqfInfo.waqfInitialDate!="") {
          //   this.waqfDate = hijriDateExtensions.parseHijriString(this.waqfInfo.waqfInitialDate);
          // }
          // if(this.waqfInfo.deedDate && this.waqfInfo.deedDate!="") {
          //   this.sakDate = hijriDateExtensions.parseHijriString(this.waqfInfo.deedDate);
          // }

          // this.map.longitude = this.waqfInfo.longitude;
          // this.map.latitude = this.waqfInfo.latitude;
          // this.map.longitude= this.waqfInfo.longitude;
          // this.map.latitude= this.waqfInfo.latitude;
        },
        // (apiException: ApiException) => {
        //   handleServiceProxyError(apiException);
        // }
      );
  }

  LoadSpendingCategories() {
    this.lookupfliter.lookUpName = "SpendingCategory";
    this.lookupfliter.filters = [];
    this.lookupssrv.getAllLookups(this.lookupfliter).subscribe(
      (data) => {
        this.spendingCategoriesLookup = data.dto.items;
        console.log(data);
        this.LoadEndowmentType();
      },
    );

  }

  LoadEndowmentType() {
    this.lookupfliter.lookUpName = "EndowmentType";
    this.lookupfliter.filters = [];
    this.lookupssrv.getAllLookups(this.lookupfliter).subscribe(
      (data) => {
        this.EndowmentTypeLookup = data.dto.items;
        console.log(data);
        this.LoadRegion();

      }
    );

  }

  LoadRegion() {
    this.lookupfliter.lookUpName = "Region";
    this.lookupfliter.filters = [];
    this.lookupssrv.getAllLookups(this.lookupfliter).subscribe(
      (data) => {
        this.RegioneLookup = data.dto.items;
        console.log(data);
        this.LoadIssuanceCourt();
      }
    );
  }

  LoadCitiesByRegion(RegionId: number) {
    this._lookupExtraData.dataName = "RegionId"
    this._lookupExtraData.dataValue = RegionId.toString();
    this.lookupfliter.lookUpName = "City";
    this.lookupfliter.filters = [this._lookupExtraData];
    this.lookupssrv.getAllLookups(this.lookupfliter).subscribe(
      (data) => {
        this.CityLookup = data.dto.items;
        console.log(data);
      }
    );

  }

  LoadIssuanceCourt() {
    this.lookupfliter.lookUpName = "IssuanceCourt";
    this.lookupfliter.filters = [];
    this.lookupssrv.getAllLookups(this.lookupfliter).subscribe(
      (data) => {
        this.IssuanceCourtsLookup = data.dto.items;
        console.log(data);
      }
    );
  }


  private setDateLimits() {
    this.minDeedDate = {year: 100, month: 1, day: 1};
    this.minHijriForWaqf = {year: 100, month: 1, day: 1};
  }

}
