import { Component, Input, Output } from '@angular/core';
import { EnumValidation } from 'projects/core-lib/src/lib/enums/EnumValidation';
import { EndowmentRegistrationServiceProxy, InputAssetDto, InputLookUpDto, InputRealEstateAssetDto, LookupApplicationServiceProxy, LookupDto,LookupExtraData } from '../../../services/services-proxies/service-proxies';
import { LookupModel } from '../../../models/LookupModel';
import { MapModel } from '../../map/map.model';
import { EnumLookuptypes } from '../../../models/EnumLookuptypes';
import { ServiceRequestTypeEnum } from '../../../models/ServiceRequestTypeEnum';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-shared-realestate-asset',
  templateUrl: './realestate-asset.component.html',
  styleUrls: ['./realestate-asset.component.css']
})
export class RealestateAssetComponent {


@Input() @Output() assetInfoModel:InputAssetDto;
@Input() AssetTypeId:number;
@Input() viewOnly:boolean;
lookupfliter:InputLookUpDto=new InputLookUpDto();
regionLookup:LookupDto[]=[];
cityLookup:LookupDto[]=[];
assetSubTypes:LookupDto[]=[];
_lookupExtraData:LookupExtraData;
map: MapModel = new MapModel() ;
resolveLookup:any;
ePatternValidation: typeof EnumValidation = EnumValidation;
cityDisabled=true;
// hint key
//estimatedValuehint:HintEntry;

constructor(private lookupssrv:LookupApplicationServiceProxy,private modalService: NgbModal,
  private registerWaqfServiceProxy: EndowmentRegistrationServiceProxy)
  {
    //this.resolveLookup = this.utilityService.resolveLookup;
  }

 ngOnInit() {
  if(this.assetInfoModel.realEstateAsset==undefined)
  this.assetInfoModel.realEstateAsset = new InputRealEstateAssetDto();
  else
  {
    this.map.latitude= this.assetInfoModel.realEstateAsset.latitude;
    this.map.longitude=this.assetInfoModel.realEstateAsset.longitude;
  }

  this.lookupfliter.lookUpName = "Region";
    this.lookupfliter.filters = [];
    this.lookupssrv.getAllLookups(this.lookupfliter).subscribe(
      (data) => {
        this.regionLookup = data.dto.items!;
        console.log(data);
      });

  this.lookupfliter.lookUpName = "City";
    this.lookupfliter.filters = [];
    this.lookupssrv.getAllLookups(this.lookupfliter).subscribe(
      (data) => {
        this.cityLookup = data.dto.items!;
        console.log(data);
      });

   this._lookupExtraData.dataName = "AssetTypeId"
   this._lookupExtraData.dataValue = this.AssetTypeId.toString();
   this.lookupfliter.lookUpName = "AssetSubType";
   this.lookupfliter.filters = [this._lookupExtraData];

   this.lookupssrv.getAllLookups(this.lookupfliter).subscribe(
    (data) => {
      this.assetSubTypes=data.dto.items!;
      console.log(data);
    }  
  );
  //  this.lookupService.getAssetSubTypeByAssetTypeId(this.AssetTypeId).subscribe((result) => {
  //    result.subscribe((assetsSubTypes: LookupModel[]) => {
  //      this.assetSubTypes = assetsSubTypes;
  //    });
  //  });
  //this.loadHints();
}
getcityLookup(value: any) {

  this._lookupExtraData.dataName = "regionId"
   this._lookupExtraData.dataValue = value.toString();
   this.lookupfliter.lookUpName = "City";
   this.lookupfliter.filters = [this._lookupExtraData];

   this.lookupssrv.getAllLookups(this.lookupfliter).subscribe(
    (data) => {
      this.cityLookup=data.dto.items!;
      console.log(data);
    }  
  );


  // this.lookupService.getCityByRegionID(value).subscribe((res) => {
  //   this.cityLookup = res;
  //   this.cityDisabled = false;
  // });

}
onChangeMap() {
  if (this.map && this.map.longitude && this.map.latitude) {

    this.assetInfoModel.realEstateAsset.longitude = this.map.longitude;
    this.assetInfoModel.realEstateAsset.latitude = this.map.latitude;
  }
}

loadHints()
{
  //this.estimatedValuehint=HintDictionary.getHintByKey("realEstateAsset.EstimatedValue");

}
get requestType() {
  return ServiceRequestTypeEnum;
}

}
