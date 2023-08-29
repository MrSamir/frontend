import { Component, EventEmitter, Injector, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EnumValidation } from 'projects/core-lib/src/lib/enums/EnumValidation';
import { LookupModel } from '../../models/LookupModel';
import {
  InputAssetDto,
  InputLookUpDto,
  InputOneAssetDto,
  LookupApplicationServiceProxy,
  LookupDto,
  OutputAssetDto,
} from '../../services/services-proxies/service-proxies';
import { MapModel } from '../map/map.model';
//import { ActivatedRoute } from '@angular/router';
import { RequestModel } from '../../models/RequestModel';
import { WizardComponent } from "angular-archwizard";
import { MessageTypeEnum } from "../../../../../../../core-lib/src/lib/enums/message-type";
import { MessageSeverity } from "../../../../../../../core-lib/src/lib/enums/message-severity";
import { ComponentBase } from "../../../../../../../core-lib/src/lib/components/ComponentBase/ComponentBase.component";
import { wizardNavDto } from '../../../endowment-registration/models/wizard-nav-data';

@Component({
  selector: 'app-endowment-shared-asset-edit',
  templateUrl: './endowment-asset-edit.component.html',
  styleUrls: ['./endowment-asset-edit.component.css'],
})
export class EndowmentSharedAssetEditComponent extends ComponentBase {
  //#region variables

  @Input() viewOnly = false;

  @Input() IsNewAssetRequest = true;

  @Input() @Output() request: RequestModel;

  @Output() OnAddingNewAsset = new EventEmitter<InputAssetDto>();
  @Output() OnEditingExistingAsset = new EventEmitter<InputAssetDto>();
  @Output() OnDeletingExistingAsset = new EventEmitter<{
    assetToDelete: OutputAssetDto;
    index: number;
  }>();

  @Output() onBtnNextClicked = new EventEmitter<wizardNavDto>();
  @Output() onBtnPreviousClicked = new EventEmitter<wizardNavDto>();
  @Output() OnCancelClick = new EventEmitter();
  @Input() serialNumber: string | undefined;
  @Input() waqfId: string | undefined;
  @Input() requestId: string;
  @Input() Assets: OutputAssetDto[] = [];

  SelectedAssetToEdit: InputAssetDto;
  map: MapModel;

  newAsset: InputAssetDto | undefined;

  lookupfliter: InputLookUpDto = new InputLookUpDto();
  assetsSubTypeLookup: LookupDto[] = [];
  AssetTypeLookup: LookupDto[] = [];
  AssetSizeLookup: LookupDto[] = [];
  RegionLookup: LookupDto[] = [];
  CityLookup: LookupDto[] = [];
  AssetSubTypeLookup: LookupDto[] = [];
  OneRequestAsset: InputOneAssetDto;
  assetTypeMap: { [value: number]: string } = {};
  assetToEditIndex: number;
  isEditRequested = false;
  assetSubTypes: LookupModel[];
  ePatternValidation: typeof EnumValidation = EnumValidation;
  @Input() public wizard: WizardComponent;
  wizardNavDto: wizardNavDto = new wizardNavDto();

  //#endregion
  //assetSubTypes: LookupModel[];

  constructor(
    public formBuilder: FormBuilder,
    private modalService: NgbModal,
    private lookupssrv: LookupApplicationServiceProxy,
    private injector: Injector
  ) /*private activatedRoute: ActivatedRoute*/ {
    super(injector);
  }

  //#region Events

  onEditBtnClicked() {
    this.OnEditingExistingAsset.emit(this.newAsset);
  }

  onCancelBtnClicked() {
    this.OnCancelClick.emit();
    this.modalService.dismissAll();
  }

  onAddBtnClicked() {
    this.OnAddingNewAsset.emit(this.newAsset);
  }

  async onAddNewAssetClicked(data: any) {
    if (this.requestId == undefined) {
      if (this.request == undefined || this.request.id == undefined) {
        this.requestId = '';
      } // this.activatedRoute.snapshot.params['requestId'];
      else {
        this.requestId = this.request.id;
      }
    }
    this.newAsset = new InputAssetDto();
    this.newAsset.requestId = this.requestId;
    // this.newAsset.isDirectlyBenefited = true;
    await this.loadAssetType();

    await this.loadAssetSize();
    this.isEditRequested = false;
    this.viewOnly = false;

    this.modalService.open(data, { size: 'lg' });
  }

  onViewTableCellClicked(content: any, id?: string) {
    if (!id) return;
    this.isEditRequested = true;
    const assetToEditIndex = parseInt(id);
    const seerToView = this.Assets[assetToEditIndex];
    const SelectedAssetToView = new InputAssetDto();
    SelectedAssetToView.init(seerToView);
    this.newAsset = SelectedAssetToView;
    this.loadassetSubType();
    this.modalService.open(content, { size: 'lg' });
  }

  async onEditTableCellClicked(content: any, id?: string) {
    if (!id) return;
    this.isEditRequested = true;
    const assetToEditIndex = parseInt(id);
    const seerToEdit = this.Assets[assetToEditIndex];
    const SelectedAssetToEdit = new InputAssetDto();
    SelectedAssetToEdit.init(seerToEdit);
    this.newAsset = SelectedAssetToEdit;
    this.loadassetSubTypeforEdit(
      this.Assets[assetToEditIndex].assetTypeId!,
      content
    );
  }

  onDeleteTableCellClicked(assetToDelete: any, index: number) {
    // we change AssetDto to any , revert back after building backend
    this.OnDeletingExistingAsset.emit({ assetToDelete, index });
  }

  //#endregion

  //#region internal methods

  private loadAssetType() {
    this.lookupfliter.lookUpName = 'AssetType';
    this.lookupfliter.filters = [];
    this.lookupssrv.getAllLookups(this.lookupfliter).subscribe((data) => {
      this.AssetTypeLookup = data.dto.items!;
      console.log(data);
      this.loadAssetSize();
    });
  }

  private loadAssetSize() {
    this.lookupfliter.lookUpName = 'AssetSize';
    this.lookupfliter.filters = [];
    this.lookupssrv.getAllLookups(this.lookupfliter).subscribe((data) => {
      this.AssetSizeLookup = data.dto.items!;
      console.log(data);
      //this.loadassetSubType();
    });
  }

  public changeAssetType() {
    // this.newAsset.businessEntityAsset = undefined;
    // this.newAsset.realEstateAsset = undefined;
    // this.newAsset.fiscalAsset = undefined;
    // this.newAsset.movableAsset = undefined;
    // this.newAsset.monetaryAsset = undefined;
    // this.newAsset.particularBenefitAsset = undefined;
    // this.newAsset.intellectualPropertyAndTrademarkAsset = undefined;
    // this.newAsset.animalOrAgriculturalAsset = undefined;

    this.loadassetSubType();
  }

  isNewOrEditAssetValid() {
    return true;
  }

  loadassetSubTypeforEdit(_assetTypeId: number, _content: any) {
    debugger
    this.lookupfliter.lookUpName = 'AssetSubType';
    //this.lookupfliter.filters = [assetTypeId];
    this.lookupfliter.filters = [];
    this.lookupssrv.getAllLookups(this.lookupfliter).subscribe((data) => {
      this.assetsSubTypeLookup = data.dto.items!;
      console.log(data);
    });
  }

  loadassetSubType() {
    this.lookupfliter.lookUpName = 'AssetSubType';
    this.lookupfliter.filters = [];
    this.lookupssrv.getAllLookups(this.lookupfliter).subscribe((data) => {
      this.assetsSubTypeLookup = data.dto.items!;
      console.log(data);
    });
  }
  onNextBtnClicked() {
    // if (!this.Assets || this.Assets.length == 0) {
    //   this.message.showMessage(MessageTypeEnum.toast, {
    //     closable: true,
    //     enableService: true,
    //     summary: '',
    //     detail: this.l('EndowmentModule.EndowmentRgistrationService.atLeastOneAsset'),
    //     severity: MessageSeverity.Error,
    //   });
    //   return;
    // }
    this.wizardNavDto.isNaviagateToNext = true;
    this.wizardNavDto.requestId = this.requestId;
    this.wizardNavDto.step = '4';
    this.wizardNavDto.endowmentId = this.waqfId;
    this.wizardNavDto.serialNumber = this.serialNumber;
    this.onBtnNextClicked.emit(this.wizardNavDto);
  }

  onBackBtnClicked() {
    this.wizardNavDto.requestId = this.requestId;
    this.wizardNavDto.step = '2';
    this.wizardNavDto.endowmentId = this.waqfId;
    this.wizardNavDto.serialNumber = this.serialNumber;
    this.onBtnPreviousClicked.emit(this.wizardNavDto);
    // this.wizard.goToPreviousStep();
  }
  //#endregion
}
