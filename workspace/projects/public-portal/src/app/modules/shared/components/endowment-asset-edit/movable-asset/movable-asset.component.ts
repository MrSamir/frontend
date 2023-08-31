import { Component, Injector, Input, OnInit, Output, forwardRef } from '@angular/core';
import { EnumValidation } from 'projects/core-lib/src/lib/enums/EnumValidation';
import {
  EndowmentRegistrationServiceProxy,
  FileLibraryApplicationServiceProxy,
  InputAssetDto,
  InputLookUpDto,
  InputMovableAssetDto,
  LookupApplicationServiceProxy,
  LookupDto,
  LookupExtraData,
} from '../../../services/services-proxies/service-proxies';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ControlContainer, NgForm } from '@angular/forms';
import { EndowmentRegistrationNewComponent } from '../../../../endowment-registration/components/endowment-registration-new/endowment-registration-new.component';
import { ComponentBase } from 'projects/core-lib/src/lib/components/ComponentBase/ComponentBase.component';
import { ActivatedRoute } from '@angular/router';
import { DateFormatterService } from 'projects/shared-features-lib/src/lib/components/ng-bootstrap-hijri-gregorian-datepicker/date-formatter.service';

@Component({
  selector: 'app-shared-movable-asset',
  templateUrl: './movable-asset.component.html',
  styleUrls: ['./movable-asset.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],
  providers: [{ provide: EndowmentRegistrationNewComponent, useExisting: forwardRef(() => MovableAssetComponent) }]
})
export class MovableAssetComponent extends ComponentBase implements OnInit {
  @Input() @Output() assetInfoModel: InputAssetDto;
  @Input() AssetTypeId: number;
  @Input() viewOnly: boolean;
  ePatternValidation: typeof EnumValidation = EnumValidation;
  // movableTypehint:HintEntry;
  // movableAssetOwnershipNumberhint:HintEntry;
  // movableValuehint:HintEntry;
  //assetSubTypes:LookupModel[];
  assetSubTypes: LookupDto[] = [];
  lookupfliter: InputLookUpDto = new InputLookUpDto();
  _lookupExtraData: LookupExtraData = new LookupExtraData();

  constructor(
    private registerWaqfServiceProxy: EndowmentRegistrationServiceProxy,
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

    this._lookupExtraData.dataName = 'AssetTypeId';
    this._lookupExtraData.dataValue = this.AssetTypeId.toString();
    this.lookupfliter.lookUpName = 'AssetSubType';
    this.lookupfliter.filters = [this._lookupExtraData];

    this.lookupssrv.getAllLookups(this.lookupfliter).subscribe((data) => {
      this.assetSubTypes = data.dto.items!;
      console.log(data);
    });
    this.loadHints();
  }
  loadHints() {
    // this.movableTypehint=HintDictionary.getHintByKey("movableAsset.movableType");
    // this.movableAssetOwnershipNumberhint=HintDictionary.getHintByKey("movableAsset.movableAssetOwnershipNumber");
    // this.movableValuehint=HintDictionary.getHintByKey("movableAsset.movableValue");
  }
}
