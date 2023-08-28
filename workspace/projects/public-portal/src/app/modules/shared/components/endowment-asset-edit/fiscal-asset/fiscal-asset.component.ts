import { Component, Input, Output } from '@angular/core';
import {
  EndowmentRegistrationServiceProxy,
  InputAssetDto,
  InputFiscalAssetDto,
  InputLookUpDto,
  LookupApplicationServiceProxy,
  LookupDto,
  LookupExtraData,
} from '../../../services/services-proxies/service-proxies';
import { EnumValidation } from 'projects/core-lib/src/lib/enums/EnumValidation';
import { ServiceRequestTypeEnum } from '../../../models/ServiceRequestTypeEnum';

@Component({
  selector: 'app-shared-fiscal-asset',
  templateUrl: './fiscal-asset.component.html',
  styleUrls: ['./fiscal-asset.component.css'],
})
export class FiscalAssetComponent {
  @Input() @Output() assetInfoModel: InputAssetDto;
  @Input() AssetTypeId: number;
  @Input() viewOnly: boolean;
  //assetSubTypes:LookupModel[];

  assetSubTypes: LookupDto[] = [];
  lookupfliter: InputLookUpDto = new InputLookUpDto();
  _lookupExtraData: LookupExtraData;


  ePatternValidation: typeof EnumValidation = EnumValidation;
  currentassetvalueLabel = 'القيمة الحالية للأصل';
  assetAttachementLable = 'الأصل';
  numberOfshareLable: string;
  constructor(
    private registerWaqfServiceProxy: EndowmentRegistrationServiceProxy,
    private lookupssrv: LookupApplicationServiceProxy /*private utilityService:UtilityService*/
  ) {
    
  }

  ngOnInit() {
    if (this.assetInfoModel.fiscalAsset == undefined) {
      this.assetInfoModel.fiscalAsset = new InputFiscalAssetDto();
    }

    this._lookupExtraData =new LookupExtraData();
    this._lookupExtraData.dataName = 'AssetTypeId';
    this._lookupExtraData.dataValue = this.AssetTypeId.toString();
    this.lookupfliter.lookUpName = 'AssetSubType';
    this.lookupfliter.filters = [this._lookupExtraData];

    this.lookupssrv.getAllLookups(this.lookupfliter).subscribe((data) => {
      this.assetSubTypes = data.dto.items!;
      console.log(data);
    });
  }

  subTypeChanged() {
    if (
      this.assetInfoModel.fiscalAsset.assetSubTypeId >= 10 &&
      this.assetInfoModel.fiscalAsset.assetSubTypeId < 13
    ) {
      this.currentassetvalueLabel = `القيمة الحالية ل${
        this.assetSubTypes.find(
          (c) => c.id == this.assetInfoModel.fiscalAsset.assetSubTypeId
        )?.name as string
      }`;

      this.numberOfshareLable = `${
        this.assetSubTypes.find(
          (c) => c.id == this.assetInfoModel.fiscalAsset.assetSubTypeId
        )?.name as string
      }عدد ال`;
      this.assetAttachementLable = `${
        this.assetSubTypes.find(
          (c) => c.id == this.assetInfoModel.fiscalAsset.assetSubTypeId
        )?.name as string
      }ال`;
    } else {
      this.currentassetvalueLabel = 'القيمة الحالية للأصل';
      this.numberOfshareLable = 'عدد الأصول';
      this.assetAttachementLable = 'الأصل';
    }
  }
  get requestType() {
    return ServiceRequestTypeEnum;
  }

  getLookUpValue(assetSubTypeId: number) {
    return this.assetSubTypes.find(
      (c) => c.id == this.assetInfoModel.fiscalAsset.assetSubTypeId
    )?.name as string;
  }
  
}
