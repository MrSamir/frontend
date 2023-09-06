import { Component, Input, Output, forwardRef } from '@angular/core';
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
import { ControlContainer, NgForm } from '@angular/forms';
import { EndowmentRegistrationNewComponent } from '../../../../endowment-registration/components/endowment-registration-new/endowment-registration-new.component';

@Component({
  selector: 'app-shared-animal-or-agricultural-asset',
  templateUrl: './animal-or-agricultural-asset.component.html',
  styleUrls: ['./animal-or-agricultural-asset.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],
  providers: [{ provide: EndowmentRegistrationNewComponent, useExisting: forwardRef(() => AnimalOrAgriculturalAssetComponent) }]
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

  getCityValue(value: number) {
    if (value !== undefined)
      return this.cityLookup.find(c => c.id == value)?.name as string;
    else
      return undefined
  }

}
