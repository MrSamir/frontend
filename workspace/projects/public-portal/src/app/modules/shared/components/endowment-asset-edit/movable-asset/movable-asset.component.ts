import { Component, Injector, Input, OnInit, Output, forwardRef } from '@angular/core';
import { EnumValidation } from 'projects/core-lib/src/lib/enums/EnumValidation';
import {
  EndowmentRegistrationApplicationServiceProxy,
  FileLibraryApplicationServiceProxy,
  EndowmentAssetDto,
  InputLookUpDto,
  LookupApplicationServiceProxy,
  LookupDto,
  LookupExtraData,
} from '../../../services/services-proxies/service-proxies';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ControlContainer, NgForm } from '@angular/forms';
import { ComponentBase } from 'projects/core-lib/src/lib/components/ComponentBase/ComponentBase.component';
import { ActivatedRoute } from '@angular/router';
import { DateFormatterService } from 'projects/shared-features-lib/src/lib/components/ng-bootstrap-hijri-gregorian-datepicker/date-formatter.service';
import { EndowmentSharedAssetEditComponent } from '../endowment-asset-edit.component';

@Component({
  selector: 'app-shared-movable-asset',
  templateUrl: './movable-asset.component.html',
  styleUrls: ['./movable-asset.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],
  providers: [{ provide: EndowmentSharedAssetEditComponent, useExisting: forwardRef(() => MovableAssetComponent) }]
})
export class MovableAssetComponent extends ComponentBase implements OnInit {
  @Input() @Output() assetInfoModel: EndowmentAssetDto;
  @Input() AssetTypeId: number;
  @Input() viewOnly: boolean;
  ePatternValidation: typeof EnumValidation = EnumValidation;
  // movableTypehint:HintEntry;
  // movableAssetOwnershipNumberhint:HintEntry;
  // movableValuehint:HintEntry;
  //assetSubTypes:LookupModel[];
  @Input() assetSubTypes: LookupDto[] = [];
  lookupfliter: InputLookUpDto = new InputLookUpDto();
  _lookupExtraData: LookupExtraData = new LookupExtraData();

  constructor(
    private registerWaqfServiceProxy: EndowmentRegistrationApplicationServiceProxy,
    private modalService: NgbModal,
    private lookupssrv: LookupApplicationServiceProxy,
    injecter: Injector,
    private _serviceProxyFileLibrary: FileLibraryApplicationServiceProxy,
    private dateHelper: DateFormatterService,
    private activatedRoute: ActivatedRoute
  ) {
    super(injecter);
  }

  ngOnInit() {
    if (this.assetInfoModel.assetSubTypeId == undefined) {
      this.assetInfoModel.assetSubTypeId = 12;
    }
    this.loadHints();
  }
  loadHints() {
    // this.movableTypehint=HintDictionary.getHintByKey("movableAsset.movableType");
    // this.movableAssetOwnershipNumberhint=HintDictionary.getHintByKey("movableAsset.movableAssetOwnershipNumber");
    // this.movableValuehint=HintDictionary.getHintByKey("movableAsset.movableValue");
  }
}
