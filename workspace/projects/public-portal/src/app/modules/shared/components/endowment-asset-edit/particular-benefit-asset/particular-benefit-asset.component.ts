import { Component, Input, Output } from '@angular/core';
import { LookupModel } from '../../../models/LookupModel';
import { EnumValidation } from 'projects/core-lib/src/lib/enums/EnumValidation';
import { EndowmentRegistrationServiceServiceProxy, InputAssetDto, InputLookUpDto, InputParticularBenefitAssetDto, LookupApplicationServiceServiceProxy, LookupDto, LookupExtraData } from '../../../services/services-proxies/service-proxies';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-shared-particular-benefit-asset',
  templateUrl: './particular-benefit-asset.component.html',
  styleUrls: ['./particular-benefit-asset.component.css']
})
export class ParticularBenefitAssetComponent {

  @Input() @Output() assetInfoModel:InputAssetDto;
  @Input() AssetTypeId:number;
  @Input() viewOnly:boolean;
  //Typehint:HintEntry;
  //assetSubTypes:LookupDto[]=[];
  assetSubTypes:LookupDto[]=[];
  lookupfliter:InputLookUpDto=new InputLookUpDto();
  _lookupExtraData:LookupExtraData;
  ePatternValidation: typeof EnumValidation = EnumValidation;

  constructor(private registerWaqfServiceProxy: EndowmentRegistrationServiceServiceProxy,private modalService: NgbModal,
    private lookupssrv:LookupApplicationServiceServiceProxy,) {

  }

  ngOnInit() {
    if(this.assetInfoModel.particularBenefitAsset==undefined)
    this.assetInfoModel.particularBenefitAsset=new InputParticularBenefitAssetDto();
    
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

    // this.lookupService.getAssetSubTypeByAssetTypeId(this.AssetTypeId).subscribe((result)=>{
    //   result.subscribe((assetsSubTypes: LookupModel[])=>{
    //     this.assetSubTypes=assetsSubTypes;
    //   });
    // });
    this.loadHints();
  }
  loadHints()
  {
   //this.Typehint=HintDictionary.getHintByKey("particularBenefitAsset.benefitType");

  }
}
