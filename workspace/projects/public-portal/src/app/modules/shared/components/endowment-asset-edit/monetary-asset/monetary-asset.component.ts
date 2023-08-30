import { Component, Injector, Input, OnInit, Output, forwardRef } from '@angular/core';
import {
  EndowmentRegistrationServiceProxy,
  FileLibraryApplicationServiceProxy,
  InputAssetDto,
  InputLookUpDto,
  InputMonetaryAssetDto,
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
import { EndowmentRegistrationNewComponent } from '../../../../endowment-registration/components/endowment-registration-new/endowment-registration-new.component';

@Component({
  selector: 'app-shared-monetary-asset',
  templateUrl: './monetary-asset.component.html',
  styleUrls: ['./monetary-asset.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],
  providers: [{ provide: EndowmentRegistrationNewComponent, useExisting: forwardRef(() => MonetaryAssetComponent) }]
})
export class MonetaryAssetComponent extends ComponentBase implements OnInit {
  @Input() @Output() assetInfoModel: InputAssetDto;
  @Input() AssetTypeId: number;
  @Input() viewOnly: boolean;
  ePatternValidation: typeof EnumValidation = EnumValidation;
  _lookupExtraData: LookupExtraData;
  lookupfliter: InputLookUpDto = new InputLookUpDto();
  assetSubTypes: LookupDto[] = [];
  constructor(
    private registerWaqfServiceProxy: EndowmentRegistrationServiceProxy,
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
    this._lookupExtraData = new LookupExtraData();
    this._lookupExtraData.dataName = 'AssetTypeId';
    this._lookupExtraData.dataValue = this.AssetTypeId.toString();
    this.lookupfliter.lookUpName = 'AssetSubType';
    this.lookupfliter.filters = [this._lookupExtraData];
    this.lookupssrv.getAllLookups(this.lookupfliter).subscribe((data) => {
      debugger
      this.assetSubTypes = data.dto.items!;
      console.log(data);
    });
  }

  ngOnChanges() {
    this.assetInfoModel.monetaryAsset;
  }

  loadingdata() {
    if (this.assetInfoModel.monetaryAsset == undefined) {
      this.assetInfoModel.monetaryAsset = new InputMonetaryAssetDto();
    }
  }

  getSubAssets(subassetId: number) {

    if (subassetId != undefined)
      return this.assetSubTypes.find(c => c.id == this.AssetTypeId)?.name as string;
    else
      return undefined;
  }


}
