import { ChangeDetectorRef, Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EnumValidation } from 'projects/core-lib/src/lib/enums/EnumValidation';
import { LookupModel } from '../../models/LookupModel';
import {
  ApiException,
  EndowmentRegistrationApplicationServiceProxy,
  AnimalOrAgriculturalAssetDto,
  BusinessEntityAssetDto,
  FiscalAssetDto,
  IntellectualPropertyAndTrademarkAssetDto,
  InputLookUpDto,
  MonetaryAssetDto,
  MovableAssetDto,
  OneAssetDto,
  ParticularBenefitAssetDto,
  RealEstateAssetDto,
  RemoveAssetDto,
  LookupApplicationServiceProxy,
  LookupDto,
  LookupExtraData,
  EndowmentAssetDto,
} from '../../services/services-proxies/service-proxies';
import { MapModel } from '../map/map.model';
//import { ActivatedRoute } from '@angular/router';
import { RequestModel } from '../../models/RequestModel';
import { WizardComponent } from "angular-archwizard";
import { MessageTypeEnum } from "../../../../../../../core-lib/src/lib/enums/message-type";
import { MessageSeverity } from "../../../../../../../core-lib/src/lib/enums/message-severity";
import { ComponentBase } from "../../../../../../../core-lib/src/lib/components/ComponentBase/ComponentBase.component";
import { wizardNavDto } from '../../../endowment-registration/models/wizard-nav-data';
import { ActivatedRoute } from '@angular/router';
import { DateFormatterService } from 'projects/shared-features-lib/src/lib/components/ng-bootstrap-hijri-gregorian-datepicker/date-formatter.service';
import { PrimengTableHelper } from 'projects/core-lib/src/lib/helpers/PrimengTableHelper';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-endowment-shared-asset-edit',
  templateUrl: './endowment-asset-edit.component.html',
  styleUrls: ['./endowment-asset-edit.component.css'],
})
export class EndowmentSharedAssetEditComponent extends ComponentBase implements OnInit {
  //#region variables
  primengTableHelper: PrimengTableHelper;

  @Input() viewOnly = false;

  @Input() IsNewAssetRequest = true;

  @Input() @Output() request: RequestModel;

  @Output() OnAddingNewAsset = new EventEmitter<EndowmentAssetDto>();
  @Output() OnEditingExistingAsset = new EventEmitter<EndowmentAssetDto>();
  @Output() OnDeletingExistingAsset = new EventEmitter<{
    assetToDelete: EndowmentAssetDto;
    index: number;
  }>();

  @Output() onBtnNextClicked = new EventEmitter<wizardNavDto>();
  @Output() onBtnPreviousClicked = new EventEmitter<wizardNavDto>();
  @Output() OnCancelClick = new EventEmitter();
  @Input() serialNumber: string | undefined;
  @Input() waqfId: string | undefined;
  @Input() requestId: string;
  @Input() Assets: EndowmentAssetDto[] = [];

  SelectedAssetToEdit: EndowmentAssetDto;
  map: MapModel;
  lookupfliter: InputLookUpDto = new InputLookUpDto();
  assetsSubTypeLookup: LookupDto[] = [];
  assetsTypeLookup: LookupDto[] = [];
  AssetTypeLookup: LookupDto[] = [];
  AssetSizeLookup: LookupDto[] = [];
  RegionLookup: LookupDto[] = [];
  CityLookup: LookupDto[] = [];
  OneRequestAsset: OneAssetDto;
  assetTypeMap: { [value: number]: string } = {};
  assetToEditIndex: number;
  isEditRequested = false;
  isAddRequested = false;
  isViewRequested = false;
  assetSubTypes: LookupDto[];
  ePatternValidation: typeof EnumValidation = EnumValidation;
  @Input() public wizard: WizardComponent;
  wizardNavDto: wizardNavDto = new wizardNavDto();
  newAsset: EndowmentAssetDto | undefined;
  //#endregion
  //assetSubTypes: LookupModel[];
  _lookupExtraData: LookupExtraData;

  constructor(
    private registerWaqfServiceProxy: EndowmentRegistrationApplicationServiceProxy,
    private modalService: NgbModal,
    private lookupssrv: LookupApplicationServiceProxy,
    injecter: Injector,
    private dateHelper: DateFormatterService,
    private activatedRoute: ActivatedRoute,
    public formBuilder: FormBuilder,
    private injector: Injector,
    private _serviceProxyEndowmentRegistraion: EndowmentRegistrationApplicationServiceProxy,
    private cdref: ChangeDetectorRef
  ) /*private activatedRoute: ActivatedRoute*/ {
    super(injecter);
  }
  ngOnInit() {
    this.lookupfliter.lookUpName = 'AssetType';
    this.lookupfliter.filters = [];
    this.lookupssrv.getAllLookups(this.lookupfliter).subscribe((data) => {
      this.assetsTypeLookup = data.dto.items!;
      this.loadAssets();
    });
    this.primengTableHelper = new PrimengTableHelper();


  }
  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }


  getAssetType(assetTypeId: number) {
    if (assetTypeId != undefined) {
      return this.assetsTypeLookup.find(c => c.id == assetTypeId).localizedKey;
    } else {
      return undefined;
    }
  }

  //#region Events

  onEditBtnClicked() {
    this._serviceProxyEndowmentRegistraion
      .editWaqfAssetRequest(this.newAsset)
      .subscribe(
        (data) => {
          if (data) {
            const resAssetData = data;
            if (resAssetData.isSuccess) {
              this.loadAssets();
              this.modalService.dismissAll();
              this.message.showMessage(MessageTypeEnum.toast, {
                closable: true,
                enableService: true,
                summary: '',
                detail: this.l('EndowmentModule.EndowmentRgistrationService.UpdateAssetSuccessMessage'),
                severity: MessageSeverity.Success,
              });
            }
          }
        },
        (err: ApiException) => {
          //handleServiceProxyError(err);
        }
      );
  }

  onCancelBtnClicked() {
    this.OnCancelClick.emit();
    this.modalService.dismissAll();
  }

  onAddBtnClicked() {
    this._serviceProxyEndowmentRegistraion
      .createWaqfRequestAsset(this.newAsset)
      .subscribe(
        (data) => {
          if (data) {
            const resAssetData = data;
            if (resAssetData.isSuccess) {
              this.loadAssets();
              this.modalService.dismissAll();
              this.message.showMessage(MessageTypeEnum.toast, {
                closable: true,
                enableService: true,
                summary: '',
                detail: this.l('EndowmentModule.EndowmentRgistrationService.AddAssetSuccessMessage'),
                severity: MessageSeverity.Success,
              });
            }
          }
        },
        (err: ApiException) => {
          //handleServiceProxyError(err);
        }
      );    //this.OnAddingNewAsset.emit(this.newAsset);
  }


  loadAssets() {
    this.primengTableHelper.showLoadingIndicator();
    if (this.requestId != undefined) {
      this._serviceProxyEndowmentRegistraion.getAssetsByRequestId(
        this.requestId
      ).subscribe((response) => {
        this.Assets = response;
        this.primengTableHelper.records = this.Assets;
        this.primengTableHelper.totalRecordsCount = this.Assets?.length;
      });
    }
    this.primengTableHelper.hideLoadingIndicator();
  }

  async onAddNewAssetClicked(data: any) {
    this.isAddRequested = true;
    this.isEditRequested = false;
    this.isViewRequested = false;
    if (this.requestId == undefined) {
      if (this.request == undefined || this.request.id == undefined) {
        this.requestId = '';
      } // this.activatedRoute.snapshot.params['requestId'];
      else {
        this.requestId = this.request.id;
      }
    }

    this.newAsset = new EndowmentAssetDto();
    this.newAsset.businessEntityAsset = new BusinessEntityAssetDto();
    this.newAsset.realEstateAsset = new RealEstateAssetDto();
    this.newAsset.monetaryAsset = new MonetaryAssetDto();
    this.newAsset.fiscalAsset = new FiscalAssetDto();
    this.newAsset.animalOrAgriculturalAsset = new AnimalOrAgriculturalAssetDto();
    this.newAsset.particularBenefitAsset = new ParticularBenefitAssetDto()
    this.newAsset.movableAsset = new MovableAssetDto();
    this.newAsset.particularBenefitAsset = new ParticularBenefitAssetDto();
    this.newAsset.intellectualPropertyAndTrademarkAsset = new IntellectualPropertyAndTrademarkAssetDto();


    this.newAsset.requestId = this.requestId;
    // this.newAsset.isDirectlyBenefited = true;
    await this.loadAssetType(data);
  }

  async onViewTableCellClicked(content: any, index) {
    this.isViewRequested = true;
    this.isEditRequested = false;
    this.isAddRequested = false;
    await this.showSeletctedAsset(content, index);

  }
  async onEditTableCellClicked(content: any, index: any) {
    this.isViewRequested = false;
    this.isEditRequested = true;
    this.isAddRequested = false;
    await this.showSeletctedAsset(content, index);
  }
  async showSeletctedAsset(content: any, index) {
    var SelectedAsset = this.primengTableHelper.records[index];
    this.newAsset = SelectedAsset;
    //this.newAsset = this.initiateAssetects(this.newAsset, SelectedAssetToView);
    this.newAsset.requestId = this.requestId;
    await this.loadAssetType();
    await this.loadassetSubType(
      this.newAsset.assetTypeId!, content
    );

  }

  onDeleteTableCellClicked(index: number) {
    let body: RemoveAssetDto = new RemoveAssetDto();
    Swal.fire({
      title: this.l('EndowmentModule.EndowmentRgistrationService.ConfirmDeleteAsset'),
      icon: 'question',
      confirmButtonText: this.l('EndowmentModule.EndowmentRgistrationService.Yes'),
      width: 600,
      padding: '3em',
      confirmButtonColor: '#D6BD81',
      cancelButtonText: this.l('EndowmentModule.EndowmentRgistrationService.No'),
      cancelButtonColor: '#00846c',
      showCancelButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        body.requestId = this.requestId;
        body.id = this.primengTableHelper.records[index].id;
        this.Assets.splice(index, 1);

        this._serviceProxyEndowmentRegistraion.deleteWaqfRequestAsset(body).subscribe(res => {
          if (res.isSuccess) {
            this.loadAssets();
            this.message.showMessage(MessageTypeEnum.toast, {
              closable: true,
              enableService: true,
              summary: '',
              detail: this.l('EndowmentModule.EndowmentRgistrationService.DeleteAssetSuccessMessage'),
              severity: MessageSeverity.Success,
            });
          }
        });
      }
    });
  }

  //#endregion

  //#region internal methods

  private loadAssetType(content?: any) {
    this.lookupfliter.lookUpName = 'AssetType';
    this.lookupfliter.filters = [];
    this.lookupssrv.getAllLookups(this.lookupfliter).subscribe((data) => {
      this.AssetTypeLookup = data.dto.items!;
      console.log(data);
      this.loadAssetSize(content);

    });
  }

  private loadAssetSize(content?: any) {
    this.lookupfliter.lookUpName = 'AssetSize';
    this.lookupfliter.filters = [];
    this.lookupssrv.getAllLookups(this.lookupfliter).subscribe((data) => {
      this.AssetSizeLookup = data.dto.items!;
      if (content != undefined) {
        this.modalService.open(content, { size: 'lg' });
      }
    });
  }

  public changeAssetType() {
    this.newAsset.assetSubTypeId = undefined;
    this.newAsset.assetSubTypeDescription = undefined;
    this.loadassetSubType(this.newAsset?.assetTypeId!);
  }

  isNewOrEditAssetValid() {
    return true;
  }

  loadassetSubType(_assetTypeId: number, content?: any) {
    this._lookupExtraData = new LookupExtraData();
    this._lookupExtraData.dataName = 'AssetTypeId';
    this._lookupExtraData.dataValue = _assetTypeId.toString();
    this.lookupfliter.filters = [this._lookupExtraData]
    this.lookupfliter.lookUpName = 'AssetSubType';
    this.lookupssrv.getAllLookups(this.lookupfliter).subscribe((data) => {
      this.assetsSubTypeLookup = data.dto.items!;
      if (this.assetsSubTypeLookup.filter(id => id.id == 12).length <= 0) {
        let otherItem: LookupDto = new LookupDto();
        otherItem.id = 12;
        otherItem.name = this.l('Common.Other');
        this.assetsSubTypeLookup.push(otherItem);
      }
      console.log(data);
      if (content != undefined)
        this.modalService.open(content, { size: 'lg' });
    });

  }
  onNextBtnClicked() {
    if (!this.Assets || this.Assets.length == 0) {
      this.message.showMessage(MessageTypeEnum.toast, {
        closable: true,
        enableService: true,
        summary: '',
        detail: this.l('EndowmentModule.EndowmentRgistrationService.atLeastOneAsset'),
        severity: MessageSeverity.Error,
      });
      return;
    }
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
