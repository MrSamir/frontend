import { Component, Input, OnInit, Output } from '@angular/core';
import { EndowmentRegistrationServiceServiceProxy, InputAssetDto, InputIntellectualPropertyAndTrademarkAssetDto, InputLookUpDto, LookupApplicationServiceServiceProxy, LookupDto, LookupExtraData } from '../../../services/services-proxies/service-proxies';
import { LookupModel } from '../../../models/LookupModel';
import { EnumValidation } from 'projects/core-lib/src/lib/enums/EnumValidation';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-shared-intellectual-property-and-trademark-asset',
  templateUrl: './intellectual-property-and-trademark-asset.component.html',
  styleUrls: ['./intellectual-property-and-trademark-asset.component.css']
})
export class IntellectualPropertyAndTrademarkAssetComponent implements OnInit  {

  @Input() @Output() assetInfoModel: InputAssetDto;
  @Input() AssetTypeId: number;
  @Input() viewOnly: boolean;
  //Typehint: HintEntry;
  //assetSubTypes: LookupModel[];

  assetSubTypes:LookupDto[]=[];
  lookupfliter:InputLookUpDto=new InputLookUpDto();
  _lookupExtraData:LookupExtraData;

  ePatternValidation: typeof EnumValidation = EnumValidation;
  constructor(private registerWaqfServiceProxy: EndowmentRegistrationServiceServiceProxy,private modalService: NgbModal,
    private lookupssrv:LookupApplicationServiceServiceProxy,) {

  }

  ngOnInit() {
    if (this.assetInfoModel.intellectualPropertyAndTrademarkAsset == undefined)
      this.assetInfoModel.intellectualPropertyAndTrademarkAsset = new InputIntellectualPropertyAndTrademarkAssetDto();
    

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
     
    //   this.lookupService.getAssetSubTypeByAssetTypeId(this.AssetTypeId).subscribe((result) => {
    //   result.subscribe((assetsSubTypes: LookupModel[]) => {
    //     this.assetSubTypes = assetsSubTypes;
    //   });
    // });
    this.loadHints();
  }
  loadHints() {
    //this.Typehint = HintDictionary.getHintByKey("particularBenefitAsset.benefitType");

  }


}
