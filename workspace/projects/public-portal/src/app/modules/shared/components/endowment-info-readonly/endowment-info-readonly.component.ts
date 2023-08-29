import {
  ApiException,
  ApiResponse,
  ApiResponseOfOutputFileDto,
  EndowmentRegistrationServiceProxy,
  FileByIdDto,
  FileLibraryApplicationServiceProxy,
  InputFileDto,
  InputLookUpDto,
  LookupApplicationServiceProxy,
  LookupDto,
  LookupExtraData,
  OutputFileDto,
} from './../../services/services-proxies/service-proxies';
import {
  Component,
  Input,
  EventEmitter,
  Output,
  OnInit,
  ViewChild,
  Injector,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { EnumValidation } from 'projects/core-lib/src/public-api';
import { DateFormatterService } from 'projects/shared-features-lib/src/lib/components/ng-bootstrap-hijri-gregorian-datepicker/date-formatter.service';
import { MessageTypeEnum } from 'projects/core-lib/src/lib/enums/message-type';
import { MessageSeverity } from 'projects/core-lib/src/lib/enums/message-severity';
import { InputEndowmentDto } from '../../services/services-proxies/service-proxies';
import { hijriDateExtensions } from '../../models/hijri-date-extensions';
import { AttachementItem } from 'projects/shared-features-lib/src/lib/components/AttachmentViewer/AttachmentViewer.component';
import { wizardNavDto } from '../../../endowment-registration/models/wizard-nav-data';
import { ActivatedRoute } from '@angular/router';
import { ComponentBase } from 'projects/core-lib/src/lib/components/ComponentBase/ComponentBase.component';

@Component({
  selector: 'app-endowment-info-readonly',
  templateUrl: './endowment-info-readonly.component.html',
  styleUrls: ['./endowment-info-readonly.component.css']
})
export class EndowmentInfoReadonlyComponent  extends ComponentBase implements OnInit {
  @Input() public IsCreate = true;
  @Input() InputEndowmentDto: InputEndowmentDto = new InputEndowmentDto();
  @Input() waqfId: string;
  requestId: string;
  @Output() _InputEndowmentDto = new EventEmitter<InputEndowmentDto>();
  @Input() IsDeedDisabled = false;
  @Output() publishNewWaqfRegistered = new EventEmitter<string>();
  @ViewChild(NgForm, { static: false }) form: NgForm;
  @Output() onBtnNextClicked = new EventEmitter<wizardNavDto>();
  @Output() onBtnPreviousClicked = new EventEmitter<wizardNavDto>();
  ePatternValidation = EnumValidation;
  lookupfliter: InputLookUpDto = new InputLookUpDto();
  spendingCategoriesLookup: any = [];
  EndowmentTypeLookup: any = [];
  RegioneLookup: any = [];
  CityLookup: any = [];
  IssuanceCourtsLookup: any = [];
  FileUploadentityName = 'EndowmentAttachment';


  alllowMultipleFiles = true;

  uploadedFiles: OutputFileDto[] = [];
  endowmentDeadAttachemt: AttachementItem;
  agentDeedAttachment: AttachementItem;
  endowmentDeedFile: File;
  AgentDeed: File;
  _lookupExtraData: LookupExtraData = new LookupExtraData();

  wizardNavDto: wizardNavDto = new wizardNavDto();
  // deedCitiesReverseMapLookup: ReverseLookupMap = new ReverseLookupMap([]);

  minHijriForWaqf: NgbDateStruct = { year: 1, month: 1, day: 1 };
  minDeedDate: NgbDateStruct = { year: 912, month: 8, day: 22 };
  maxDeedDate: NgbDateStruct = { year: 912, month: 8, day: 22 };

  endowmentInitialDate: NgbDateStruct;
  endowmentDeedDate: NgbDateStruct;
  oldDeedAttachmentId: string;
  lookupInput: InputLookUpDto = new InputLookUpDto();

  constructor(
    injecter: Injector,
    private _serviceProxyFileLibrary: FileLibraryApplicationServiceProxy,
    private dateHelper: DateFormatterService,
    private registerWaqfServiceProxy: EndowmentRegistrationServiceProxy,
    private lookupssrv: LookupApplicationServiceProxy,
    private activatedRoute: ActivatedRoute,
    injector: Injector,
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.init();
  }

  LoadCitiesByRegion(RegionId: number) {
    this._lookupExtraData.dataName = 'RegionId';
    this._lookupExtraData.dataValue = RegionId?.toString();
    this.lookupfliter.lookUpName = 'City';
    this.lookupfliter.filters = [this._lookupExtraData];
    this.lookupssrv.getAllLookups(this.lookupfliter).subscribe((data) => {
      this.CityLookup = data.dto.items;
      console.log(data);
    });
  }

  init() {
    this.requestId = this.activatedRoute.snapshot.params['requestId'];
    if (!this.requestId || !!this.endowmentInitialDate) {
      return;
    }
    this.LoadLookups('SpendingCategory', (lookups) => {
      this.spendingCategoriesLookup = lookups;
    });
    this.LoadLookups('EndowmentType', (lookups) => {
      this.EndowmentTypeLookup = lookups;
    });
    this.LoadLookups('Region', (lookups) => {
      this.RegioneLookup = lookups;
    });
    
    this.LoadLookups('IssuanceCourt', (lookups) => {
      this.IssuanceCourtsLookup = lookups;
    });
   
    this.LoadWaqf();
    this.setDateLimits();

    if (this.InputEndowmentDto) {
      this.LoadCitiesByRegion(this.InputEndowmentDto?.endowmentDeedRegionId!);

      if (!!this.InputEndowmentDto?.endowmentInitialDate) {
        this.endowmentInitialDate = hijriDateExtensions.parseHijriString(this.InputEndowmentDto.endowmentInitialDate);
      }
      else {
        this.InputEndowmentDto.acceptDonations = false;
        this.InputEndowmentDto.acceptGiveaways = false;
      }

      if (!!this.InputEndowmentDto.endowmentDeedDate) {
        //this.deedDate = hijriDateExtensions.parseHijriString(this.InputEndowmentDto.endowmentDeedDate);
      }

      else {
        // this.InputEndowmentDto.endowmentDeedDate = `${this.endowmentDeedDate.year}/${this.endowmentDeedDate.month}/${this.endowmentDeedDate.day}`
      }
    }
  }
  LoadLookups(LookupName: string, callback: (Lookups: LookupDto[]) => void) {
    this.lookupInput.lookUpName = LookupName;
    this.lookupInput.filters = [];
    this.lookupssrv.getAllLookups(this.lookupInput).subscribe((result) => {
      callback(result.dto.items!);
    });
  }

  ngOnChanges() {
    this.init();
  }
 
  private setDateLimits() {
    this.minDeedDate = { year: 100, month: 1, day: 1 };
    //this.maxDeedDate = this.dateHelper.GetTodayHijri();

    //this.deedDate = this.dateHelper.GetTodayHijri();
    //this.endowmentInitialDate = this.dateHelper.GetTodayHijri();
    this.minHijriForWaqf = { year: 100, month: 1, day: 1 };
  }

  private setOptionsDefaultValues() {
    this.InputEndowmentDto = new InputEndowmentDto();
    this.InputEndowmentDto.acceptDonations = false;
    this.InputEndowmentDto.acceptGiveaways = false;
    this.InputEndowmentDto
  }
   

  get navigationButtonsDisabled() {
    return;
    //   return this.form?.invalid || this.mapNotSelectedYet() || !this.InputEndowmentDto.endowmentInitialDate|| !this.InputEndowmentDto.deedDate ;
  }
  get requestType() {
    return null;  
  }

  onBackBtnClicked() {
    this.wizardNavDto.isNaviagateToNext = true;
    this.wizardNavDto.requestId = this.requestId;
    this.wizardNavDto.step = '1';
    this.wizardNavDto.endowmentId = this.waqfId;
    this.onBtnPreviousClicked.emit(this.wizardNavDto);
  }

  onNextBtnClicked(form: NgForm) {
  }
   


  LoadWaqf() {
    
    this.registerWaqfServiceProxy
      .getEndowmentDataByRequestId(this.requestId)
      .subscribe(
        (result: ApiResponse) => {
          if (result.isSuccess) {
            this.InputEndowmentDto = result.dto;
            if(this.InputEndowmentDto.endowmentDeedRegionId)
            {
              this.LoadCitiesByRegion(this.InputEndowmentDto.endowmentDeedRegionId);
            }
            if (
              this.InputEndowmentDto?.endowmentDeedAttachmentId !=
                undefined &&
                this.InputEndowmentDto?.endowmentDeedAttachmentId != ''
            ) {
              this.getFileById(
                this.InputEndowmentDto?.endowmentDeedAttachmentId,
                (fileDto) => {
                  this.endowmentDeadAttachemt = {
                    id: fileDto.id,
                    fileName: fileDto.fileName!,
                    fileData: fileDto.fileData!,
                    ContentType: fileDto.contentType!,
                  };
                }
              );
            }
          } 
        },
(error)=>{
  this.message.showMessage(MessageTypeEnum.toast, {
    closable: true,
    enableService: true,
    summary: '',
    detail: this.l(
      'Common.CommonError'
    ),
    severity: MessageSeverity.Error,
  });
}
      );
    
  }


  EndowmentDeedFileSelect(event: any) 
  {
    this.endowmentDeedFile = event.files[0];
  }

  EndowmentDeedFileUpload(event: any) {
    this.UploadFile(event.files[0], (response) => {
      this.endowmentDeadAttachemt = {
        id: response.id,
        fileName: response.fileName!,
        fileData: response.fileData!,
        ContentType: response.contentType!,
      };
      this.endowmentDeedFile = null!;
      this.InputEndowmentDto.endowmentDeedAttachmentId = response.id

    });
  }
  EndowmentDeedremoveFile(event: AttachementItem) {
    this.removeFile(event, (result) => {
      this.InputEndowmentDto.endowmentDeedAttachmentId = undefined!;
      this.endowmentDeadAttachemt = undefined!;
    });
  }

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

  removeFile(
    event: AttachementItem,
    callback: (item: AttachementItem) => void
  ) {
    const input = new InputFileDto();
    input.entityName = this.FileUploadentityName;
    input.id = event.id;
    input.filters = [];
    this._serviceProxyFileLibrary.deleteFile(input).subscribe((result) => {
      if (result?.isSuccess) {
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






}

