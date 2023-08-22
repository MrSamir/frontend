import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AspNetUser } from 'projects/public-portal/src/app/modules/shared/models/AspNetUser';
import {
  ApiException,
  EndowmentRegistrationServiceProxy,
  InputAssetDto,
  InputLookUpDto,
  InputOneAssetDto,
  InputRemoveAssetDto,
  LookupApplicationServiceProxy,
  LookupDto,
  OutputAssetDto,
} from '../../../shared/services/services-proxies/service-proxies';
//import { EndowmentRegistrationServiceProxy } from '../../../shared/services/services-proxies/service-proxies';
import { ArrayExtensions } from 'projects/core-lib/src/lib/helpers/array-extensions';
import { MapModel } from '../../../shared/components/map/map.model';
import { EnumValidation } from 'projects/core-lib/src/lib/enums/EnumValidation';
//import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { handleError} from 'projects/core-lib/src/lib/services/alert/alert.service';
//import { handleError, showError, showSuccess } from 'projects/core-lib/src/lib/services/alert/alert.service';

import { ActivatedRoute } from '@angular/router';
import { WizardComponent, WizardStep } from 'angular-archwizard';

@Component({
  selector: 'app-endowment-registration-new',
  templateUrl: './endowment-registration-new.component.html',
})
export class EndowmentRegistrationNewComponent implements OnInit {
  constructor(
    //private activatedRoute: ActivatedRoute,
    private modalService: NgbModal,
    private lookupssrv: LookupApplicationServiceProxy,
    private _serviceProxyEndowmentRegistraion: EndowmentRegistrationServiceProxy,
    private activatedRoute: ActivatedRoute
  ) {}
  //constructor(private _serviceProxyEndowmentRegistraion:EndowmentRegistrationServiceProxy) { }

  @Input() viewOnly = false;
  @Input() @Output() request: any;
  @Input() requestId: string;
  @Input() waqfId: string | undefined;
  phaseId;
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
  @ViewChild(WizardComponent, {static: true}) public wizard: WizardComponent;

  resolveLookup: any;
  ePatternValidation: typeof EnumValidation = EnumValidation;

  ngOnInit() {
   // this.requestId = '562E7F8E-52B6-44D8-B6B5-C91FCE8BC4EE';
    //this.getLoggedInUserData();
    if (this.requestId == undefined) {
      if (this.request == undefined || this.request.id == undefined) {
        this.requestId = this.activatedRoute.snapshot.params['requestId'];
        this.phaseId = this.activatedRoute.snapshot.params['phaseId'];
      } else {
        this.requestId = this.request.id;
      }
    }

    this.loadAssetType();
    this.loadAssetSize();
    this.loadAssetsBy();
  }
  async moveWizardToTabOfPhase() {
    let count = 0;
    // while( count < this.phaseId ) {
    //   await timeExtensions.sleep(100);
      this.wizard.goToNextStep();
    //   count++;
    // }
  }

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
}
