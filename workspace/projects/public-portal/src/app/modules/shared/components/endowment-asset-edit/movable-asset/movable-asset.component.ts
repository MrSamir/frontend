import { Component, Input, Output } from '@angular/core';
import { EnumValidation } from 'projects/core-lib/src/lib/enums/EnumValidation';
import { LookupModel } from '../../../models/LookupModel';
import { EndowmentRegistrationServiceProxy, InputAssetDto, InputLookUpDto, InputMovableAssetDto, LookupApplicationServiceProxy, LookupDto, LookupExtraData } from '../../../services/services-proxies/service-proxies';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-shared-movable-asset',
  templateUrl: './movable-asset.component.html',
  styleUrls: ['./movable-asset.component.css']
})
export class MovableAssetComponent {

  @Input() @Output() assetInfoModel:InputAssetDto;
  @Input() AssetTypeId:number;
  @Input() viewOnly:boolean;
  ePatternValidation: typeof EnumValidation = EnumValidation;
  // movableTypehint:HintEntry;
  // movableAssetOwnershipNumberhint:HintEntry;
  // movableValuehint:HintEntry;
  //assetSubTypes:LookupModel[];
  assetSubTypes:LookupDto[]=[];
  lookupfliter:InputLookUpDto=new InputLookUpDto();
  _lookupExtraData:LookupExtraData;

  constructor(private registerWaqfServiceProxy: EndowmentRegistrationServiceProxy,private modalService: NgbModal,
    private lookupssrv:LookupApplicationServiceProxy) { }

  ngOnInit() {

    if(this.assetInfoModel.movableAsset==undefined)
    this.assetInfoModel.movableAsset=new InputMovableAssetDto();
    
    this._lookupExtraData.dataName = "AssetTypeId"
   this._lookupExtraData.dataValue = this.AssetTypeId.toString();
   this.lookupfliter.lookUpName = "AssetSubType";
   this.lookupfliter.filters = [this._lookupExtraData];

   this.lookupssrv.getAllLookups(this.lookupfliter).subscribe(
    (data) => {
      this.assetSubTypes=data.dto.items!;
      console.log(data);
    }  
  );;
    this.loadHints();
  }
 loadHints()
 {
  // this.movableTypehint=HintDictionary.getHintByKey("movableAsset.movableType");
  // this.movableAssetOwnershipNumberhint=HintDictionary.getHintByKey("movableAsset.movableAssetOwnershipNumber");
  // this.movableValuehint=HintDictionary.getHintByKey("movableAsset.movableValue");
 }
}
