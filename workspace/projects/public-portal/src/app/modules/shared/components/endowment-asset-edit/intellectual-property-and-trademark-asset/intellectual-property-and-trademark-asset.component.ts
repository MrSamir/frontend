import { Component, Injector, Input, OnInit, Output, forwardRef } from '@angular/core';
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
  selector: 'app-shared-intellectual-property-and-trademark-asset',
  templateUrl: './intellectual-property-and-trademark-asset.component.html',
  styleUrls: ['./intellectual-property-and-trademark-asset.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],
  providers: [{ provide: EndowmentSharedAssetEditComponent, useExisting: forwardRef(() => IntellectualPropertyAndTrademarkAssetComponent) }]
})
export class IntellectualPropertyAndTrademarkAssetComponent extends ComponentBase implements OnInit {
  @Input() @Output() assetInfoModel: EndowmentAssetDto;
  @Input() AssetTypeId: number;
  @Input() viewOnly: boolean;
  //Typehint: HintEntry;
  //assetSubTypes: LookupModel[];

  @Input() assetSubTypes: LookupDto[] = [];
  lookupfliter: InputLookUpDto = new InputLookUpDto();
  _lookupExtraData: LookupExtraData = new LookupExtraData();

  ePatternValidation: typeof EnumValidation = EnumValidation;
  constructor(
    private registerWaqfServiceProxy: EndowmentRegistrationApplicationServiceProxy,
    private modalService: NgbModal,
    private lookupssrv: LookupApplicationServiceProxy,
    injector: Injector
  ) {
    super(injector);
  }

  ngOnInit() {
    if (this.assetInfoModel.assetSubTypeId == undefined) {
      this.assetInfoModel.assetSubTypeId = 12;
    }
    this.loadHints();
  }
  loadHints() {
  }
}
