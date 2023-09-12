import { Component, Injector, Input, OnInit, Output, forwardRef } from '@angular/core';
import {
  EndowmentRegistrationApplicationServiceProxy,
  FileLibraryApplicationServiceProxy,
  EndowmentAssetDto,
  InputLookUpDto,
  LookupApplicationServiceProxy,
  LookupDto,
  LookupExtraData,
} from '../../../services/services-proxies/service-proxies';

import { LookupModel } from '../../../models/LookupModel';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EnumValidation } from '../../../../../../../../core-lib/src/lib/enums/EnumValidation';
import { ComponentBase } from 'projects/core-lib/src/lib/components/ComponentBase/ComponentBase.component';
import { ActivatedRoute } from '@angular/router';
import { DateFormatterService } from 'projects/shared-features-lib/src/lib/components/ng-bootstrap-hijri-gregorian-datepicker/date-formatter.service';
import { ControlContainer, NgForm } from '@angular/forms';
import { EndowmentSharedAssetEditComponent } from '../endowment-asset-edit.component';

@Component({
  selector: 'app-shared-monetary-asset',
  templateUrl: './monetary-asset.component.html',
  styleUrls: ['./monetary-asset.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],
  providers: [{ provide: EndowmentSharedAssetEditComponent, useExisting: forwardRef(() => MonetaryAssetComponent) }]
})
export class MonetaryAssetComponent extends ComponentBase implements OnInit {
  @Input() @Output() assetInfoModel: EndowmentAssetDto;
  @Input() AssetTypeId: number;
  @Input() viewOnly: boolean;
  ePatternValidation: typeof EnumValidation = EnumValidation;
  _lookupExtraData: LookupExtraData;
  lookupfliter: InputLookUpDto = new InputLookUpDto();
  @Input() assetSubTypes: LookupDto[] = [];
  constructor(
    private registerWaqfServiceProxy: EndowmentRegistrationApplicationServiceProxy,
    private modalService: NgbModal,
    private lookupssrv: LookupApplicationServiceProxy,
    injecter: Injector,
    private _serviceProxyFileLibrary: FileLibraryApplicationServiceProxy,
    private dateHelper: DateFormatterService,
    private activatedRoute: ActivatedRoute,
    injector: Injector,
  ) {
    super(injecter)
  }

  ngOnInit() {
    this.loadingdata();

  }

  ngOnChanges() {
    this.assetInfoModel.monetaryAsset;
  }

  loadingdata() {

  }

  getSubAssets(subassetId: number) {

    if (subassetId != undefined)
      return this.assetSubTypes.find(c => c.id == this.AssetTypeId)?.name as string;
    else
      return undefined;
  }


}
