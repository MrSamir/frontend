
import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {
  ApplicationUserServiceServiceProxy, InputLookUpDto,
  LookupApplicationServiceServiceProxy, LookupExtraData, OutputApplicationUserDto, UpdateUserCityRegionInputDto
} from 'projects/public-portal/src/app/modules/shared/services/services-proxies/service-proxies';
import { EnumValidation } from 'projects/core-lib/src/lib/enums/EnumValidation';
import { take } from 'rxjs';
// import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
// import {AwqafValidators} from "@app/_shared/validators/AwqafValidators";
// import {
//   CombinedUserProfile, EmailOtpGenerationInputDto,
//   ErrorDto, OtpVerificationOutputDto,
//   PhoneOtpGenerationInputDto,
//   PhoneOtpVerificationInputDto, ServiceResponse, UpdateRegionCityInputDto,
//   UserProfileServiceProxy
// } from "@app/services/services-proxies/service-proxies";
// import {EnumValidation} from "@app/enum/EnumValidation";
// import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
// import {handleError, showError, showSuccess} from "@app/services/alert/alert.service";
// import {AuthenticationService} from "@app/services/authentication/authentication.service";
// import {LookupModel} from "@app/model/LookupModel";
// import {LookupService, ReverseLookupMap} from "@app/services/lookup/lookup.service";
// import {take} from "rxjs";
// import Swal from "sweetalert2";
// import {appModuleAnimation} from "../../../../shared/animations/routerTransition";
// import {Router} from "@angular/router";
//
// export class otpVerificationResult {
//   isSuccess: boolean;
//   message: string;
//   dismissModal: boolean = false;
// }

@Component({
  selector: 'lib-public-user-profile',
  templateUrl: './public-user-profile.component.html',
  styleUrls: ['./public-user-profile.component.css']
})
export class PublicUserProfileComponent implements OnInit {

  @Input() viewOnly: boolean = false;
  ePatternValidation: typeof EnumValidation = EnumValidation;
  lookupfliter:InputLookUpDto=new InputLookUpDto();
  NationalityLookup:any=[];
  RegioneLookup:any=[];
  CityLookup:any=[];

  _lookupExtraData:   LookupExtraData=new LookupExtraData();

   currentUserProfile: OutputApplicationUserDto;
  //currentUserProfile: any;
  //
  // // confirm mobile vars
   confirmPhoneNumberForm: FormGroup;
  // @ViewChild('otpConfirmationForm') public otpConfirmationForm: NgForm;
  // otpVerificationResult: otpVerificationResult;
  // generatedOtpInfo: OtpVerificationOutputDto | null = null;
  // otpVerificationInput: PhoneOtpVerificationInputDto = new PhoneOtpVerificationInputDto();
  //
  // // confirm email vars
   confirmEmailForm: FormGroup;
  // emailUpdateResult: otpVerificationResult;
  // @ViewChild('updateEmailResultModal') public updateEmailResultModal: NgbModal;
  //
  // // User city and region
   // udateUserLocationForm: FormGroup;
  // cityLookup: LookupModel[] = [];
  // citiLookupsReverseMap: ReverseLookupMap = new ReverseLookupMap([]);
  //
  constructor(
    private  router: Router
    , private  modalService: NgbModal

    , private  userProfileProxyService: ApplicationUserServiceServiceProxy
    //, private authenticationService: AuthenticationService
    , public  lookupService: LookupApplicationServiceServiceProxy) {
  }
  //
  ngOnInit(): void {
    //this.currentUserProfile = true;
    //  this.initConfirmPhoneNumberForm();
    //  this.initUpdateEmailForm();
    //  this.initUpdateUserLocationForm();
    //this.LoadNationalities();
    
    // this.lookupService.fetchRegionsLookups();
    this.init();
  }
  init(){
    //this.LoadRegion();
    this.fetchCurrentUserProfile();
  }

  LoadNationalities()
  {
    this.lookupfliter.lookUpName="Nationality";
    this.lookupfliter.filters=[];
    this.lookupService.getAllLookups(this.lookupfliter).subscribe(
      (data) => {
        this.NationalityLookup=data.dto.items;
        console.log(data);
      }
    );

  }



  LoadRegion()
  {
    this.lookupfliter.lookUpName="Region";
    this.lookupfliter.filters=[];
    this.lookupService.getAllLookups(this.lookupfliter).subscribe(
      (data) => {
        this.RegioneLookup=data.dto.items;
        console.log(data);
      }
    );

  }


  LoadCitiesByRegion(RegionId:number)
  {
    this._lookupExtraData.dataName="RegionId"
    this._lookupExtraData.dataValue=RegionId.toString();
    this.lookupfliter.lookUpName="City";
    this.lookupfliter.filters=[this._lookupExtraData];
    this.lookupService.getAllLookups(this.lookupfliter).subscribe(
      (data) => {
        this.CityLookup=data.dto.items;
        console.log(data);




      }
    );

  }

  // initiateApplicantForm() {
  //   this.applicantForm = this.fb.group({
  //     isApplicantAsAgent: [false],
  //     firstNameAr: [this._applicantData.FirstNameAr],
  //     secondNameAr: [this._applicantData.SecondNameAr],
  //     thirdNameAr: [this._applicantData.ThirdNameAr],
  //     lastNameAr: [this._applicantData.LastNameAr],
  //     idNumber: [this._applicantData.IdNumber],
  //     email: [this._applicantData.Email],
  //     nationalityName: [this._applicantData.NationalityName],
  //     isAlive: [this.isAlive],
  //
  //     mobileNumber: [this._applicantData.MobileNumber],
  //     applicantBirthDate: [this.applicantBirthDate],
  //     gender: [
  //       { value: this._applicantData.Gender.toString(), disabled: true },
  //     ],
  //   });
  // }

  //
  // get confirmPhoneNumberFormRef() {
  //   return this.confirmPhoneNumberForm.controls;
  // }
  //
  // get emailFormRef() {
  //   return this.confirmEmailForm.controls;
  // }
  //
  // get locationFormRef() {
  //   return this.udateUserLocationForm.controls;
  // }
  // //
  // private initConfirmPhoneNumberForm() {
  //   this.confirmPhoneNumberForm = this.formBuilder.group({
  //     phoneNumber: ['', Validators.compose([Validators.required])]
  //   });
  // }
  // //
  // private initUpdateEmailForm() {
  //   this.confirmEmailForm = this.formBuilder.group({
  //     email: ['', Validators.compose([Validators.required])]
  //   });
  // }
  //
  // private initUpdateUserLocationForm() {
  //   this.udateUserLocationForm = this.formBuilder.group({
  //     regionId: [null, Validators.compose([Validators.required])],
  //     cityId: [{value: null, disabled: true}, Validators.compose([Validators.required])]
  //   });
  // }
  //
  // // sms methods
  // showOtpVerificationPopup(content: any) {
  //
  //   this.triggerFormValidation(this.confirmPhoneNumberForm);
  //
  //   if (!this.confirmPhoneNumberForm.valid)
  //     return;
  //
  //   let input = new PhoneOtpGenerationInputDto();
  //   input.phoneNumber = this.confirmPhoneNumberFormRef.phoneNumber.value;
  //
  //   this.userProfileProxyService.generatePhoneNumberOtp(input).subscribe(resp => {
  //     if (resp.isSuccess) {
  //       this.generatedOtpInfo = resp.data;
  //       let modal = this.modalService.open(content,
  //         {
  //           size: "xl",
  //           backdrop: false,
  //           centered: true,
  //           keyboard: false,
  //           scrollable: false
  //         });
  //       modal.result.then((result) => {
  //       }, reason => {
  //         this.generatedOtpInfo = null;
  //       })
  //       return;
  //     }
  //     this.generatedOtpInfo = null;
  //     this.otpVerificationInput = new PhoneOtpVerificationInputDto();
  //
  //   }, error => {
  //     var errorServiceResponse = this.parseHttpError(error);
  //     switch (errorServiceResponse.errorData[0].code) {
  //       case "PhoneIsAlreadyVerified":
  //         showError("رقم الجوال المدخل مستخدم سابقا")
  //         break;
  //       default:
  //         showError("تعذر عملية التحقق. يرجى المحاولة لاحقا")
  //         break;
  //     }
  //   });
  // }
  //
  // onConfirmPhoneNumberButtonClicked(): void {
  //
  //   if (this.otpConfirmationForm.invalid)
  //     return;
  //
  //   this.otpVerificationInput.phoneNumber = this.confirmPhoneNumberForm.controls.phoneNumber.value;
  //   this.otpVerificationInput.hash = this.generatedOtpInfo.hash;
  //
  //   // verifiy otp by calling backend api
  //   this.userProfileProxyService.verifyPhoneNumberOtp(this.otpVerificationInput).subscribe(otpVerfiicationResponse => {
  //     if (otpVerfiicationResponse.isSuccess) {
  //       this.otpVerificationResult = {
  //         dismissModal: false,
  //         isSuccess: true,
  //         message: "تم تحديث رقم الجوال بنجاح"
  //       }
  //       this.fetchCurrentUserProfile();
  //       this.authenticationService.updateUserToken().subscribe((response) => {
  //       });
  //     }
  //   }, error => {
  //     switch (this.parseHttpError(error)?.errorData[0].code) {
  //       case "InvalidOrExpiredOtp":
  //         this.otpVerificationResult = {
  //           dismissModal: false,
  //           isSuccess: false,
  //           message: "رمز التحقق منتهي الصلاحية او غير صحيح"
  //         }
  //         break;
  //       default:
  //         showError('لم تتم عملية التحقق بنجاح. يرجى المحاولة مرة أخرى.')
  //         this.modalService.dismissAll("OtpVerificationFailed");
  //         break;
  //     }
  //   });
  //
  //   // reset OTP verification model
  //
  // }
  //
  // onCancelConfirmPhoneNumberButtonClicked(): void {
  //   this.otpVerificationInput = new PhoneOtpVerificationInputDto();
  //   this.modalService.dismissAll();
  // }
  //
  // // email methods
  // onEmailUpdate(content: any): void {
  //   this.triggerFormValidation(this.confirmEmailForm);
  //
  //   if (this.confirmEmailForm.invalid)
  //     return;
  //
  //   this.emailUpdateResult = new otpVerificationResult();
  //   this.emailUpdateResult.message = "تعذر عملية التحقق. يرجى إعادة المحاولة لاحقا"
  //
  //   this.userProfileProxyService.sendEmailToVerifyUserEmailAddress(new EmailOtpGenerationInputDto({
  //     email: this.confirmEmailForm.controls.email.value,
  //     id: null
  //   })).subscribe(response => {
  //
  //     if (response.isSuccess) {
  //       showSuccess('تم ارسال رسالة تحقق للبريد المدخل.');
  //
  //       this.fetchCurrentUserProfile();
  //       this.authenticationService.updateUserToken().subscribe((response) => {
  //       });
  //       return;
  //     }
  //     this.emailUpdateResult.isSuccess = false;
  //     if (!response.errorData || !response.errorData[0]) return;
  //
  //     switch (response.errorData[0].code) {
  //       case "EmailAlreadyConfirmed":
  //         showError('البريد الألكتروني تم تفعيله من قبل.')
  //         break
  //       case "EmailAlreadyExist":
  //       case "EmailIsAlreadyVerified":
  //         showError('البريد الألكتروني المدخل مستخدم من قبل.')
  //         break;
  //       case "UserIdNotFound":
  //       default:
  //         break;
  //     }
  //   }, (error) => {
  //     showError(this.emailUpdateResult.message);
  //   });
  //
  // }
  //
  // onCloseEmailUpdateResultModal(): void {
  //   this.modalService.dismissAll();
  // }
  //
  onRegionLookupCnaged(e: any) {
    let regionIdVal = e.target.value;
    // if (!regionIdVal || regionIdVal == 'null' || regionIdVal == '') {
    //   this.udateUserLocationForm.controls['regionId'].setValue(null);
    //   this.udateUserLocationForm.controls['cityId'].setValue(null);
    //   this.udateUserLocationForm.controls['cityId'].disable({onlySelf: true});
    //   this.udateUserLocationForm.controls['cityId'].updateValueAndValidity();
    // } else {
    //   this.udateUserLocationForm.controls['regionId'].setValue(regionIdVal);
    //   this.udateUserLocationForm.controls['cityId'].setValue(null);
    //   this.udateUserLocationForm.controls['cityId'].enable()
    //   this.udateUserLocationForm.controls['cityId'].updateValueAndValidity();
    //
    //   this.LoadCitiesByRegion(regionIdVal);
    // }
    this.LoadCitiesByRegion(regionIdVal);
  }
  //
  // onCityLookupChanged(e: any) {
  //   this.udateUserLocationForm.get('cityId').setValue(e.target.value, {onlySelf: true});
  // }
  //
  // private parseHttpError(error: any, showErrorPopup: boolean = false): ServiceResponse {
  //   let errorResponse: ServiceResponse = JSON.parse(error.response);
  //   if (errorResponse && errorResponse.errorData && errorResponse.errorData.length > 0) {
  //     return errorResponse;
  //   }
  //   const unknowErrorDto = <ErrorDto>{
  //     code: "unknowError",
  //     errorData: null,
  //     exceptionDetails: null,
  //     id: null,
  //     message: ""
  //   };
  //
  //   return <ServiceResponse>{
  //     isSuccess: false,
  //     errorData: [unknowErrorDto],
  //     data: null
  //   };
  // }
  //
  // private triggerFormValidation(form: FormGroup) {
  //   Object.keys(form.controls).forEach(field => {
  //     const control = form.get(field);
  //     control.markAsTouched({onlySelf: true});
  //   });
  // }
  //
  private fetchCurrentUserProfile() {
    this.userProfileProxyService.getUserProfile( "c06e6205-c7a9-422c-ba67-df7b8b4bc485").subscribe(response => {
      if (response.isSuccess && response.dto) {
        this.currentUserProfile = response.dto;
        // this.confirmPhoneNumberForm.controls.phoneNumber.setValue(this.currentUserProfile.phoneNumber);
        // this.confirmEmailForm.controls.email.setValue(this.currentUserProfile.email);
        // this.udateUserLocationForm.controls.regionId.setValue(this.currentUserProfile.regionId);
        //
        // if(this.currentUserProfile.regionId && this.currentUserProfile.regionId > 0){
        //   this.lookupService.getCityByRegionID(this.currentUserProfile.regionId).subscribe((res: LookupModel[]) => {
        //     this.cityLookup = res;
        //     this.citiLookupsReverseMap.rebuild(this.cityLookup);
        //     this.udateUserLocationForm.controls.cityId.enable();
        //     this.udateUserLocationForm.controls.cityId.setValue(this.currentUserProfile.cityId);
        //     this.udateUserLocationForm.controls.cityId.updateValueAndValidity();
        //   });
        // }
      }
    });
  }
  //
  //
  onRegionAndCityUpdate() {
    // this.triggerFormValidation(this.udateUserLocationForm);
    // if (this.udateUserLocationForm.invalid)
    //   return;
    
    // this.userProfileProxyService.updateCurrentUserRegionAndCity(new UpdateUserCityRegionInputDto(
    //   {
    //     regionId: this.currentUserProfile.regionId,
        //cityId: this.currentUserProfile.cityId
    //   })).pipe(take(1)).subscribe({
    //   next: (result) => {
    
    //     // this.authenticationService.updateUserToken().subscribe((response) => {
    //     //   showSuccess("تم حفظ البيانات بنجاح", () => {
    //     //     this.modalService.dismissAll()
    //     //   });
    //     // });
    //   },
    //   error: (error) => {
    //     console.error("region / city update failed. ", error);
    //   }
    // });



    this.userProfileProxyService.updateCurrentUserRegionAndCity(new UpdateUserCityRegionInputDto(
      {
        regionId: 1,
        cityId: 1
      })).pipe(take(1)).subscribe({
      next: (result) => {
    
        // this.authenticationService.updateUserToken().subscribe((response) => {
        //   showSuccess("تم حفظ البيانات بنجاح", () => {
        //     this.modalService.dismissAll()
        //   });
        // });
        // showSuccess("تم حفظ البيانات بنجاح", () => {
        //   this.modalService.dismissAll()
        // });
        console.log("suceess");
      },
      error: (error) => {
        console.error("region / city update failed. ", error);
      }
    });
  }

  onEditButtonClick() {
    this.router.navigate(['/public/my-profile'])
  }
}
