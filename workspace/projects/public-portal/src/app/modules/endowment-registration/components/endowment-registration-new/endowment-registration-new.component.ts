import { EndowmentRegistrationServiceProxy, LookupApplicationServiceProxy } from './../../../shared/services/services-proxies/service-proxies';
import { Component, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AspNetUser } from 'projects/public-portal/src/app/modules/shared/models/AspNetUser';
import {
  ApiException,
  InputAssetDto,
  InputLookUpDto,
  InputOneAssetDto,
  InputRemoveAssetDto,
  LookupDto,
  OutputAssetDto,
} from '../../../shared/services/services-proxies/service-proxies';
//import { EndowmentRegistrationServiceProxy } from '../../../shared/services/services-proxies/service-proxies';
import { MapModel } from '../../../shared/components/map/map.model';
import { EnumValidation } from 'projects/core-lib/src/lib/enums/EnumValidation';
//import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { handleError } from 'projects/core-lib/src/lib/services/alert/alert.service';
//import { handleError, showError, showSuccess } from 'projects/core-lib/src/lib/services/alert/alert.service';

import { ActivatedRoute, NavigationEnd, NavigationExtras, Router } from '@angular/router';

import { WizardComponent, WizardStep } from 'angular-archwizard';
import { wizardNavDto } from '../../models/wizard-nav-data'
import { MenuItem } from 'primeng/api';
import { filter } from 'rxjs';
import { ComponentBase } from 'projects/core-lib/src/lib/components/ComponentBase/ComponentBase.component';

@Component({
  selector: 'app-endowment-registration-new',
  templateUrl: './endowment-registration-new.component.html',
})
export class EndowmentRegistrationNewComponent extends ComponentBase implements OnInit {
  constructor(
    //private activatedRoute: ActivatedRoute,
    private modalService: NgbModal,
    private lookupssrv: LookupApplicationServiceProxy,
    private _serviceProxyEndowmentRegistraion: EndowmentRegistrationServiceProxy,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private injector: Injector
  ) {
    super(injector);
  }
  //constructor(private _serviceProxyEndowmentRegistraion:EndowmentRegistrationServiceProxy) { }

  @Input() viewOnly = false;
  @Input() @Output() request: any;
  @Input() requestId: string;
  @Input() waqfId: string | undefined;
  step;
  //@ViewChild(NgForm, { static: false }) form: NgForm;

  map: MapModel;

  Assets: OutputAssetDto[] = [];
  newAsset: InputAssetDto;
  //requestId:string;
  cancelAsset: OutputAssetDto;
  assetToEditIndex: number;

  lookupfliter: InputLookUpDto = new InputLookUpDto();
  AssetTypeLookup: LookupDto[] = [];
  AssetSizeLookup: LookupDto[] = [];
  RegionLookup: LookupDto[] = [];
  CityLookup: LookupDto[] = [];
  AssetSubType: LookupDto[] = [];
  OneRequestAsset: InputOneAssetDto;
  assetTypeMap: { [value: number]: string } = {};

  isEditRequested = false;
  oldOwnershipDeedAttachementId: string;
  oldFiscalAssetAttachementId: string;
  oldCommercialRegisterAttachmentId: string;

  //@Input() public wizard: WizardComponent;
  @ViewChild(WizardComponent, { static: true }) public wizard: WizardComponent;

  ePatternValidation: typeof EnumValidation = EnumValidation;
  registerUsingendowmentDeedNumber: boolean | undefined = undefined;

  items: MenuItem[];

  activeIndex: number = 0;
  serialNumber: string | undefined;
  ngOnInit() {

    // if (this.requestId && this.step) {
    //   this.moveWizardToTabOfPhase();
    // }
    //TODO: move it to assets page
    // this.loadAssetType();
    // this.loadAssetSize();
    // this.loadAssetsBy();
    this.requestId = this.activatedRoute.snapshot.params['requestId'];
    this.step = this.activatedRoute.snapshot.params['step'];
    this.serialNumber = this.activatedRoute.snapshot.params['serialnumber'];
    this.setActiveIndex();
    this.setSteps();

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.setActiveIndex();
      });
    if (this.requestId == undefined) {
      this.isEditRequested = false;

    } else {
      this.isEditRequested = true;
      this.registerUsingendowmentDeedNumber = false;
    }
  }

  //#region primeng steps
  setActiveIndex() {
    this.activeIndex = this.step - 1;
  }
  setSteps() {
    this.activeIndex = this.step ? this.step - 1 : 0;
    var serviceURL = 'endowmentregistration/registrationform/';
    var serviceStepUrl = serviceURL + this.requestId + '/' + this.step;
    if (!this.serialNumber) {
      serviceStepUrl = serviceURL + this.requestId + '/' + this.step + '/' + this.serialNumber;
    }
    this.items = [
      {
        label: this.l('EndowmentModule.EndowmentRgistrationService.ApplicantInfoStepTitle'),
        url: serviceStepUrl
        //url: 'endowmentregistration/registrationform/' + this.requestId + '/1'

      },
      {
        label: this.l('EndowmentModule.EndowmentRgistrationService.EndowmentInfoStepTitle'),
        url: serviceStepUrl
      },
      {
        label: this.l('EndowmentModule.EndowmentRgistrationService.EndowmentAssetsStepTitle'),
        url: serviceStepUrl
      },
      {
        label: this.l('EndowmentModule.EndowmentRgistrationService.EndowmersStepTitle'),
        url: serviceStepUrl
      },
      {
        label: this.l('EndowmentModule.EndowmentRgistrationService.EndowmentSeersStepTitle'),
        url: serviceStepUrl
      },
      {
        label: this.l('EndowmentModule.EndowmentRgistrationService.EndowmentBenificiarisStepTitle'),
        url: serviceStepUrl
      }
    ];
  }
  //#endregion

  _applicantData: AspNetUser = new AspNetUser();

  getLoggedInUserData() {
    // this._serviceProxy.getByUserName()

    this._applicantData.FirstNameAr = '????';
    this._applicantData.SecondNameAr = '????';
    this._applicantData.ThirdNameAr = '????';
    this._applicantData.LastNameAr = '????';
    this._applicantData.IdNumber = '2088755802';
    this._applicantData.BirthDateGregorian = new Date(Date.parse('01/08/1984'));

    this._applicantData.NationalityName = '????';

    this._applicantData.IsAlive = true;
    this._applicantData.MobileNumber = '2088755802';
    this._applicantData.Email = 'm.eldesouky.c@awqaf.gov.sa';
    this._applicantData.Gender = 0;
  }

  async onAddNewAssetClicked(content: any) {
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
    this.modalService.open(content, { size: 'lg', backdrop: 'static' });
  }

  loadAssetType() {
    this.lookupfliter.lookUpName = 'AssetType';
    this.lookupfliter.filters = [];
    this.lookupssrv.getAllLookups(this.lookupfliter).subscribe((data) => {
      this.AssetTypeLookup = data.dto.items!;
      console.log(data);
    });
  }
  loadAssetSize() {
    this.lookupfliter.lookUpName = 'AssetSize';
    this.lookupfliter.filters = [];
    this.lookupssrv.getAllLookups(this.lookupfliter).subscribe((data) => {
      this.AssetSizeLookup = data.dto.items!;
      console.log(data);
    });
  }

  onAddBtnClicked() {
    //this.setIsAttachmentChanged();

    this._serviceProxyEndowmentRegistraion
      .createWaqfRequestAsset(this.newAsset)
      .subscribe(
        (data) => {
          if (data) {
            const resAssetData = data;
            if (resAssetData.isSuccess) {
              this.loadAssetsBy();
              this.modalService.dismissAll();
              // showSuccess('تم إنشاء الاصل بنجاح',
              //   () => {
              //     this.newAsset.id = resAssetData.dto.toString();
              //     let obj = { asset: resAssetData.dto }
              //     this.modalService.dismissAll();
              //   }
              // )
              // showSuccess('تم إنشاء الاصل بنجاح',
              //   () => {
              //     this.newAsset.id = resAssetData.dto.toString();
              //     let obj = { asset: resAssetData.dto }
              //     this.modalService.dismissAll();
              //   }
              // )
              //this.setOldAttachmentIds();
            }
          }
        },
        (err: ApiException) => {
          //handleServiceProxyError(err);
        }
      );
  }

  onEditBtnClicked() {
    this.newAsset.requestId = this.requestId; //set request ID
    //this.setIsAttachmentChanged();
    this._serviceProxyEndowmentRegistraion
      .editWaqfAssetRequest(this.newAsset)
      .subscribe(
        (data) => {
          const resp = data; //as ApiResponse<any>;
          if (resp.isSuccess) {
            this.loadAssetsBy();
            // showSuccess('تم تعديل الاصل بنجاح', () => {
            //   this.modalService.dismissAll();
            // });
            // showSuccess('تم تعديل الاصل بنجاح', () => {
            //   this.modalService.dismissAll();
            // });
            //this.setOldAttachmentIds();
          }
        },
        (err: ApiException) => {
          handleError(err);
        }
      );

    this.modalService.dismissAll();
  }

  onCancelBtnClicked() {
    this.modalService.dismissAll();
  }

  // Passed new Asset from Common Assets Component in order to add it through calling API from Parent component
  OnAddingNewAsset(newAwqafAsset: InputAssetDto) {
    debugger
    //this.setIsAttachmentChanged(newAwqafAsset);
    this._serviceProxyEndowmentRegistraion
      .createWaqfRequestAsset(newAwqafAsset)
      .subscribe(
        (data) => {
          if (data) {
            const resAssetData = data;
            if (resAssetData.isSuccess) {
              //showSuccess('تم إنشاء الاصل بنجاح', () => {
              // console.log('res here: ', resAssetData);
              // this.newAsset.id = resAssetData.data.toString();
              // let obj = {asset: resAssetData.data}
              //this.modalService.dismissAll();
              //this.loadAssetsBy();
              //});
            }
          }
        },
        (err: ApiException) => {
          //handleServiceProxyError(err);
        }
      );
  }

  // Passed Asset from Common Assets Component in order to delete it through calling API from Parent component
  OnDeletingExistingAsset(event: {
    assetToDelete: OutputAssetDto;
    index: number;
  }) {
    this.onDeleteTableCellClicked(event.assetToDelete, event.index);
  }

  OnEditingExistingAsset(CurrentAsset: InputAssetDto) {
    CurrentAsset.requestId = this.requestId; //set request ID
    //this.setIsAttachmentChanged();
    this._serviceProxyEndowmentRegistraion
      .editWaqfAssetRequest(CurrentAsset)
      .subscribe(
        (data) => {
          const resp = data;
          if (resp.isSuccess) {
            // showSuccess('?? ????? ????? ?????', () => {
            //   this.modalService.dismissAll();
            //   this.loadAssetsBy();
            // });
          }
        },
        (err: ApiException) => {
          //handleServiceProxyError(err);
        }
      );

    this.modalService.dismissAll();
  }

  onDeleteTableCellClicked(assetToDelete: OutputAssetDto, index: number) {
    Swal.fire({
      title: '????? ??? ??? ????? ?',
      icon: 'question',
      confirmButtonText: '??????',
      width: 600,
      padding: '3em',
      confirmButtonColor: '#D6BD81',
    }).then((result) => {
      if (result.isConfirmed) {
        this.OneRequestAsset = new InputRemoveAssetDto();
        this.OneRequestAsset.id = assetToDelete.requestId!;
        this.OneRequestAsset.requestId = this.requestId;

        this._serviceProxyEndowmentRegistraion
          .deleteWaqfRequestAsset(this.OneRequestAsset)
          .subscribe((result) => {
            if (result.isSuccess) {
              this.loadAssetsBy();
              //showSuccess('?? ??? ????? ?????',()=> {
              //this.modalService.dismissAll();
              //});
              // showSuccess('?? ??? ????? ?????', () => {
              //   this.modalService.dismissAll();
              // });
            } //else showError('?? ???? ???');
          });
      }
    });
  }

  isNewOrEditAssetValid() {
    const asset = this.newAsset;
    return (
      !!asset.assetTypeId &&
      !!asset.assetSizeId &&
      !!asset.assetApproximatelyAmount
    ); //&& !!asset.assetInfo && !!asset.cityId && !!asset.regionId;
  }

  onNewAssetIsBenifiedChane(event) {
    // this.newAsset.isDirectlyBenefited = event.target.value == '1';
  }

  onChangeMap() {
    if (this.map && this.map.longitude && this.map.latitude) {
      // this.newAsset.longitude = this.map.longitude;
      // this.newAsset.latitude = this.map.latitude;
    }
  }
  // getcityLookup(value: any) {
  //   this.lookupService.getCityByRegionID(value).subscribe((res: any) => {
  //     this.CityLookup = res;
  //   });
  // }

  mapSelected() {
    if (this.newAsset.assetTypeId == 1) {
      if (
        this.newAsset.businessEntityAsset.longitude &&
        this.newAsset.businessEntityAsset.latitude
      ) {
        return false;
      }
      return true;
    } else if (this.newAsset.assetTypeId == 2) {
      if (
        this.newAsset.realEstateAsset.longitude &&
        this.newAsset.realEstateAsset.latitude
      ) {
        return false;
      }

      return true;
    } else {
      return false;
    }
  }

  IsRequiredDocumentsAttached() {
    if (this.newAsset.assetTypeId == 1) {
      if (this.newAsset.businessEntityAsset.commercialRegisterAttachmentId) {
        return false;
      }
      return true;
    } else if (this.newAsset.assetTypeId == 2) {
      if (this.newAsset.realEstateAsset.ownershipDeedAttachementId) {
        return false;
      }
      return true;
    } else if (this.newAsset.assetTypeId == 3) {
      if (this.newAsset.fiscalAsset.fiscalAssetAttachementId) {
        return false;
      }
      return true;
    } else {
      return false;
    }
  }

  get navigationButtonsDisabled() {
    return this.mapSelected() || this.IsRequiredDocumentsAttached();
  }

  loadAssets() {
    // if (this.requestId != undefined) {
    //   this._serviceProxyEndowmentRegistraion.getWaqfAssetsByRequestId(
    //     this.requestId
    //   ).subscribe((response) => {
    //     if (response.isSuccess) {
    //       this.Assets = response.data;
    //     } else if (response.errorData.length > 0) {
    //       showError('??? ???');
    //     }
    //   });
    // }
  }

  changeAssetType() {
    //this.newAsset=new newAsset();
    // this.newAsset.businessEntityAsset = undefined;
    // this.newAsset.realEstateAsset = undefined;
    // this.newAsset.fiscalAsset = undefined;
    // this.newAsset.movableAsset = undefined;
    // this.newAsset.monetaryAsset = undefined;
    // this.newAsset.particularBenefitAsset = undefined;
    // this.newAsset.intellectualPropertyAndTrademarkAsset = undefined;
    // this.newAsset.animalOrAgriculturalAsset = undefined;
  }

  loadAssetsBy() {
    this.waqfId === undefined ? this.loadAssets() : this.loadAssetsByWaqfId();
  }

  loadAssetsByWaqfId() {
    throw 'not implemented';
  }
  onBtnNextClicked(wizardNavDto: wizardNavDto) {
    if (wizardNavDto.isNaviagateToNext) {
      this.redirectToStep(wizardNavDto);
    }
  }

  onBackBtnClicked(wizardNavDto: any) {
    this.redirectToStep(wizardNavDto);
  }
  redirectToStep(wizardNavDto: wizardNavDto) {
    this.requestId = wizardNavDto.requestId!;
    this.waqfId = wizardNavDto.endowmentId;
    this.step = wizardNavDto.step;
    this.serialNumber = wizardNavDto.serialNumber;
    debugger;
    var params: string[] = [];
    params.push(this.requestId);
    params.push(this.step)
    if (this.serialNumber != undefined && this.serialNumber != '') {
      params.push(this.serialNumber!)
    }
    this.router.navigate(["endowmentregistration/registrationform", ...params], { onSameUrlNavigation: "reload" });

  }

  DeedNumberNotFound($event) {
    this.registerUsingendowmentDeedNumber = false;
  }
}
