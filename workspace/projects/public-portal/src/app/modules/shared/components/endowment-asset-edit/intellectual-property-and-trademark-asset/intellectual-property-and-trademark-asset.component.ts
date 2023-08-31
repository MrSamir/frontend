import { Component, Input, OnInit, Output } from '@angular/core';
import {
  EndowmentRegistrationServiceProxy,
  InputAssetDto,
  InputIntellectualPropertyAndTrademarkAssetDto,
  InputLookUpDto,
  LookupApplicationServiceProxy,
  LookupDto,
  LookupExtraData,
} from '../../../services/services-proxies/service-proxies';
import { EnumValidation } from 'projects/core-lib/src/lib/enums/EnumValidation';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-shared-intellectual-property-and-trademark-asset',
  templateUrl: './intellectual-property-and-trademark-asset.component.html',
  styleUrls: ['./intellectual-property-and-trademark-asset.component.css'],
})
export class IntellectualPropertyAndTrademarkAssetComponent implements OnInit {
  @Input() @Output() assetInfoModel: InputAssetDto;
  @Input() AssetTypeId: number;
  @Input() viewOnly: boolean;
  //Typehint: HintEntry;
  //assetSubTypes: LookupModel[];

  assetSubTypes: LookupDto[] = [];
  lookupfliter: InputLookUpDto = new InputLookUpDto();
  _lookupExtraData: LookupExtraData = new LookupExtraData();

  ePatternValidation: typeof EnumValidation = EnumValidation;
  constructor(
    private registerWaqfServiceProxy: EndowmentRegistrationServiceProxy,
    private modalService: NgbModal,
    private lookupssrv: LookupApplicationServiceProxy
  ) {}

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
  }
}
