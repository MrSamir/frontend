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
import { LookupModel } from '../../../models/LookupModel';
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

  resolveLookup: any;
  ePatternValidation: typeof EnumValidation = EnumValidation;
  currentassetvalueLabel = 'القيمة الحالية للأصل';
  assetAttachementLable = 'الأصل';
  numberOfshareLable: string;
  constructor(
    private registerWaqfServiceProxy: EndowmentRegistrationServiceProxy,
    private lookupssrv: LookupApplicationServiceProxy /*private utilityService:UtilityService*/
  ) {
    //this.resolveLookup = this.utilityService.resolveLookup;
  }

  ngOnInit() {
    if (this.assetInfoModel.fiscalAsset == undefined) {
      this.assetInfoModel.fiscalAsset = new InputFiscalAssetDto();
    }

    // this.lookupService.getAssetSubTypeByAssetTypeId(this.AssetTypeId).subscribe((result)=>{
    //   result.subscribe((assetsSubTypes: LookupModel[])=>{
    //     this.assetSubTypes=assetsSubTypes;
    //     this.subTypeChanged();
    //   });
    // });

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
      this.currentassetvalueLabel = 'القيمة الحالية ل{0}'.replace(
        '{0}',
        this.resolveLookup(
          this.assetInfoModel.fiscalAsset.assetSubTypeId,
          this.assetSubTypes
        )
      );
      this.numberOfshareLable = 'عدد ال{0}'.replace(
        '{0}',
        this.resolveLookup(
          this.assetInfoModel.fiscalAsset.assetSubTypeId,
          this.assetSubTypes
        )
      );
      this.assetAttachementLable = ' ال{0}'.replace(
        '{0}',
        this.resolveLookup(
          this.assetInfoModel.fiscalAsset.assetSubTypeId,
          this.assetSubTypes
        )
      );
    } else {
      this.currentassetvalueLabel = 'القيمة الحالية للأصل';
      this.numberOfshareLable = 'عدد الأصول';
      this.assetAttachementLable = 'الأصل';
    }
  }
  get requestType() {
    return ServiceRequestTypeEnum;
  }
}
