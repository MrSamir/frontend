import { Component, Injector, Input, OnInit, Output, forwardRef } from '@angular/core';
import {
  ApiResponseOfOutputFileDto,
  EndowmentRegistrationApplicationServiceProxy,
  FileLibraryApplicationServiceProxy,
  InputAssetDto,
  InputBusinessEntityAssetDto,
  InputFileDto,
  InputLookUpDto,
  LookupApplicationServiceProxy,
  LookupDto,
  LookupExtraData,
  OutputFileDto,
} from '../../../services/services-proxies/service-proxies';
import { MapModel } from '../../map/map.model';
import { EnumValidation } from 'projects/core-lib/src/lib/enums/EnumValidation';
import { ServiceRequestTypeEnum } from '../../../models/ServiceRequestTypeEnum';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { ComponentBase } from 'projects/core-lib/src/lib/components/ComponentBase/ComponentBase.component';
import { DateFormatterService } from 'projects/shared-features-lib/src/lib/components/ng-bootstrap-hijri-gregorian-datepicker/date-formatter.service';
import { MessageSeverity } from 'projects/core-lib/src/lib/enums/message-severity';
import { MessageTypeEnum } from 'projects/core-lib/src/lib/enums/message-type';
import { AttachementItem } from 'projects/shared-features-lib/src/lib/components/AttachmentViewer/AttachmentViewer.component';
import { ChangeDetectorRef } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { EndowmentRegistrationNewComponent } from '../../../../endowment-registration/components/endowment-registration-new/endowment-registration-new.component';
import { EndowmentSharedAssetEditComponent } from '../endowment-asset-edit.component';

@Component({
  selector: 'app-shared-business-entity-asset',
  templateUrl: './business-entity-asset.component.html',
  styleUrls: ['./business-entity-asset.component.css'],  
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],
  providers: [{ provide: EndowmentSharedAssetEditComponent, useExisting: forwardRef(() => BusinessEntityAssetComponent) }]
})
export class BusinessEntityAssetComponent extends ComponentBase implements OnInit {
  @Input() @Output() assetInfoModel: InputAssetDto;
  @Input() AssetTypeId: number;
  @Input() viewOnly: boolean;
  // regionLookup: LookupModel[];
  // cityLookup: LookupModel[];
  // assetSubTypes: LookupModel[];
  lookupfliter: InputLookUpDto = new InputLookUpDto();
  regionLookup: LookupDto[] = [];
  cityLookup: LookupDto[] = [];
  assetSubTypes: LookupDto[] = [];
  _lookupExtraData: LookupExtraData;
  map: MapModel = new MapModel();
  ePatternValidation: typeof EnumValidation = EnumValidation;
  businessEntityAssetFile: File;
  cityDisabled = false;
  combinedPattern: RegExp;
  businessEntityAssetAttachemt: AttachementItem;

  constructor(
    private cdRef: ChangeDetectorRef,
    private registerWaqfServiceProxy: EndowmentRegistrationApplicationServiceProxy,
    private modalService: NgbModal,
    private lookupssrv: LookupApplicationServiceProxy,
    injecter: Injector,
    private _serviceProxyFileLibrary: FileLibraryApplicationServiceProxy,
    private dateHelper: DateFormatterService,
    private activatedRoute: ActivatedRoute,
    injector: Injector,
  ) {
    super(injecter);
  }

  ngOnInit() {
   
    const patternDecimalValues =
      /^([0-9]{1,10})$|^([0-9]{1,10})(\.)[0-9]{1,4}$/;
    const patternWaqfResponserPortion =
      /^[1-9][0-9]?[0-9]?[0-9]?[0-9]?[0-9]?[0-9]?[0-9]?[0-9]?$/;
    this.combinedPattern = new RegExp(
      `${patternDecimalValues.source}|${patternWaqfResponserPortion.source}`
    );

    //this.combinedPattern = EnumValidation.pattern_CombinedWaqfResponserPortion; //new RegExp(`${EnumValidation.pattern_decimal_values} +"|"+ ${EnumValidation.pattern_WaqfResponserPortion}`);

    

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
      console.log(data);
    });


    
    this._lookupExtraData = new LookupExtraData();
    this._lookupExtraData.dataName = 'AssetTypeId';
    this._lookupExtraData.dataValue = this.AssetTypeId.toString();
    this.lookupfliter.lookUpName = 'AssetSubType';
    this.lookupfliter.filters = [this._lookupExtraData];

    this.lookupssrv.getAllLookups(this.lookupfliter).subscribe((data) => {
      this.assetSubTypes = data.dto.items!;
      console.log(data);
    });
    // this.lookupService.getLookupValues(EnumLookuptypes.RegionLookup).subscribe((res: any) => {
    //   res.subscribe((res: any[]) => {
    //     this.regionLookup = res;
    //   });
    // });

    // this.lookupService.getLookupValues(EnumLookuptypes.CityLookup).subscribe((res) => {
    //   res.subscribe((res) => {
    //     this.cityLookup = res;
    //   });
    // });
    // this.lookupService.getAssetSubTypeByAssetTypeId(this.AssetTypeId).subscribe((result) => {
    //   result.subscribe((assetsSubTypes: LookupModel[]) => {
    //     this.assetSubTypes = assetsSubTypes;
    //   });
    // });
    // this.loadHints();
  }
  getcityLookup(value: any) {
    this._lookupExtraData = new LookupExtraData();

    this._lookupExtraData.dataName = 'regionId';
    this._lookupExtraData.dataValue = value.toString();
    this.lookupfliter.lookUpName = 'City';
    this.lookupfliter.filters = [this._lookupExtraData];

    this.lookupssrv.getAllLookups(this.lookupfliter).subscribe((data) => {
      this.cityLookup = data.dto.items!;
      console.log(data);
    });
  }
  onChangeMap() {
    if (this.map && this.map.longitude && this.map.latitude) {
      this.assetInfoModel.businessEntityAssetObj.longitude = this.map.longitude;
      this.assetInfoModel.businessEntityAssetObj.latitude = this.map.latitude;
    }
  }

  mapNotSelectedYet() {
    return !this.map.longitude || !this.map.latitude;
  }

  loadHints() {
  }

  ChangeCityLookup(value: any) {
    if (value == 'null' || value == undefined) {
      this.assetInfoModel.businessEntityAssetObj.cityId = -1;
    }
  }
  get requestType() {
    return ServiceRequestTypeEnum;
  }

  getLookUpValue(assetSubTypeId: number) {
    if (assetSubTypeId !== undefined)
      return this.assetSubTypes.find(
        (c) => c.id == assetSubTypeId
      )?.name as string;
    else {
      return undefined;
    }
  }


  getCityLookUpValue(cityId: number) {
    if (cityId !== undefined)
      return this.cityLookup.find(c => c.id == cityId)?.name as string;
    else
      return undefined;
  }

  getbusinessEntityAssetLookUpValue(businessEntity: number) {
    if (businessEntity !== undefined)
      return this.regionLookup.find(c => c.id == businessEntity)?.name as string;
    else
      return undefined;
  }

  businessEntityAssetSelect(event: any) {
    this.businessEntityAssetFile = event.files[0];
  }

  businessEntityAssetUpload(event) {
    this.UploadFile(event.files[0], (response) => {
      this.assetInfoModel.businessEntityAssetObj.commercialRegisterAttachmentId = response.id;
      this.businessEntityAssetAttachemt = {
        id: response.id,
        fileName: response.fileName!,
        fileData: response.fileData!,
        ContentType: response.contentType!,
      };
      this.businessEntityAssetFile = null;
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



  businessEntityAssetRemoveFile(event) {
    this.removeFile(event, (result) => {
      this.assetInfoModel.businessEntityAssetObj.commercialRegisterAttachmentId = undefined!;
      this.businessEntityAssetFile = undefined!;
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
