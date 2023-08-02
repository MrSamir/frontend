import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EnumValidation } from 'projects/core-lib/src/lib/enums/EnumValidation';
import { AspNetUser } from '../../models/AspNetUser';
import { ApiResponseOfOutputFileDto, FileExtraData, FileLibraryApplicationServiceServiceProxy, FileParameter, InputFileDto } from '../../services/services-proxies/service-proxies';
import { FileInputDto } from '../../models/fileupload';




@Component({
  selector: 'app-endowment-applicant-edit',
  templateUrl: './endowment-applicant-edit.component.html',
  providers: []
})
export class EndowmentApplicantEditComponent implements OnInit {
  isApplicantAsAgent = false;
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






  constructor(private fb: FormBuilder, private _serviceProxy: FileLibraryApplicationServiceServiceProxy) { }

  ngOnInit() {

    this.initiateApplicantForm();
    this.initiateAttorneyForm();

  }
  onFileSelect(event: any) {
 // Handle the file selection event from the PrimeNG FileUpload component
 const file = event.files[0];
 // Additional data (if needed)
 const entityName = 'EndowmentAttachment'; // Replace with the entity name you want to associate with the file

 // Call the service to upload the file
 this._serviceProxy.uploadFile(entityName, { data: file, fileName: file.name }, []).subscribe(
   (response: ApiResponseOfOutputFileDto) => {
     // Handle the successful response here
     console.log('File upload successful:', response);
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

    return this._applicantData.IsAlive ? "حى" : "متوفي";
  }

  get applicantBirthDate() {
    return this._applicantData.HijriBirthDate ?? this._applicantData.BirthDateGregorian;
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
      gender: [{ value: this._applicantData.Gender.toString(), disabled: true }],


    })
  }

  initiateAttorneyForm() {

    this.attorneyForm = this.fb.group({

      attorneyNumber: [, Validators.required],
      firstNameAr: [],
      secondNameAr: [],
      thirdNameAr: [],
      lastNameAr: [],
      idNumber: [],


    })

  }

  fetchAgentDetails() { }
  applicantTypeAgentToggled(event: any) {
    if (event.target.checked) {
      this.isApplicantAsAgent = true;


    }

    else {
      this.isApplicantAsAgent = false;
      // this.nullifyAgentData();


    }



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
