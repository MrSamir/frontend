import { Component, Injector, Input, Output, forwardRef } from '@angular/core';
import {
  EndowmentRegistrationApplicationServiceProxy,
  EndowmentAssetDto,
  InputLookUpDto,
  LookupApplicationServiceProxy,
  LookupDto,
  LookupExtraData,
} from '../../../services/services-proxies/service-proxies';
import { EnumValidation } from 'projects/core-lib/src/lib/enums/EnumValidation';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ControlContainer, NgForm } from '@angular/forms';
import { EndowmentSharedAssetEditComponent } from '../endowment-asset-edit.component';
import { ComponentBase } from 'projects/core-lib/src/lib/components/ComponentBase/ComponentBase.component';

@Component({
  selector: 'app-shared-animal-or-agricultural-asset',
  templateUrl: './animal-or-agricultural-asset.component.html',
  styleUrls: ['./animal-or-agricultural-asset.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],
  providers: [{ provide: EndowmentSharedAssetEditComponent, useExisting: forwardRef(() => AnimalOrAgriculturalAssetComponent) }]
})
export class AnimalOrAgriculturalAssetComponent extends ComponentBase {
  @Input() @Output() assetInfoModel: EndowmentAssetDto;
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
    private registerWaqfServiceProxy: EndowmentRegistrationApplicationServiceProxy,
    injector: Injector

  ) {
    super(injector);
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
  getcityLookup(event: any) {
    this._lookupExtraData = new LookupExtraData();
    this._lookupExtraData.dataName = 'regionId';
    this._lookupExtraData.dataValue = event.value.toString();
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
