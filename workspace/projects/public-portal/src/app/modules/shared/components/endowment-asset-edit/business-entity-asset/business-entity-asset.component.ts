import { Component, Input, Output } from '@angular/core';
import {
  EndowmentRegistrationServiceProxy,
  InputAssetDto,
  InputBusinessEntityAssetDto,
  InputLookUpDto,
  LookupApplicationServiceProxy,
  LookupDto,
  LookupExtraData,
} from '../../../services/services-proxies/service-proxies';
import { MapModel } from '../../map/map.model';
import { EnumValidation } from 'projects/core-lib/src/lib/enums/EnumValidation';
import { ServiceRequestTypeEnum } from '../../../models/ServiceRequestTypeEnum';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-shared-business-entity-asset',
  templateUrl: './business-entity-asset.component.html',
  styleUrls: ['./business-entity-asset.component.css'],
})
export class BusinessEntityAssetComponent {
  @Input() @Output() assetInfoModel: InputAssetDto;
  @Input() AssetTypeId: number;
  @Input() viewOnly: boolean;
  // regionLookup: LookupModel[];
  // cityLookup: LookupModel[];
  // assetSubTypes: LookupModel[];

  lookupfliter: InputLookUpDto = new InputLookUpDto();
  regionLookup: LookupDto[] = [];
  cityLookup: LookupDto[] = [];
  assetSubTypes: LookupDto[] = [];
  _lookupExtraData: LookupExtraData;

  map: MapModel = new MapModel();
  resolveLookup: any;
  ePatternValidation: typeof EnumValidation = EnumValidation;
  // hint key
  //registrationDocumentNumberhint: HintEntry;
  //cityDisabled = true;
  cityDisabled = false;
  combinedPattern: RegExp;

  constructor(
    private registerWaqfServiceProxy: EndowmentRegistrationServiceProxy,
    private modalService: NgbModal,
    private lookupssrv: LookupApplicationServiceProxy /*, private utilityService: UtilityService*/
  ) {
    //this.resolveLookup = this.utilityService.resolveLookup;
  }

  ngOnInit() {
    const patternDecimalValues =
      /^([0-9]{1,10})$|^([0-9]{1,10})(\.)[0-9]{1,4}$/;
    const patternWaqfResponserPortion =
      /^[1-9][0-9]?[0-9]?[0-9]?[0-9]?[0-9]?[0-9]?[0-9]?[0-9]?$/;
    this.combinedPattern = new RegExp(
      `${patternDecimalValues.source}|${patternWaqfResponserPortion.source}`
    );

    //this.combinedPattern = EnumValidation.pattern_CombinedWaqfResponserPortion; //new RegExp(`${EnumValidation.pattern_decimal_values} +"|"+ ${EnumValidation.pattern_WaqfResponserPortion}`);

    if (this.assetInfoModel.businessEntityAsset == undefined) {
      this.assetInfoModel.businessEntityAsset =
        new InputBusinessEntityAssetDto();
    } else {
      this.map.latitude = this.assetInfoModel.businessEntityAsset.latitude;
      this.map.longitude = this.assetInfoModel.businessEntityAsset.longitude;
    }

    this.lookupfliter.lookUpName = 'Region';
    this.lookupfliter.filters = [];
    this.lookupssrv.getAllLookups(this.lookupfliter).subscribe((data) => {
      this.regionLookup = data.dto.items!;
      console.log(data);
    });

    this.lookupfliter.lookUpName = 'City';
    this.lookupfliter.filters = [];
    this.lookupssrv.getAllLookups(this.lookupfliter).subscribe((data) => {
      this.cityLookup = data.dto.items!;
      console.log(data);
    });

    this._lookupExtraData.dataName = 'AssetTypeId';
    this._lookupExtraData.dataValue = this.AssetTypeId.toString();
    this.lookupfliter.lookUpName = 'AssetSubType';
    this.lookupfliter.filters = [this._lookupExtraData];

    this.lookupssrv.getAllLookups(this.lookupfliter).subscribe((data) => {
      this.assetSubTypes = data.dto.items!;
      console.log(data);
    });
    // this.lookupService.getLookupValues(EnumLookuptypes.RegionLookup).subscribe((res: any) => {
    //   res.subscribe((res: any[]) => {
    //     this.regionLookup = res;
    //   });
    // });

    // this.lookupService.getLookupValues(EnumLookuptypes.CityLookup).subscribe((res) => {
    //   res.subscribe((res) => {
    //     this.cityLookup = res;
    //   });
    // });
    // this.lookupService.getAssetSubTypeByAssetTypeId(this.AssetTypeId).subscribe((result) => {
    //   result.subscribe((assetsSubTypes: LookupModel[]) => {
    //     this.assetSubTypes = assetsSubTypes;
    //   });
    // });
    // this.loadHints();
  }
  getcityLookup(value: any) {
    this._lookupExtraData.dataName = 'regionId';
    this._lookupExtraData.dataValue = value.toString();
    this.lookupfliter.lookUpName = 'City';
    this.lookupfliter.filters = [this._lookupExtraData];

    this.lookupssrv.getAllLookups(this.lookupfliter).subscribe((data) => {
      this.cityLookup = data.dto.items!;
      console.log(data);
    });
  }
  onChangeMap() {
    if (this.map && this.map.longitude && this.map.latitude) {
      this.assetInfoModel.businessEntityAsset.longitude = this.map.longitude;
      this.assetInfoModel.businessEntityAsset.latitude = this.map.latitude;
    }
  }

  mapNotSelectedYet() {
    return !this.map.longitude || !this.map.latitude;
  }

  loadHints() {
    //this.registrationDocumentNumberhint = HintDictionary.getHintByKey("businessAsset.registrationDocumentNumber");
  }

  ChangeCityLookup(value: any) {
    if (value == 'null' || value == undefined) {
      this.assetInfoModel.businessEntityAsset.cityId = -1;
    }
  }
  get requestType() {
    return ServiceRequestTypeEnum;
  }
}
