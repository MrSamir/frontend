import { Component, Injector, Input, Output, forwardRef } from '@angular/core';
import { EnumValidation } from 'projects/core-lib/src/lib/enums/EnumValidation';
import {
  EndowmentRegistrationApplicationServiceProxy,
  EndowmentAssetDto,
  InputLookUpDto,
  LookupApplicationServiceProxy,
  LookupDto,
  LookupExtraData,
} from '../../../services/services-proxies/service-proxies';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ControlContainer, NgForm } from '@angular/forms';
import { EndowmentSharedAssetEditComponent } from '../endowment-asset-edit.component';
import { ComponentBase } from 'projects/core-lib/src/lib/components/ComponentBase/ComponentBase.component';

@Component({
  selector: 'app-shared-particular-benefit-asset',
  templateUrl: './particular-benefit-asset.component.html',
  styleUrls: ['./particular-benefit-asset.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],
  providers: [{ provide: EndowmentSharedAssetEditComponent, useExisting: forwardRef(() => ParticularBenefitAssetComponent) }]
})
export class ParticularBenefitAssetComponent extends ComponentBase {
  @Input() @Output() assetInfoModel: EndowmentAssetDto;
  @Input() AssetTypeId: number;
  @Input() viewOnly: boolean;
  //Typehint:HintEntry;
  //assetSubTypes:LookupDto[]=[];
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
    //this.Typehint=HintDictionary.getHintByKey("particularBenefitAsset.benefitType");
  }
}
