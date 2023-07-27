import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EnumValidation } from 'projects/core-lib/src/lib/enums/EnumValidation';
import { AspNetUser } from '../../models/AspNetUser';
 
 

@Component({
  selector: 'app-endowment-applicant-edit',
  templateUrl: './endowment-applicant-edit.component.html'
})
export class EndowmentApplicantEditComponent implements OnInit {
  isApplicantAsAgent = false;
  ePatternValidation = EnumValidation;
  yaqeenValidationResult = true;

  applicantForm: FormGroup;
  attorneyForm:FormGroup;


  yaqeenErrorMessage = '';


  @Input() _applicantData: AspNetUser = new AspNetUser();

  constructor(private fb: FormBuilder) { }

  ngOnInit() {

    this.initiateApplicantForm();
    this.initiateAttorneyForm();
  
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
      birthDateGregorian: [this._applicantData.BirthDateGregorian],
      applicantBirthDate: [this.applicantBirthDate],


    })
  }

  initiateAttorneyForm(){

    this.attorneyForm = this.fb.group({

      attorneyNumber: [,Validators.required],
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
this.isApplicantAsAgent= true;


    }

    else {
this.isApplicantAsAgent=false;
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
