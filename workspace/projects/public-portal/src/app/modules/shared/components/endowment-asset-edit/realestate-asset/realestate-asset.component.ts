import { Component, Injector, Input, OnInit, Output, forwardRef } from '@angular/core';
import { EnumValidation } from 'projects/core-lib/src/lib/enums/EnumValidation';
import {
  ApiResponseOfOutputFileDto,
  EndowmentRegistrationApplicationServiceProxy,
  FileLibraryApplicationServiceProxy,
  EndowmentAssetDto,
  InputFileDto,
  InputLookUpDto,
  LookupApplicationServiceProxy,
  LookupDto,
  LookupExtraData,
  OutputFileDto,
} from '../../../services/services-proxies/service-proxies';
import { MapModel } from '../../map/map.model';
import { ServiceRequestTypeEnum } from '../../../models/ServiceRequestTypeEnum';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageSeverity } from 'projects/core-lib/src/lib/enums/message-severity';
import { MessageTypeEnum } from 'projects/core-lib/src/lib/enums/message-type';
import { AttachementItem } from 'projects/shared-features-lib/src/lib/components/AttachmentViewer/AttachmentViewer.component';
import { ComponentBase } from 'projects/core-lib/src/lib/components/ComponentBase/ComponentBase.component';
import { ActivatedRoute } from '@angular/router';
import { DateFormatterService } from 'projects/shared-features-lib/src/lib/components/ng-bootstrap-hijri-gregorian-datepicker/date-formatter.service';
import { ControlContainer, NgForm } from '@angular/forms';
import { EndowmentSharedAssetEditComponent } from '../endowment-asset-edit.component';

@Component({
  selector: 'app-shared-realestate-asset',
  templateUrl: './realestate-asset.component.html',
  styleUrls: ['./realestate-asset.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],
  providers: [{ provide: EndowmentSharedAssetEditComponent, useExisting: forwardRef(() => RealestateAssetComponent) }]
})
export class RealestateAssetComponent extends ComponentBase implements OnInit {
  @Input() @Output() assetInfoModel: EndowmentAssetDto;
  @Input() AssetTypeId: number;
  @Input() viewOnly: boolean;
  lookupfliter: InputLookUpDto = new InputLookUpDto();
  regionLookup: LookupDto[] = [];
  cityLookup: LookupDto[] = [];
  @Input() assetSubTypes: LookupDto[] = [];
  _lookupExtraData: LookupExtraData;
  map: MapModel = new MapModel();
  ePatternValidation: typeof EnumValidation = EnumValidation;
  cityDisabled = true;
  // hint key
  //estimatedValuehint:HintEntry;

  constructor(
    private registerWaqfServiceProxy: EndowmentRegistrationApplicationServiceProxy,
    private modalService: NgbModal,
    private lookupssrv: LookupApplicationServiceProxy,
    injecter: Injector,
    private _serviceProxyFileLibrary: FileLibraryApplicationServiceProxy,
    private dateHelper: DateFormatterService,
    private activatedRoute: ActivatedRoute,
  ) {
    super(injecter);
  }

  ngOnInit() {

    this.lookupfliter.lookUpName = 'Region';
    this.lookupfliter.filters = [];
    this.lookupssrv.getAllLookups(this.lookupfliter).subscribe((data) => {
      this.regionLookup = data.dto.items!;
      console.log(data);
    });

    this.lookupfliter.lookUpName = 'City';
    this.lookupfliter.filters = [];
    this.lookupssrv.getAllLookups(this.lookupfliter).subscribe((data) => {
      this.cityLookup = data.dto.items!;
      this.cityDisabled = false;
      console.log(data);
    });


    //  this.lookupService.getAssetSubTypeByAssetTypeId(this.AssetTypeId).subscribe((result) => {
    //    result.subscribe((assetsSubTypes: LookupModel[]) => {
    //      this.assetSubTypes = assetsSubTypes;
    //    });
    //  });
    //this.loadHints();
  }
  getcityLookup(value: any) {
    if (value == undefined || value == '') return;
    this._lookupExtraData = new LookupExtraData();
    this._lookupExtraData.dataName = 'regionId';
    this._lookupExtraData.dataValue = value.toString();
    this.lookupfliter.lookUpName = 'City';
    this.lookupfliter.filters = [this._lookupExtraData];

    this.lookupssrv.getAllLookups(this.lookupfliter).subscribe((data) => {
      this.cityLookup = data.dto.items!;
      this.cityDisabled = false;
      console.log(data);
    });

    // this.lookupService.getCityByRegionID(value).subscribe((res) => {
    //   this.cityLookup = res;
    //   this.cityDisabled = false;
    // });
  }
  onChangeMap() {
    if (this.map && this.map.longitude && this.map.latitude) {
      this.assetInfoModel.realEstateAsset.longitude = this.map.longitude;
      this.assetInfoModel.realEstateAsset.latitude = this.map.latitude;
    }
  }

  loadHints() {
    //this.estimatedValuehint=HintDictionary.getHintByKey("realEstateAsset.EstimatedValue");
  }
  get requestType() {
    return ServiceRequestTypeEnum;
  }

  getSubAssetsById(assetId: number) {
    if (assetId !== undefined)
      return this.assetSubTypes.filter(c => c.id == assetId).map(c => c.name);
    else
      return undefined;
  }

  getCityById(cityId: number) {
    if (cityId !== undefined)
      return this.cityLookup.find(c => c.id == cityId)?.name as string;
    else
      return undefined;
  }

  realestateAssetSelect(event: any) {
    this.realestateAssetFile = event.files[0];
  }

  realestateAssetAttachemt: AttachementItem;
  realestateAssetUpload(event) {
    this.UploadFile(event.files[0], (response) => {
      this.assetInfoModel.realEstateAsset.ownershipDeedAttachementId = response.id;
      this.realestateAssetAttachemt = {
        id: response.id,
        fileName: response.fileName!,
        fileData: response.fileData!,
        ContentType: response.contentType!,
      };
      this.realestateAssetFile = null;
    });
  }

  FileUploadentityName = 'EndowmentAttachment';
  UploadFile(file: File, callback: (response: OutputFileDto) => void) {
    this._serviceProxyFileLibrary
      .uploadFile(
        this.FileUploadentityName,
        { data: file, fileName: file.name },
        []
      )
      .subscribe(
        (response: ApiResponseOfOutputFileDto) => {
          // Handle the successful response here

          if (response?.isSuccess) {
            this.message.showMessage(MessageTypeEnum.toast, {
              closable: true,
              enableService: true,
              summary: this.l('Common.Upload'),
              detail: this.l('Common.SuccesUploadMessge'),
              severity: MessageSeverity.Success,
            });
            callback(response.dto);
          } else {
            this.message.showMessage(MessageTypeEnum.toast, {
              closable: true,
              enableService: true,
              summary: this.l('Common.Upload'),
              detail: response.message!,
              severity: MessageSeverity.Error,
            });
          }
          // Optionally, perform additional actions with the response data
        },
        (error: any) => {
          // Handle the error response here
          this.message.showMessage(MessageTypeEnum.toast, {
            closable: true,
            enableService: true,
            summary: this.l('Common.Upload'),
            detail: this.l('Common.ErrorInFileUpload'),
            severity: MessageSeverity.Error,
          });
          this.Util.error(error);
          // Optionally, perform error handling
        }
      );
  }

  realestateAssetFile: File;
  realestateAssetRemoveFile(event) {
    this.removeFile(event, (result) => {
      this.assetInfoModel.realEstateAsset.ownershipDeedAttachementId = undefined!;
      this.realestateAssetFile = undefined!;
    });
  }


  removeFile(
    event: AttachementItem,
    callback: (item: AttachementItem) => void
  ) {
    const input = new InputFileDto();
    input.entityName = this.FileUploadentityName;
    input.id = event.id;
    input.filters = [];
    this._serviceProxyFileLibrary.deleteFile(input).subscribe((result) => {
      if (result.isSuccess) {
        this.message.showMessage(MessageTypeEnum.toast, {
          closable: true,
          enableService: true,
          summary: '',
          detail: result.message!,
          severity: MessageSeverity.Success,
        });
        callback(event);
      } else {
        this.message.showMessage(MessageTypeEnum.toast, {
          closable: true,
          enableService: true,
          summary: '',
          detail: result.message!,
          severity: MessageSeverity.Error,
        });
      }
    });
  }



}
