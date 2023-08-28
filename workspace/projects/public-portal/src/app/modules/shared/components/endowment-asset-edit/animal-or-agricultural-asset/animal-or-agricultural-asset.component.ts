import { Component, Input, Output } from '@angular/core';
import {
  EndowmentRegistrationServiceProxy,
  InputAnimalOrAgriculturalAssetDto,
  InputAssetDto,
  InputLookUpDto,
  LookupApplicationServiceProxy,
  LookupDto,
  LookupExtraData,
} from '../../../services/services-proxies/service-proxies';
import { EnumValidation } from 'projects/core-lib/src/lib/enums/EnumValidation';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-shared-animal-or-agricultural-asset',
  templateUrl: './animal-or-agricultural-asset.component.html',
  styleUrls: ['./animal-or-agricultural-asset.component.css'],
})
export class AnimalOrAgriculturalAssetComponent {
  @Input() @Output() assetInfoModel: InputAssetDto;
  @Input() AssetTypeId: number;
  @Input() viewOnly: boolean;
  ePatternValidation: typeof EnumValidation = EnumValidation;
  // regionLookup: LookupModel[];
  // cityLookup: LookupModel[];
  lookupfliter: InputLookUpDto = new InputLookUpDto();
  regionLookup: LookupDto[] = [];
  cityLookup: LookupDto[] = [];
  _lookupExtraData: LookupExtraData;
  cityDisabled = true;
  constructor(
    private lookupssrv: LookupApplicationServiceProxy,
    private modalService: NgbModal,
    private registerWaqfServiceProxy: EndowmentRegistrationServiceProxy
 
  ) {
 
  }

  ngOnInit() {
    if (this.assetInfoModel.animalOrAgriculturalAsset == undefined) {
      this.assetInfoModel.animalOrAgriculturalAsset =
        new InputAnimalOrAgriculturalAssetDto();
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
      this.cityDisabled = false;

    });
  }
  getcityLookup(value: any) {
    this._lookupExtraData = new LookupExtraData();
    this._lookupExtraData.dataName = 'regionId';
    this._lookupExtraData.dataValue = value.toString();
    this.lookupfliter.lookUpName = 'City';
    this.lookupfliter.filters = [this._lookupExtraData];

    this.lookupssrv.getAllLookups(this.lookupfliter).subscribe((data) => {
      this.cityLookup = data.dto.items!;
      console.log(data);
    });
  }

  getCityValue(value:number){
    return this.cityLookup.find(c=>c.id == value)?.name as string;
  }

}
