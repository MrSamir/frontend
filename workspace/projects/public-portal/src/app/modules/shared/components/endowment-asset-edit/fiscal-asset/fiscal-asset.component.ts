import { ChangeDetectorRef, Component, Injector, Input, OnInit, Output, forwardRef } from '@angular/core';
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
  FileByIdDto,
} from '../../../services/services-proxies/service-proxies';
import { EnumValidation } from 'projects/core-lib/src/lib/enums/EnumValidation';
import { ServiceRequestTypeEnum } from '../../../models/ServiceRequestTypeEnum';
import { MessageSeverity } from 'projects/core-lib/src/lib/enums/message-severity';
import { MessageTypeEnum } from 'projects/core-lib/src/lib/enums/message-type';
import { AttachementItem } from 'projects/shared-features-lib/src/lib/components/AttachmentViewer/AttachmentViewer.component';
import { ComponentBase } from 'projects/core-lib/src/lib/components/ComponentBase/ComponentBase.component';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DateFormatterService } from 'projects/shared-features-lib/src/lib/components/ng-bootstrap-hijri-gregorian-datepicker/date-formatter.service';
import { ControlContainer, NgForm } from '@angular/forms';
import { EndowmentSharedAssetEditComponent } from '../endowment-asset-edit.component';

@Component({
  selector: 'app-shared-fiscal-asset',
  templateUrl: './fiscal-asset.component.html',
  styleUrls: ['./fiscal-asset.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],
  providers: [{ provide: EndowmentSharedAssetEditComponent, useExisting: forwardRef(() => FiscalAssetComponent) }]
})
export class FiscalAssetComponent extends ComponentBase implements OnInit {
  @Input() @Output() assetInfoModel: EndowmentAssetDto;
  @Input() AssetTypeId: number;
  @Input() viewOnly: boolean;
  //assetSubTypes:LookupModel[];

  @Input() assetSubTypes: LookupDto[] = [];
  lookupfliter: InputLookUpDto = new InputLookUpDto();
  _lookupExtraData: LookupExtraData;


  ePatternValidation: typeof EnumValidation = EnumValidation;
  currentassetvalueLabel = 'القيمة الحالية للأصل';
  assetAttachementLable = 'الأصل';
  numberOfshareLable: string;
  constructor(
    private registerWaqfServiceProxy: EndowmentRegistrationApplicationServiceProxy,
    private modalService: NgbModal,
    private lookupssrv: LookupApplicationServiceProxy,
    injecter: Injector,
    private _serviceProxyFileLibrary: FileLibraryApplicationServiceProxy,
    private dateHelper: DateFormatterService,
    private activatedRoute: ActivatedRoute,
    private cdref: ChangeDetectorRef
  ) {
    super(injecter);
  }
  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }
  ngOnInit() {
    debugger;
    if (this.assetInfoModel.fiscalAsset) {
      if (this.assetInfoModel.fiscalAsset.fiscalAssetAttachementId) {
        this.getFileById(
          this.assetInfoModel.fiscalAsset.fiscalAssetAttachementId,
          (fileDto) => {
            this.fiscalAssetAttachemt = {
              id: fileDto.id,
              fileName: fileDto.fileName!,
              fileData: fileDto.fileData!,
              ContentType: fileDto.contentType!,
            };
          }
        );
      }
      if (this.assetInfoModel.assetSubTypeId) {
        this.subTypeChanged();
      }
    }
  }
  getFileById(id, callback: (fileDto) => void) {
    var fileinfo: FileByIdDto = new FileByIdDto();
    fileinfo.entityName = this.FileUploadentityName;
    fileinfo.id = id;
    this._serviceProxyFileLibrary
      .downloadFileById(fileinfo)
      .subscribe((result) => {
        if (result.isSuccess) {
          callback(result.dto);
        }
      });
  }
  subTypeChanged() {
    if (
      this.assetInfoModel.assetSubTypeId >= 10 &&
      this.assetInfoModel.assetSubTypeId < 13
    ) {
      this.currentassetvalueLabel = `القيمة الحالية ل${this.assetSubTypes.find(
        (c) => c.id == this.assetInfoModel.assetSubTypeId
      )?.name as string
        }`;

      this.numberOfshareLable = `عدد ال${this.assetSubTypes.find(
        (c) => c.id == this.assetInfoModel.assetSubTypeId
      )?.name as string
        }`;
      this.assetAttachementLable = `${this.assetSubTypes.find(
        (c) => c.id == this.assetInfoModel.assetSubTypeId
      )?.name as string
        }ال`;
    } else {
      this.currentassetvalueLabel = 'القيمة الحالية للأصل';
      this.numberOfshareLable = 'عدد الأصول';
      this.assetAttachementLable = 'الأصل';
    }
  }
  get requestType() {
    return ServiceRequestTypeEnum;
  }

  getLookUpValue(assetSubTypeId: number) {
    return this.assetSubTypes.find(
      (c) => c.id == this.assetInfoModel.assetSubTypeId
    )?.name as string;
  }


  fiscalAssetSelect(event: any) {
    this.fiscalAssetFile = event.files[0];
  }

  fiscalAssetAttachemt: AttachementItem;
  fiscalAssetUpload(event) {
    this.UploadFile(event.files[0], (response) => {
      this.assetInfoModel.fiscalAsset.fiscalAssetAttachementId = response.id;
      this.fiscalAssetAttachemt = {
        id: response.id,
        fileName: response.fileName!,
        fileData: response.fileData!,
        ContentType: response.contentType!,
      };
      this.fiscalAssetFile = null;
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

  fiscalAssetFile: File;
  fiscalAssetRemoveFile(event) {
    this.removeFile(event, (result) => {
      this.assetInfoModel.fiscalAsset.fiscalAssetAttachementId = undefined!;
      this.fiscalAssetFile = undefined!;
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
