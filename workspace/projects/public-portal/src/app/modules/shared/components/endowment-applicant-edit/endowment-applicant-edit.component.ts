import { Component, Injector, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EnumValidation } from 'projects/core-lib/src/lib/enums/EnumValidation';
import { AspNetUser } from '../../models/AspNetUser';
import {
  ApiResponseOfOutputFileDto,
  EndowmentRegistrationServiceServiceProxy,
  FileExtraData,
  FileLibraryApplicationServiceServiceProxy,
  FileParameter,
  InputApplicantDto,
  InputFileDto,
  InputLookUpDto,
  LookupApplicationServiceServiceProxy,
  LookupDto,
  OutputFileDto,
} from '../../services/services-proxies/service-proxies';
import { FileInputDto } from '../../models/fileupload';
import { RequestTypeEnum } from '../../models/RequestTypeEnum';

import * as fileSaver from 'file-saver';
import { ComponentBase } from 'projects/core-lib/src/lib/components/ComponentBase/ComponentBase.component';
import { MessageTypeEnum } from 'projects/core-lib/src/lib/enums/message-type';
import { fn } from 'moment';
import { DailogType, DialogModel } from 'projects/core-lib/src/lib/models/dialog';


@Component({
  selector: 'app-endowment-applicant-edit',
  templateUrl: './endowment-applicant-edit.component.html',
  providers: [],
})
export class EndowmentApplicantEditComponent
  extends ComponentBase
  implements OnInit
{
  //#region Lookups Dto
  applicantTypeslookup: InputLookUpDto = new InputLookUpDto();
  //#endregion
  //#region Valirables
  applicantTypes: LookupDto[];
   isEndowmer=false;
   isSeer=false;
   isAgent=false;
  //#endregion
  ePatternValidation = EnumValidation;
  yaqeenValidationResult = true;
  applicantForm: FormGroup;
  attorneyForm: FormGroup;
  yaqeenErrorMessage = '';
  @Input() _applicantData: AspNetUser = new AspNetUser();
  maxFileSizeInMB: number = 5;
  allowedFileTypes: string = '.pdf,.doc,.docx,.txt';
  showCancelButton: boolean = true;
  showUploadButton: boolean = true;

  showUploadProgressBar: boolean = true;

  alllowMultipleFiles: boolean = true;

  uploadedFiles: OutputFileDto[] = [];
  //#region  Services
  serviceProxyFileLibrary: FileLibraryApplicationServiceServiceProxy;
  serviceProxyApplicant: EndowmentRegistrationServiceServiceProxy;
  lookkupService: LookupApplicationServiceServiceProxy;
  //#endregion
  constructor(
    injecter: Injector,
    private fb: FormBuilder,
    private _serviceProxyFileLibrary: FileLibraryApplicationServiceServiceProxy,
    private _serviceProxyApplicant: EndowmentRegistrationServiceServiceProxy
  ) {
    super(injecter);
    this.lookkupService = injecter.get(LookupApplicationServiceServiceProxy);
     
  }
  _InputApplicantDto = new InputApplicantDto();
  async ngOnInit() {
    this.initiateApplicantForm();
    this.initiateAttorneyForm();
  }
  async loadApplicantTypes(callback:()=>void) {
    this.applicantTypeslookup.lookUpName = 'ApplicantType';
    this.applicantTypeslookup.filters = [];
    this.lookkupService
      .getAllLookups(this.applicantTypeslookup)
      .subscribe((result) => {
       this.applicantTypes= result.dto.items!;
        
        });
  }

  get requestType() {
    return RequestTypeEnum;
  }

  removeFile(file: any) {
    // this.uploadedFiles = this.uploadedFiles.filter((f) => f !== file);
    console.log('remove file:', file.name);
  }

  downloadFile(fileid: any) {
    // debugger;
    // const file = event.files[0];

    this._serviceProxyFileLibrary
      .downloadFileById('EndowmentAttachment', fileid)
      .subscribe((response: ApiResponseOfOutputFileDto) => {
        //convering base64 to blobpart
        const b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
          const byteCharacters = atob(b64Data);
          const byteArrays = [];
          for (
            let offset = 0;
            offset < byteCharacters.length;
            offset += sliceSize
          ) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);
            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
              byteNumbers[i] = slice.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
           // byteArrays.push(byteArray);
          }

          const blob = new Blob(byteArrays, { type: contentType });
          return blob;
        };

        console.log(response.dto.fileData);
        const blob = b64toBlob(response.dto.fileData, response.dto.contentType);
       /*  const file = new File([blob], response.dto.fileData, {
          type: response.dto.contentType,
        }); */
       // fileSaver.saveAs(file);
      });
  }

  private saveFile(data: Blob, fileName: string): void {
    const file = new File([data], fileName, { type: data.type });
    fileSaver.saveAs(file);
  }

  onFileUpload(event: any) {
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

  get isAlive(): string {
    return this._applicantData.IsAlive ? 'حى' : 'متوفي';
  }

  get applicantBirthDate() {
    return (
      this._applicantData.HijriBirthDate ??
      this._applicantData.BirthDateGregorian
    );
  }

  get applicantform() {
    return this.applicantForm.controls;
  }
  get attorneyform() {
    return this.attorneyForm.controls;
  }
  initiateApplicantForm() {
    this.applicantForm = this.fb.group({
      isApplicantAsAgent: [false],
      firstNameAr: [this._applicantData.FirstNameAr],
      secondNameAr: [this._applicantData.SecondNameAr],
      thirdNameAr: [this._applicantData.ThirdNameAr],
      lastNameAr: [this._applicantData.LastNameAr],
      idNumber: [this._applicantData.IdNumber],
      email: [this._applicantData.Email],
      nationalityName: [this._applicantData.NationalityName],
      isAlive: [this.isAlive],

      mobileNumber: [this._applicantData.MobileNumber],
      applicantBirthDate: [this.applicantBirthDate],
      gender: [
        { value: this._applicantData.Gender.toString(), disabled: true },
      ],
    });
  }

  initiateAttorneyForm() {
    this.attorneyForm = this.fb.group({
      attorneyNumber: [, Validators.required],
      firstNameAr: [],
      secondNameAr: [],
      thirdNameAr: [],
      lastNameAr: [],
      idNumber: [],
    });
  }

  fetchAgentDetails() {}

  ApplicantTypeSelected(event: any) {
    /* if (event.target.checked) {
      this.isApplicantAsAgent = true;
    } else {
      this.isApplicantAsAgent = false;
      // this.nullifyAgentData();
    }*/
  }

  isDeedFound() {
    // if (CreateRegisterWaqfApplicantDtoUtils.isApplicantAsSeer(this.createRegisterWaqfApplicantDto.applicantTypeIds) && !this.createRegisterWaqfApplicantDto.seerDto.seedDeedAttachmentId) {
    //   return false;
    // }
    // if (CreateRegisterWaqfApplicantDtoUtils.isApplicantAsAgent(this.createRegisterWaqfApplicantDto.applicantTypeIds) && !this.createRegisterWaqfApplicantDto.agentDto.representativeAttachmentId) {
    //   return false;
    // }
    return true;
  }

  onNextBtnClicked() {
    // if( !this.requestId && !this.initiated ) {
    //   this.createWaqfApplicant();
    //   return;
    // }
    // this.editWaqfApplicant();
  }
}
