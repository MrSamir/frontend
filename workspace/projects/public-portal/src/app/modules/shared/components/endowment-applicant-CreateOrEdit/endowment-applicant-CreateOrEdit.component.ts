import { CUSTOM_ELEMENTS_SCHEMA, Component, Injector, Input, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import {
  ApiResponseOfOutputFileDto,
    ApplicationUserServiceProxy,
    EndowmentRegistrationServiceProxy,
  FileLibraryApplicationServiceProxy,
  InputApplicantAgentDto,
  InputApplicantDto,
  InputApplicantEndowmerDto,
  InputApplicantSeerDto,
  InputEndwomentRegistraionRequestApplicantDto,
  InputLookUpDto,
  LookupApplicationServiceProxy,
  LookupDto,
  OutputApplicationUserDto,
  OutputFileDto,
} from '../../services/services-proxies/service-proxies';
import { ComponentBase } from 'projects/core-lib/src/lib/components/ComponentBase/ComponentBase.component';
import { MessageTypeEnum } from 'projects/core-lib/src/lib/enums/message-type';
import { fn } from 'moment';
import { MessageSeverity } from 'projects/core-lib/src/lib/enums/message-severity';
import { HintModel } from 'projects/core-lib/src/lib/components/hint/hint.component';
import { AttachementItem } from 'projects/shared-features-lib/src/lib/components/AttachmentViewer/AttachmentViewer.component';
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
  seerDeedFile: File;
  AgentDeed: File;
  constructor(
    injecter: Injector,
    private _serviceProxyFileLibrary: FileLibraryApplicationServiceProxy,
    private _serviceProxyApplicant: EndowmentRegistrationServiceProxy,
    private _lookupService: LookupApplicationServiceProxy,
    private _applicationUserService: ApplicationUserServiceProxy
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

  //#region FromAndLookupLoad
  LoadForm() {
    /*TODO: 
     1-check if new request or edit.
     2-load CurrentUser if new
     3-load ApplicantInormation from applicant table. if edit
     4- save if new
     5- update if edit.
    
 */

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
    if (this.RequestId == undefined) {
      this.loadCurrentUser();
    } else {
      this.isEditMode = true;
    }
  }
  loadCurrentUser() {
    this._applicationUserService.getCurrentUser().subscribe((result) => {
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
      this.requestInfo.applicantEndowmer=new InputApplicantEndowmerDto();
    }
    //check isSeer checked
    if (
      this.selectedTypes.findIndex((value, index) => {
        return value.id == 2;
      }) == -1
    ) {
      this.isSeer = false;
      this.requestInfo.applicantSeer=new InputApplicantSeerDto();
    }
    //check isAgent checked
    if (
      this.selectedTypes.findIndex((value, index) => {
        return value.id == 3;
      }) == -1
    ) {
      this.isAgent = false;
      this.requestInfo.applicantAgent=new InputApplicantAgentDto();
    }

    if (this.isEndwowmer && this.isAgent) {
      this.selectedTypes = this.selectedTypes.filter((value, index) => {
        return value.id != 3;
      });
      this.message.showMessage(MessageTypeEnum.message, {
        severity: MessageSeverity.Warning,
        message: '',
        closable: true,
        detail: this.l(
          'EndowmentModule.EndowmentRgistrationService.EndowmerAndAgentDisallowed'
        ),
        summary: '',
        enableService: true,
      });
    }
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
  removeFile(file: any) {
    debugger;
    // this.uploadedFiles = this.uploadedFiles.filter((f) => f !== file);
    console.log('remove file:', file.name);
  }
  seerDeedFileSelect(event: any) {
    this.seerDeedFile = event.files[0];
  }

  SeerDeedFileUpload(event: any) {
    // Handle the file selection event from the PrimeNG FileUpload component
    const file = event.files[0];
    // Additional data (if needed)
    const entityName = 'EndowmentAttachment'; // Replace with the entity name you want to associate with the file

    // Call the service to upload the file
    this._serviceProxyFileLibrary
      .uploadFile(entityName, { data: file, fileName: file.name }, [])
      .subscribe(
        (response: ApiResponseOfOutputFileDto) => {
          // Handle the successful response here

          this.uploadedFiles[0] = response.dto;
          console.log('File upload successful:', response);
          this.showUploadButton = false;
          // Optionally, perform additional actions with the response data
        },
        (error: any) => {
          // Handle the error response here
          console.error('File upload failed:', error);
          // Optionally, perform error handling
        }
      );
  }
  agentDeedFileSelect(event) {}
  agentDeedFileUpload(event)
  {

  }

  fetchAgentDetails() {}

  isDeedFound() {
    return true;
  }
}
