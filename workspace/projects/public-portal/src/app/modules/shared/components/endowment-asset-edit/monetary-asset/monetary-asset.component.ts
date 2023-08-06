import { Component, Input, Output } from '@angular/core';
import { EndowmentRegistrationServiceServiceProxy, InputAssetDto, InputMonetaryAssetDto, LookupApplicationServiceServiceProxy } from '../../../services/services-proxies/service-proxies';
 
import { LookupModel } from '../../../models/LookupModel';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EnumValidation } from '../../../../../../../../core-lib/src/lib/enums/EnumValidation';


@Component({
  selector: 'app-shared-monetary-asset',
  templateUrl: './monetary-asset.component.html',
  styleUrls: ['./monetary-asset.component.css']
})
export class MonetaryAssetComponent {

  @Input() @Output() assetInfoModel:InputAssetDto;
  @Input() AssetTypeId:number;
  @Input() viewOnly:boolean;
  ePatternValidation: typeof EnumValidation = EnumValidation;
  resolveLookup:any;
  @Input()assetSubTypes:LookupModel[];
  constructor(private registerWaqfServiceProxy: EndowmentRegistrationServiceServiceProxy,private modalService: NgbModal,
    private lookupssrv:LookupApplicationServiceServiceProxy,/*private utilityService:UtilityService*/) {
    //this.resolveLookup = this.utilityService.resolveLookup;
   }

   ngOnInit() {
    this.loadingdata();
    
    }
    
    ngOnChanges() {
      this.assetInfoModel.monetaryAsset
      }
  
  
     loadingdata()
    {
  
       
      if(this.assetInfoModel.monetaryAsset==undefined)
      this.assetInfoModel.monetaryAsset=new InputMonetaryAssetDto();
  // this.lookupService.getAssetSubTypeByAssetTypeId(this.AssetTypeId).subscribe((result)=>{
  //       result.subscribe((assetsSubTypes: LookupModel[])=>{
  //         debugger
  //         this.assetSubTypes=assetsSubTypes;
          
  //       });
  //     });
      
    }

}
