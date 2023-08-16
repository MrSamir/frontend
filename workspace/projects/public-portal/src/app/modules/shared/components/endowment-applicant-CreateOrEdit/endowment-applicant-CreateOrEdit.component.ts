import { CUSTOM_ELEMENTS_SCHEMA, Component, Injector, Input, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import {
  ApiResponseOfOutputFileDto,
    ApplicationUserServiceProxy,
    AttorneyInquiryInput,
    EndowmentRegistrationServiceProxy,
  FileLibraryApplicationServiceProxy,
  InputApplicantAgentDto,
  InputApplicantDto,
  InputApplicantEndowmerDto,
  InputApplicantSeerDto,
  InputEndwomentRegistraionRequestApplicantDto,
  InputFileDto,
  InputLookUpDto,
  LookupApplicationServiceProxy,
  LookupDto,
  MOJApplicationServiceProxy,
  OutputApplicationUserDto,
  OutputFileDto,
} from '../../services/services-proxies/service-proxies';
import { ComponentBase } from 'projects/core-lib/src/lib/components/ComponentBase/ComponentBase.component';
import { MessageTypeEnum } from 'projects/core-lib/src/lib/enums/message-type';
import { fn } from 'moment';
import { MessageSeverity } from 'projects/core-lib/src/lib/enums/message-severity';
import { HintModel } from 'projects/core-lib/src/lib/components/hint/hint.component';
import { AttachementItem } from 'projects/shared-features-lib/src/lib/components/AttachmentViewer/AttachmentViewer.component';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-endowment-applicant-CreateOrEdit',
  templateUrl: './endowment-applicant-CreateOrEdit.component.html',
})
export class EndowmentApplicantCreateOrEditComponent
  extends ComponentBase
  implements OnInit
{
  //#region input Lookups Dto
  lookupInput: InputLookUpDto = new InputLookUpDto();
  //#endregion
  //#region Valirables
  requestInfo: InputEndwomentRegistraionRequestApplicantDto =
    new InputEndwomentRegistraionRequestApplicantDto();
  applicantUser: OutputApplicationUserDto = new OutputApplicationUserDto();
  applicantTypes: LookupDto[];
  nationalities: LookupDto[];
  prestigiousAttributeTypes: LookupDto[];
  endowmentPartiesTypes: LookupDto[];
  educationLevels: LookupDto[];
  experienceYears: LookupDto[];
  isEditMode = false;
  isAgent = false;
  isSeer = false;
  isEndwowmer = false;
  @Input() RequestId: string;
  selectedTypes: LookupDto[];
  EndowmerTypeHint: HintModel;
  seerTypeHint: HintModel;
  //#endregion
  yaqeenValidationResult = true;

  yaqeenErrorMessage = '';

  maxFileSizeInMB: number = 5;
  allowedFileTypes: string = '.pdf,.doc,.docx,.txt';
  showCancelButton: boolean = true;
  showUploadButton: boolean = true;

  showUploadProgressBar: boolean = true;

  alllowMultipleFiles: boolean = true;

  uploadedFiles: OutputFileDto[] = [];
  seerDeadAttachemt: AttachementItem;
  agentDeedAttachment: AttachementItem;
  seerDeedFile: File;
  AgentDeed: File;
  FileUploadentityName = 'EndowmentAttachment';
  constructor(
    injecter: Injector,
    private _serviceProxyFileLibrary: FileLibraryApplicationServiceProxy,
    private _endowmentRegistrationService: EndowmentRegistrationServiceProxy,
    private _lookupService: LookupApplicationServiceProxy,
    private _applicationUserService: ApplicationUserServiceProxy,
    private _MojServiceProxy: MOJApplicationServiceProxy,
    private activatedroute:ActivatedRoute
  ) {
    super(injecter);
    this.requestInfo.applicant = new InputApplicantDto();
    this.requestInfo.applicantAgent = new InputApplicantAgentDto();
    this.requestInfo.applicantEndowmer = new InputApplicantEndowmerDto();
    this.requestInfo.applicantSeer = new InputApplicantSeerDto();
  }
  ngOnInit() {
    this.LoadForm();
  }
  onNextBtnClicked(form:NgForm)
  {
    if(form.valid)
    {
      this._endowmentRegistrationService.createOrEditEndowmentRegistrationRequest(this.requestInfo)
      .subscribe((result)=>{
        if(result.isSuccess)
        {
          this.message.showMessage(MessageTypeEnum.toast, {
            closable: true,
            enableService: true,
            summary: '',
            detail: result.message!,
            severity: MessageSeverity.Success,
          });
          this.activatedroute;
        }
      })
    }
  }
  //#region FromAndLookupLoad
  LoadForm() {


    this.LoadLookups('ApplicantType', (lookups) => {
      this.applicantTypes = lookups;
    });
    this.LoadLookups('Nationality', (lookups) => {
      this.nationalities = lookups;
    });
    this.LoadLookups('EndowmentPartiesType', (lookups) => {
      this.endowmentPartiesTypes = lookups;
    });
    this.LoadLookups('PrestigiousAttributeType', (lookups) => {
      this.prestigiousAttributeTypes = lookups;
    });
    this.LoadLookups('EducationLevel', (lookups) => {
      this.educationLevels = lookups;
    });
    this.LoadLookups('ExperienceYear', (lookups) => {
      this.experienceYears = lookups;
    });
    if (this.RequestId == undefined || this.RequestId == '') {
      this.loadCurrentUser();
    } else {
      this.isEditMode = true;
    }
  }
  loadrequest() {
    this._endowmentRegistrationService
      .getEndowmentRegistrationApplicant(this.RequestId)
      .subscribe((result) => {
        if (result.isSuccess) {
          this.requestInfo.init(result.dto);
          if (
            result.dto.applicantSeer.seedDeedAttachmentId != undefined &&
            result.dto.applicantSeer.seedDeedAttachmentId != ''
          ) {
            this.getFileById(
              result.dto.applicantSeer.seedDeedAttachmentId,
              (fileDto) => {
                this.seerDeadAttachemt = {
                  id: fileDto.id,
                  fileName: fileDto.fileName!,
                  fileData: fileDto.fileData!,
                  ContentType: fileDto.contentType!,
                };
              }
            );
          }
          if (
            result.dto.applicantAgent.representativeAttachmentId != undefined &&
            result.dto.applicantAgent.representativeAttachmentId != ''
          ) {
            this.getFileById(
              result.dto.applicantAgent.representativeAttachmentId,
              (fileDto) => {
                this.agentDeedAttachment = {
                  id: fileDto.id,
                  fileName: fileDto.fileName!,
                  fileData: fileDto.fileData!,
                  ContentType: fileDto.contentType!,
                };
              }
            );
          }
        }
      });
  }
  loadCurrentUser() {
    this._applicationUserService.getCurrentUser().subscribe((result) => {
      debugger;
      this.applicantUser = result.dto;
      this.requestInfo.applicant = new InputApplicantDto();
      this.requestInfo.applicant.init(this.applicantUser);
    });
    this.loadEndowmerTypeHint();
    this.loadSeerTypeHint();
  }

  LoadLookups(LookupName: string, callback: (Lookups: LookupDto[]) => void) {
    this.lookupInput.lookUpName = LookupName;
    this.lookupInput.filters = [];
    this._lookupService.getAllLookups(this.lookupInput).subscribe((result) => {
      callback(result.dto.items!);
    });
  }
  loadEndowmerTypeHint() {
    this.EndowmerTypeHint = {
      hintBody: this.l(
        'EndowmentModule.EndowmentRgistrationService.EndowmmentPartyTypeHints'
      ),
      hintHeader: this.l(
        'EndowmentModule.EndowmentRgistrationService.EndowmerType'
      ),
    };
  }
  loadSeerTypeHint() {
    this.seerTypeHint = {
      hintBody: this.l(
        'EndowmentModule.EndowmentRgistrationService.EndowmmentPartyTypeHints'
      ),
      hintHeader: this.l(
        'EndowmentModule.EndowmentRgistrationService.SeerType'
      ),
    };
  }
  //#endregion

  ApplicantTypeSelected(event: any) {
    (event.checked as LookupDto[]).forEach((value, index) => {
      switch (value.id) {
        case 1:
          this.isEndwowmer = true;
          break;
        case 2:
          this.isSeer = true;
          break;
        case 3:
          this.isAgent = true;
          break;
      }
    });
    // check isendowmenr checked.
    if (
      this.selectedTypes.findIndex((value, index) => {
        return value.id == 1;
      }) == -1
    ) {
      this.isEndwowmer = false;
      this.requestInfo.applicantEndowmer = new InputApplicantEndowmerDto();
    }
    //check isSeer checked
    if (
      this.selectedTypes.findIndex((value, index) => {
        return value.id == 2;
      }) == -1
    ) {
      this.isSeer = false;
      this.requestInfo.applicantSeer = new InputApplicantSeerDto();
    }
    //check isAgent checked
    if (
      this.selectedTypes.findIndex((value, index) => {
        return value.id == 3;
      }) == -1
    ) {
      this.isAgent = false;
      this.requestInfo.applicantAgent = new InputApplicantAgentDto();
    }

    if (this.isEndwowmer && this.isAgent) {
      this.selectedTypes = this.selectedTypes.filter((value, index) => {
        return value.id != 3;
      });
      this.message.showMessage(MessageTypeEnum.toast, {
        severity: MessageSeverity.Warning,
        message: '',
        closable: true,
        detail: this.l(
          'EndowmentModule.EndowmentRgistrationService.EndowmerAndAgentDisallowed'
        ),
        summary: '',
        enableService: true,
      });
      return;
    }
    this.requestInfo.applicantTypes = (event.checked as LookupDto[])
      .map((value, index) => {
        return value.id;
      })
      .join(',');
  }

  selectEndowmerType(event: any) {
    debugger;
    var endowmerType = this.endowmentPartiesTypes.filter((ept, index) => {
      return ept.id == event.value;
    })[0];
    if (endowmerType == undefined) this.loadEndowmerTypeHint();
    else
      this.EndowmerTypeHint = {
        hintHeader: endowmerType?.name!,
        hintBody: endowmerType?.hint!,
      };
  }
  selectSeerType(event: any) {
    debugger;
    var Seerype = this.endowmentPartiesTypes.filter((ept, index) => {
      return ept.id == event.value;
    })[0];
    if (Seerype == undefined) this.loadSeerTypeHint();
    else
      this.seerTypeHint = {
        hintHeader: Seerype?.name!,
        hintBody: Seerype?.hint!,
      };
  }
  seerDeedFileSelect(event: any) {
    this.seerDeedFile = event.files[0];
  }

  SeerDeedFileUpload(event: any) {
    this.UploadFile(event.files[0], (response) => {
      this.seerDeadAttachemt = {
        id: response.id,
        fileName: response.fileName!,
        fileData: response.fileData!,
        ContentType: response.contentType!,
      };
      this.seerDeedFile = null!;
      this.requestInfo.applicantSeer.seedDeedAttachmentId = response.id;
    });
  }
  SeerDeedremoveFile(event: AttachementItem) {
    this.removeFile(event, (result) => {
      this.requestInfo.applicantSeer.seedDeedAttachmentId = undefined!;
      this.seerDeadAttachemt = undefined!;
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

          if (response.isSuccess) {
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
    let input = new InputFileDto();
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
  getFileById(id, callback: (fileDto) => void) {
    this._serviceProxyFileLibrary
      .downloadFileById(this.FileUploadentityName, id)
      .subscribe((result) => {
        if (result.isSuccess) {
          callback(result.dto);
        }
      });
  }

  agentDeedFileSelect(event) {
    this.AgentDeed = event.files[0];
  }
  agentDeedFileUpload(event) {
    this.UploadFile(event.files[0], (response) => {
      this.agentDeedAttachment = {
        id: response.id,
        fileName: response.fileName!,
        fileData: response.fileData!,
        ContentType: response.contentType!,
      };
      this.AgentDeed = null!;
      this.requestInfo.applicantAgent.representativeAttachmentId = response.id;
    });
  }
  removeAgentDeedFile(event: AttachementItem) {
    this.removeFile(event, (result) => {
      this.requestInfo.applicantAgent.representativeAttachmentId = undefined!;
      this.agentDeedAttachment = undefined!;
    });
  }
  fetchAgentDetails() {
    let inqury = new AttorneyInquiryInput();
    inqury.code = this.requestInfo.applicantAgent.representativeNumber;
    inqury.identityNumber = this.requestInfo.applicant.idNumber;
    this._MojServiceProxy.attorneyInquiry(inqury).subscribe((result) => {
      if (result.isSuccess) {
        this.requestInfo.applicantAgent.statusId = result.dto.statusId;
        this.requestInfo.applicantAgent.statusName = result.dto.statusName;
        this.requestInfo.applicantAgent.endDateGreg = result.dto.endDateGreg!;
        this.requestInfo.applicantAgent.endDateHijri = result.dto.endDateHijri;
        this.requestInfo.applicantAgent.issueDateGreg =
          result.dto.issueDateGreg!;
        this.requestInfo.applicantAgent.issueDateHijri =
          result.dto.issueDateHijri;
        this.message.showMessage(MessageTypeEnum.toast, {
          closable: true,
          enableService: true,
          summary: '',
          detail: this.l(
            'EndowmentModule.EndowmentRgistrationService.AgentAttorneySuccess'
          ),
          severity: MessageSeverity.Success,
        });
      }
    });
  }
}
