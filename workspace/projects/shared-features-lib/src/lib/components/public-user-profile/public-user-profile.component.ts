import { ApiResponseOfOutputApplicationUserDto, EmailOtpGenerationInputDto, InputApplicationUserDto, LookupApplicationServiceProxy, OtpGenerationOutputDto, PhoneOtpGenerationInputDto, UpdateUserCityRegionInputDto } from './../../../../../public-portal/src/app/modules/shared/services/services-proxies/service-proxies';
import {Component, Injector, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ComponentBase } from 'projects/core-lib/src/lib/components/ComponentBase/ComponentBase.component';
import { EnumValidation } from 'projects/core-lib/src/lib/enums/EnumValidation';
import { ApplicationUserServiceProxy, InputLookUpDto, LookupExtraData, OtpVerificationOutputDto, OutputApplicationUserDto, PhoneOtpVerificationInputDto } from 'projects/public-portal/src/app/modules/shared/services/services-proxies/service-proxies';
import { take } from 'rxjs';

export class otpVerificationResult {
  isSuccess: boolean;
  message: string;
  dismissModal: boolean = false;
}

@Component({
  selector: 'lib-public-user-profile',
  templateUrl: './public-user-profile.component.html',
  styleUrls: ['./public-user-profile.component.css']
})
export class PublicUserProfileComponent extends ComponentBase implements OnInit {

  @Input() viewOnly: boolean = false;
  ePatternValidation: typeof EnumValidation = EnumValidation;
  lookupfliter:InputLookUpDto=new InputLookUpDto();
  NationalityLookup:any=[];
  RegioneLookup:any=[];
  CityLookup:any=[];

  _lookupExtraData: LookupExtraData=new LookupExtraData();

  currentUserProfile: OutputApplicationUserDto;

  // confirm mobile vars
  confirmPhoneNumberForm: FormGroup;
  @ViewChild('otpConfirmationForm') public otpConfirmationForm: NgForm;
  otpVerificationResult: otpVerificationResult;
  generatedOtpInfo: OtpGenerationOutputDto | null = null;
  otpVerificationInput: PhoneOtpVerificationInputDto = new PhoneOtpVerificationInputDto();

  // confirm email vars
  confirmEmailForm: FormGroup;
  emailUpdateResult: otpVerificationResult;
  @ViewChild('updateEmailResultModal') public updateEmailResultModal: NgbModal;

  // User city and region
  udateUserLocationForm: FormGroup;

  constructor(
    private router: Router
    , private modalService: NgbModal
    , private formBuilder: FormBuilder
    , private userProfileProxyService: ApplicationUserServiceProxy
    //, private authenticationService: AuthenticationService
    , public lookupService: LookupApplicationServiceProxy,injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.initConfirmPhoneNumberForm();
    this.initUpdateEmailForm();
    this.initUpdateUserLocationForm();
    this.fetchCurrentUserProfile();
    this.LoadNationalities();
    this.LoadRegion();
    //this.lookupService.fetchRegionsLookups();
  }
  LoadNationalities()
  {
    this.lookupfliter.lookUpName="Nationality";
    this.lookupfliter.filters=[];
    this.lookupService.getAllLookups(this.lookupfliter).subscribe(
      (data) => {
        this.NationalityLookup=data.dto.items;
        console.log(data);
        // this.currentUserProfile.phoneNumberConfirmed
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
  get confirmPhoneNumberFormRef() {
    return this.confirmPhoneNumberForm.controls;
  }

  get emailFormRef() {
    return this.confirmEmailForm.controls;
  }

  get locationFormRef() {
    return this.udateUserLocationForm.controls;
  }

  private initConfirmPhoneNumberForm() {
    this.confirmPhoneNumberForm = this.formBuilder.group({
      phoneNumber: ['', Validators.compose([Validators.required, Validators.pattern(this.ePatternValidation.pattern_ksa_mobile_number)])]
    });
  }

  private initUpdateEmailForm() {
    this.confirmEmailForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(this.ePatternValidation.pattern_email)])]
    });
  }

  private initUpdateUserLocationForm() {
    this.udateUserLocationForm = this.formBuilder.group({
      regionId: [null, Validators.compose([Validators.required])],
      cityId: [{value: null, disabled: true}, Validators.compose([Validators.required])]
    });
  }

  // sms methods
  showOtpVerificationPopup(content: any) {

    this.triggerFormValidation(this.confirmPhoneNumberForm);

    if (!this.confirmPhoneNumberForm.valid)
      return;

    let input = new PhoneOtpGenerationInputDto();
    input.phoneNumber = this.confirmPhoneNumberFormRef['phoneNumber'].value;
    input.userId = this.currentUserProfile.id
    this.userProfileProxyService.generatePhoneNumberOtp(input).subscribe(resp => {
      if (resp.isSuccess) {
        this.generatedOtpInfo = resp.dto;
        let modal = this.modalService.open(content,
          {
            size: "xl",
            backdrop: false,
            centered: true,
            keyboard: false,
            scrollable: false
          });
        modal.result.then((result) => {
        }, reason => {
          this.generatedOtpInfo = null;
        })
        return;
      }
      this.generatedOtpInfo = null;
      this.otpVerificationInput = new PhoneOtpVerificationInputDto();

    }, error => {
      // var errorServiceResponse = this.parseHttpError(error);
      // switch (errorServiceResponse.errorData[0].code) {
      //   case "PhoneIsAlreadyVerified":
        //showError(this.l("Common.PhoneNumberAlreadyVerified"))
      //   break;
      //   default:
           //showError(this.l("Common.PhoneVerificationError"))
      //     break;
      // }
    });
  }

  onConfirmPhoneNumberButtonClicked(): void {

    // if (this.otpConfirmationForm.invalid)
    //   return;
debugger;
    this.otpVerificationInput.phoneNumber = this.confirmPhoneNumberForm.controls['phoneNumber'].value;
    this.otpVerificationInput.hash = this.generatedOtpInfo?.hash;
    this.otpVerificationInput.userId = this.currentUserProfile.id;
    // verifiy otp by calling backend api
    this.userProfileProxyService.verifyPhoneNumberOtp(this.otpVerificationInput).subscribe(otpVerfiicationResponse => {
      if (otpVerfiicationResponse.isSuccess) {
        this.otpVerificationResult = {
          dismissModal: false,
          isSuccess: true,
          message: this.l("Common.PhoneNumberUpdatedSeccessfully")
        }
        this.fetchCurrentUserProfile();
        // this.authenticationService.updateUserToken().subscribe((response) => {
        // });
      }
    }, error => {
      // switch (this.parseHttpError(error)?.errorData[0].code) {
      //   case "InvalidOrExpiredOtp":
      //     this.otpVerificationResult = {
      //       dismissModal: false,
      //       isSuccess: false,
      //       message: this.l("Common.InvaliedOtpError")
      //     }
      //     break;
        //default:
          //showError(this.l("Common.PhoneVerificationError"))
          this.modalService.dismissAll("OtpVerificationFailed");
          //break;
      //}
    });

    // reset OTP verification model

  }

  onCancelConfirmPhoneNumberButtonClicked(): void {
    this.otpVerificationInput = new PhoneOtpVerificationInputDto();
    this.modalService.dismissAll();
  }

  // email methods
  onEmailUpdate(content: any): void {
    this.triggerFormValidation(this.confirmEmailForm);

    if (this.confirmEmailForm.invalid)
      return;

    this.emailUpdateResult = new otpVerificationResult();
    this.emailUpdateResult.message = this.l("Common.EmailVerificationError");

    this.userProfileProxyService.sendEmailToVerifyUserEmailAddress(new EmailOtpGenerationInputDto({
      email: this.confirmEmailForm.controls['email'].value,
      userId: this.currentUserProfile.id
    })).subscribe(response => {

      if (response.isSuccess) {
        //showSuccess('تم ارسال رسالة تحقق للبريد المدخل.');

        this.fetchCurrentUserProfile();
        // this.authenticationService.updateUserToken().subscribe((response) => {
        // });
        return;
      }
      this.emailUpdateResult.isSuccess = false;
      if (!response.isSuccess) return;

      // switch (response.message) {
      //   case "EmailAlreadyConfirmed":
          //showError(response.message)
      //     break
      //   case "EmailAlreadyExist":
      //     case "EmailIsAlreadyVerified":
      //       showError('البريد الألكتروني المدخل مستخدم من قبل.')
      //     break;
      //   case "UserIdNotFound":
      //   default:
      //     break;
      // }
    }, (error) => {
      //showError(this.emailUpdateResult.message);
    });

  }

  onCloseEmailUpdateResultModal(): void {
    this.modalService.dismissAll();
  }

  onRegionLookupCnaged(e: any) {
    let regionIdVal = e.target.value;
    if (!regionIdVal || regionIdVal == 'null' || regionIdVal == '') {
      this.udateUserLocationForm.controls['regionId'].setValue(null);
      this.udateUserLocationForm.controls['cityId'].setValue(null);
      this.udateUserLocationForm.controls['cityId'].disable({onlySelf: true});
      this.udateUserLocationForm.controls['cityId'].updateValueAndValidity();
    } else {
      this.udateUserLocationForm.controls['regionId'].setValue(regionIdVal);
      this.udateUserLocationForm.controls['cityId'].setValue(null);
      this.udateUserLocationForm.controls['cityId'].enable()
      this.udateUserLocationForm.controls['cityId'].updateValueAndValidity();

      this.LoadCitiesByRegion(e.target.value);
    }

  }

  onCityLookupChanged(e: any) {
    this.udateUserLocationForm.get('cityId')?.setValue(e.target.value, {onlySelf: true});
  }

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

  //   return <ServiceResponse>{
  //     isSuccess: false,
  //     errorData: [unknowErrorDto],
  //     data: null
  //   };
  // }

  private triggerFormValidation(form: FormGroup) {
    Object.keys(form.controls).forEach(field => {
      const control = form.get(field);
      control?.markAsTouched({onlySelf: true});
    });
  }

  private fetchCurrentUserProfile() {
    this.userProfileProxyService.getCurrentUser().subscribe(response => {
      if (response.isSuccess && response.dto) {
        this.currentUserProfile = response.dto;
        this.confirmPhoneNumberForm.controls['phoneNumber'].setValue(this.currentUserProfile.phoneNumber);
        this.confirmEmailForm.controls['email'].setValue(this.currentUserProfile.email);
        this.udateUserLocationForm.controls['regionId'].setValue(this.currentUserProfile.regionId);
        this.udateUserLocationForm.controls['cityId'].setValue(this.currentUserProfile.cityId);

        if(this.currentUserProfile.regionId && this.currentUserProfile.regionId > 0){
          this.LoadCitiesByRegion(this.currentUserProfile.regionId)
        }
      }
    });
  }


  onRegionAndCityUpdate() {
    this.triggerFormValidation(this.udateUserLocationForm);
    debugger;
    this.userProfileProxyService.updateCurrentUserRegionAndCity(new UpdateUserCityRegionInputDto(
      {
        
        regionId: this.currentUserProfile.regionId,
        cityId: this.currentUserProfile.cityId,
      })).subscribe({
      next: (result: ApiResponseOfOutputApplicationUserDto) => {

        // this.authenticationService.updateUserToken().subscribe((response) => {
        //   showSuccess(this.l("Common.DataSavedSuccessfully"), () => {
        //     this.modalService.dismissAll()
        //   });
        // });
        // showSuccess(this.l("Common.DataSavedSuccessfully"), () => {
          this.modalService.dismissAll()
        //});
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
function appModuleAnimation(): any {
  throw new Error('Function not implemented.');
}

