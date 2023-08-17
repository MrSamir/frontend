import { ApiResponseOfCitizenInfoResponse } from './../../../../../public-portal/src/app/modules/shared/services/services-proxies/service-proxies';
import {
  Component,
  EventEmitter,
  Injector,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  AlienInfoResponse,
  ApiResponse,
  ApiResponseOfAlienInfoResponse,
  ApiResponseOfOutputApplicationUserDto,
  ApplicationUserServiceProxy,
  CitizenInfoResponse,
  GetAlienInfoInputDto,
  GetCitizenInfoInputDto,
  InputApplicationUserDto,
  InputLookUpDto,
  LookupApplicationServiceProxy,
  LookupDto,
  OutputApplicationUserDto,
  YaqeenApplicationServiceProxy,
} from '../../../../../public-portal/src/app/modules/shared/services/services-proxies/service-proxies';
import { DateFormatterService } from '../ng-bootstrap-hijri-gregorian-datepicker/date-formatter.service';
import { ngBootstrapDatePickerDateType } from '../ng-bootstrap-hijri-gregorian-datepicker/Const';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { handleError } from 'projects/core-lib/src/lib/services/alert/alert.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { EnumValidation } from '../IDNumberWithValidation/EnumValidation';
import { ValidationItem } from '../../Models/validation-item';
import { Subscription, Observable } from 'rxjs';
import { DateTime } from 'luxon';
import {
  isElementBlank,
  isElementInvalid,
  isElementMissed,
  isElementTooShort,
  isElementTouched,
} from 'projects/core-lib/src/lib/Validators/validation-queries';
import { ComponentBase } from 'projects/core-lib/src/lib/components/ComponentBase/ComponentBase.component';

@Component({
  selector: 'yakeen-person',
  templateUrl: './yakeen-person.component.html',
})
export class YakeenPersonComponent extends ComponentBase implements OnInit, OnDestroy {
  
  @Output() OnNewCitizenValidated = new EventEmitter<{ citizenInfo: CitizenInfoResponse, idType: number, userName: string, person: InputApplicationUserDto, isValid: boolean }>();
    @Output() OnNewAlienValidated = new EventEmitter<{ alienInfo: AlienInfoResponse, idType: number, userName: string, person: InputApplicationUserDto, isValid: boolean }>();
  
  @Output() OnNewPersonAvailable = new EventEmitter<{
    idType: number;
    userName: string;
    person: InputApplicationUserDto;
  }>();
  // @Output() OnNewHafezaValidated = new EventEmitter<{hafeza:AddHafezaInputDto, isValid:boolean}>();
  // @Output() OnEditHafezaValidated = new EventEmitter<{editHafeza:EditHafezaInputDto, isValid:boolean}>();
  @Input() initialData: { citizen: CitizenInfoResponse | undefined, alien: AlienInfoResponse | undefined, person: InputApplicationUserDto | undefined};
  @Input() fromSeer: boolean = false;
  lookupfliter: InputLookUpDto = new InputLookUpDto();
  IdTypeLookup: LookupDto[] = [];
  myselectedDateType: ngBootstrapDatePickerDateType =
    ngBootstrapDatePickerDateType.Hijri;
  birthdateLable: string = this.l("Common.dateOfBirthHijri");
  constructor(
    private formBuilder: FormBuilder,
    private dateHelper: DateFormatterService,
    private lookupService: LookupApplicationServiceProxy,
    private yakeenValidationService: YaqeenApplicationServiceProxy,
    private PersonalInformationServiceProxy: ApplicationUserServiceProxy,
    injector: Injector
  ) {
    super(injector);
  }

  newPerson: InputApplicationUserDto | undefined; // When we finish yakeen validation we ask the system for the person if found through his IdNumber
  newCreatedYakeenPerson: InputApplicationUserDto | undefined
  mobileEditAllowed = true;
  emailEditAllowed = true;

  isVaild: boolean = false;

  yakeenValidationActions = {
    '1': this.validateCitizen.bind(this),
    '2': this.validateAlien.bind(this),
    '3': '',
    '4': '',
  };

  onCitizenValidated = (res: CitizenInfoResponse) => {
    this.citizenInfoResponse = res;
    this.citizenInfoResponse.dateOfBirthH = this.personDateString;
    var YaqeenPersonInfo = new InputApplicationUserDto();
    YaqeenPersonInfo.userName =
      this.personForm.value.saudiNationalId ?? undefined;
    YaqeenPersonInfo.birthDateHijri = this.citizenInfoResponse.dateOfBirthH;
    YaqeenPersonInfo.idTypeId = this.personForm.value.selectedTypeId
      ? parseInt(this.personForm.value.selectedTypeId)
      : 0;

      YaqeenPersonInfo.firstNameAr = this.citizenInfoResponse.firstName;
      YaqeenPersonInfo.secondNameAr = this.citizenInfoResponse.fatherName;
      YaqeenPersonInfo.thirdNameAr = this.citizenInfoResponse.grandFatherName;
      YaqeenPersonInfo.lastNameAr = this.citizenInfoResponse.familyName;
      YaqeenPersonInfo.gender=(this.citizenInfoResponse.gender==='Male'||this.citizenInfoResponse.gender==='M' || this.citizenInfoResponse.gender =='m')?0:1;
      YaqeenPersonInfo.isAlive = this.citizenInfoResponse.lifeStatus == 0?true:false;
      YaqeenPersonInfo.firstNameEn = this.citizenInfoResponse.englishFirstName;
      YaqeenPersonInfo.secondNameEn = this.citizenInfoResponse.englishSecondName;
      YaqeenPersonInfo.thirdNameEn = this.citizenInfoResponse.englishThirdName;      
      YaqeenPersonInfo.lastNameEn = this.citizenInfoResponse.englishLastName;
      YaqeenPersonInfo.idExpiryDate = this.citizenInfoResponse.idExpiryDate;
      YaqeenPersonInfo.idIssueDate = this.citizenInfoResponse.idIssueDate;
      YaqeenPersonInfo.idIssuePlace = this.citizenInfoResponse.idIssuePlace;
      YaqeenPersonInfo.placeOfBirth = this.citizenInfoResponse.placeOfBirth;
      YaqeenPersonInfo.nationalityId = this.citizenInfoResponse.nationalityId;
      
    this.PersonalInformationServiceProxy.ensureYaqeenPersonalInfo(
      YaqeenPersonInfo
    ).subscribe(
      (fetchedPerson: ApiResponseOfOutputApplicationUserDto) => {
        this.newCreatedYakeenPerson = fetchedPerson.dto;

        this.OnNewCitizenValidated.emit({
          citizenInfo: this.citizenInfoResponse?? new CitizenInfoResponse(),
          idType: this.personForm.value.selectedTypeId
            ? parseInt(this.personForm.value.selectedTypeId)
            : 0,
          userName: this.personForm.value.saudiNationalId ?? '',
          person: this.newCreatedYakeenPerson,
          isValid: this.isVaild,
        });
        this.personForm.controls.birthdate.disable();
        this.personForm.controls.saudiNationalId.disable();
        this.onPersonFetched(this.newCreatedYakeenPerson);
      },
      (err) => handleError<object>(err.error)
    );
  };

  onAlienValidated = (res: AlienInfoResponse) => {
    debugger;
    this.alienInfoResponse = res;
    const timestamp = Date.parse(this.personDateString ?? '');
    if (!isNaN(timestamp)) {
      const date = new Date(timestamp);
      this.alienInfoResponse.dateOfBirthG = DateTime.fromJSDate(date);
    }
    var YaqeenPersonInfo = new InputApplicationUserDto();
    this.AlienToPerson(this.alienInfoResponse);
    YaqeenPersonInfo.userName = this.personForm.value.iqamaId ?? undefined;
    YaqeenPersonInfo.birthDate = this.alienInfoResponse.dateOfBirthG;
    YaqeenPersonInfo.idTypeId = this.personForm.value.selectedTypeId
      ? parseInt(this.personForm.value.selectedTypeId)
      : 0;

      YaqeenPersonInfo.firstNameAr = this.alienInfoResponse.firstName;
      YaqeenPersonInfo.secondNameAr = this.alienInfoResponse.secondName;
      YaqeenPersonInfo.thirdNameAr = this.alienInfoResponse.thirdName;
      YaqeenPersonInfo.lastNameAr = this.alienInfoResponse.lastName;
      YaqeenPersonInfo.gender=(this.alienInfoResponse.gender==='Male'||this.alienInfoResponse.gender==='M' || this.alienInfoResponse.gender =='m')?0:1;
      YaqeenPersonInfo.isAlive = this.alienInfoResponse.lifeStatus == 0?true:false;
      YaqeenPersonInfo.firstNameEn = this.alienInfoResponse.englishFirstName;
      YaqeenPersonInfo.secondNameEn = this.alienInfoResponse.englishSecondName;
      YaqeenPersonInfo.thirdNameEn = this.alienInfoResponse.englishThirdName;      
      YaqeenPersonInfo.lastNameEn = this.alienInfoResponse.englishLastName;
      YaqeenPersonInfo.iqamaExpiryDateGregorian = this.alienInfoResponse.iqamaExpiryDateG;
      YaqeenPersonInfo.iqamaIssueDateGregorian = this.alienInfoResponse.iqamaIssueDateG;
      YaqeenPersonInfo.iqamaIssuePlaceCode = this.alienInfoResponse.iqamaIssuePlaceCode?.toString();
      YaqeenPersonInfo.placeOfBirthCode = this.alienInfoResponse.placeOfBirthCode?.toString();
      YaqeenPersonInfo.placeOfBirth = this.alienInfoResponse.placeOfBirthAr;
      YaqeenPersonInfo.nationalityId = this.alienInfoResponse.awqafNatinaityId;



    this.PersonalInformationServiceProxy.ensureYaqeenPersonalInfo(
      YaqeenPersonInfo
    ).subscribe((fetchedPerson: ApiResponseOfOutputApplicationUserDto) => {
      debugger;
      this.OnNewAlienValidated.emit({
        alienInfo: this.alienInfoResponse?? new AlienInfoResponse(),
        idType: this.personForm.value.selectedTypeId
          ? parseInt(this.personForm.value.selectedTypeId)
          : 0,
        userName: this.personForm.value.iqamaId?.toString() ?? '',
        person: fetchedPerson.dto,
        isValid: this.isVaild,
      });
      debugger;
      this.personForm.controls.birthdate.disable();
      this.personForm.controls.iqamaId.disable();
      this.onPersonFetched(fetchedPerson.dto);
    });
  };
  AlienToPerson (alienInfoResponse: AlienInfoResponse) : InputApplicationUserDto {
    var YaqeenPersonInfo = new InputApplicationUserDto();
    return YaqeenPersonInfo;
  }
  yakeenValidationResultAction = {
    '1': this.onCitizenValidated,
    '2': this.onAlienValidated,
  };

  initFormFromInitialData() {
    if (
      !!this.initialData &&
      !!this.initialData.person &&
      (!!this.initialData.alien || !!this.initialData.citizen)
    ) {
      this.personForm.controls.selectedTypeId.setValue(
        this.initialData.person.idTypeId?.toString() ?? ''
      );
      this.personForm.controls.iqamaId.setValue(
        this.initialData.person?.userName ?? ''
      );
      this.personForm.controls.saudiNationalId.setValue(
        this.initialData.person?.userName ?? ''
      );
      this.personDateString = !!this.initialData.person.birthDate
        ? this.initialData.person.birthDate.toString()
        : this.initialData.person.birthDateHijri;
      this.citizenInfoResponse = this.initialData.citizen;
      this.alienInfoResponse = this.initialData.alien;
      this.onPersonFetched(this.initialData.person);

      this.personForm.controls.birthdate.disable();
      this.personForm.controls.saudiNationalId.disable();
      this.personForm.controls.iqamaId.disable();
    }
  }

  // Whether it gets fetched from url hit or passed from the parent
  onPersonFetched(fetchedPerson: InputApplicationUserDto | undefined) {
    debugger;
    this.newPerson = fetchedPerson;
    this.mobileEditAllowed =
      !!this.newPerson &&
      (!this.newPerson?.phoneNumber || !this.newPerson?.phoneNumberConfirmed);
    this.emailEditAllowed =
      !!this.newPerson &&
      (!this.newPerson?.email || !this.newPerson?.emailConfirmed);
    if (!!this.newPerson) {
      this.personAppendixForm.controls.mobileNumber.setValue(
        this.newPerson?.phoneNumber ?? ''
      );
      this.personAppendixForm.controls?.email.setValue(
        this.newPerson?.email ?? ''
      );
    }
    this.newPerson = fetchedPerson;
  }

  reason: string = '';
  personDate: NgbDateStruct;
  personDateString: string | undefined;
  alienInfoResponse: AlienInfoResponse | undefined;
  citizenInfoResponse: CitizenInfoResponse | undefined ;

  // idTypeLables = [
  //     'هوية وطنية',
  //     'إقامة',
  //     'حفيظة نفوس',
  //     'لا يوجد'
  // ];

  // patterns = [
  //   EnumValidation.pattern_nationalId,
  //   EnumValidation.pattern_iqama,
  //   EnumValidation.pattern_number_attribute_validation,
  // ];

  personForm = this.formBuilder.group({
    selectedTypeId: ['', [Validators.required]],
    saudiNationalId: [
      { value: '', disabled: true },
      [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern(EnumValidation.pattern_nationalId),
      ],
    ],
    iqamaId: [
      { value: '', disabled: true },
      [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern(EnumValidation.pattern_iqama),
      ],
    ],
    birthdate: [
      { value: '', disabled: true },
      [Validators.required, Validators.pattern(EnumValidation.pattern_date)],
    ],
  });

  personAppendixForm = this.formBuilder.group({
    mobileNumber: [
      '',
      [Validators.pattern(EnumValidation.pattern_ksa_mobile_number)],
    ],
    email: [
      '',
      [Validators.required, Validators.pattern(EnumValidation.pattern_email)],
    ],
  });

  mobileNumberValidationItems: ValidationItem[] = [
    { message: this.l("Common.missingMobileNumber"), flag: isElementMissed.bind(this, this.personAppendixForm, 'mobileNumber') },
    { message: this.l("Common.invalidMobile"), flag: isElementInvalid.bind(this, this.personAppendixForm, 'mobileNumber') }
  ];

  emailValidationItems: ValidationItem[] = [
    {message: this.l("Common.missingEmail"), flag: isElementMissed.bind(this, this.personAppendixForm, 'email')},
    { message: this.l("Common.invalidEmail"), flag: isElementInvalid.bind(this, this.personAppendixForm, 'email') }
  ];

  performAppendixFormSubscription: Subscription;

  get selectedTypeName() {
    // if(!!this.initialData.hafeza){
    //   return this.IdTypeLookup[this.initialData.hafeza.idTypeId + 11]
    // }
    // else
    //   if (this.personForm.value.selectedTypeId > 3) {
    //     return undefined;
    // }
    let name: string | undefined;
    if (
      this.IdTypeLookup.length > 0 &&
      this.personForm.value.selectedTypeId != undefined
    ) {

      name =
        this.IdTypeLookup[(parseInt(this.personForm.value.selectedTypeId) - 1)]?.name;
    }
    return name;
  }

  InitiateForm() {
    this.personForm.controls.birthdate.enable();
    this.personForm.controls.iqamaId.enable();
    this.personForm.controls.saudiNationalId.enable();
  }

  ngOnInit(): void {
    this.lookupfliter.lookUpName = 'IdType';
    this.lookupfliter.filters = [];
    this.lookupService
      .getAllLookups(this.lookupfliter)
      .subscribe((data) => {
        this.setLookupIdTypes(data);
        this.personForm.controls.birthdate.enable();
            this.personForm.controls.iqamaId.enable();
            this.personForm.controls.saudiNationalId.enable();
            this.initFormFromInitialData();
        console.log(data);
      });
      if (this.initialData.citizen){
        this.citizenInfoResponse = this.initialData.citizen;
      }
      if (this.initialData.alien){
        this.alienInfoResponse = this.initialData.alien;
      }
      this.subscribeToChanges();
  }
  setLookupIdTypes(data: any) {
    this.IdTypeLookup = data.dto.items!;
  }

  subscribeToChanges() {
    this.performAppendixFormSubscription =
      this.personAppendixForm.valueChanges.subscribe((values) => {
        if (this.personAppendixForm.valid && this.newPerson != undefined) {
          this.newPerson.email =
            this.personAppendixForm.value.email ?? undefined;
          this.newPerson.phoneNumber =
            this.personAppendixForm.value.mobileNumber ?? undefined;
          this.OnNewPersonAvailable.emit({
            idType: this.personForm.value.selectedTypeId
              ? parseInt(this.personForm.value.selectedTypeId)
              : 0,
            userName: this.newPerson?.userName ?? '',
            person: this.newPerson,
          });
        }
      });
  }

  ngOnDestroy() {
    if (!!this.performAppendixFormSubscription) {
      this.performAppendixFormSubscription.unsubscribe();
    }
  }

  ePatternValidation: typeof EnumValidation = EnumValidation;

  // date component props
  min: NgbDateStruct;
  maxToday: NgbDateStruct;

  private setDateLimits() {
    if (this.myselectedDateType == ngBootstrapDatePickerDateType.Hijri) {
      this.min = { year: 1286, month: 1, day: 1 };
      //this.maxToday= this.dateHelper.GetTodayHijri();
      this.maxToday.year -= 18;
    } else {
      this.min = { year: 1870, month: 1, day: 1 };
      this.maxToday = this.dateHelper.GetTodayGregorian();
      this.maxToday.year -= 18;
    }
  }

  beforeInput(event: InputEvent) {
    if (!event.data) {
      return true;
    }
    var num = parseInt(event.data);
    return !isNaN(num);
  }

  onPersonDateChange(date: NgbDateStruct) {
    if (this.personDate)
      this.personDateString = `${this.personDate.year}-${this.personDate.month}-${this.personDate.day}`;
    else this.personDateString = '';
  }

  get isInvalid() {
    if (this.personForm.value.selectedTypeId === '1') {
      return (
        this.isElementInvalid('saudiNationalId') ||
        !this.personDateString ||
        this.isElementBlank('saudiNationalId')
      );
    }
    if (this.personForm.value.selectedTypeId === '2') {
      return (
        this.isElementInvalid('iqamaId') ||
        !this.personDateString ||
        this.isElementBlank('iqamaId')
      );
    }
    return true;
  }

  onValidateBtnClicked() {
    debugger;
    this.yakeenValidationActions[
      this.personForm.value.selectedTypeId ?? 0
    ]().subscribe(
      (res) => {
        this.yakeenValidationResultAction[
          this.personForm.value.selectedTypeId ?? 0
        ](res.dto);
      },
      (err) => {
        handleError<object>(err.error);
      }
    );
  }

  validateCitizen(): Observable<ApiResponseOfCitizenInfoResponse> {
    var citizen: CitizenInfoResponse = new CitizenInfoResponse();
    var citizenInfo = new GetCitizenInfoInputDto();
    citizenInfo.nin = this.personForm.value.saudiNationalId ?? undefined;
    citizenInfo.dateOfBirth = this.personDateString;
    return this.yakeenValidationService
      .getCitizenInfo(citizenInfo);
  }

  validateAlien(): Observable<ApiResponseOfAlienInfoResponse> {
    debugger;
    var alienInfo = new GetAlienInfoInputDto();
    alienInfo.iqama = this.personForm.value.iqamaId ?? undefined;
    alienInfo.dateOfBirth = this.personDateString;
    return this.yakeenValidationService
      .getAlienInfo(alienInfo);
  }

  saudiNationalIdValidationItems: ValidationItem[] = [
    {
      message: this.l("Common.NationalIdNumberRequired"),
      flag: isElementMissed.bind(this, this.personForm, 'saudiNationalId'),
    },
    {
      message: this.l("Common.NationalIdNumberLengthValidation"),
      flag: isElementTooShort.bind(this, this.personForm, 'saudiNationalId'),
    },
    {
      message: this.l("Common.NationalIdNumberStartsWithOne"),
      flag: this.saudiNationalIdNoStartWithOne.bind(this),
    },
  ];

  iqamaIdValidationItems: ValidationItem[] = [
    {
      message: this.l("Common.IqamaNumberRequired"),
      flag: isElementMissed.bind(this, this.personForm, 'iqamaId'),
    },
    {
      message: this.l("Common.IqamaNumberLengthValidation"),
      flag: isElementTooShort.bind(this, this.personForm, 'iqamaId'),
    },
    {
      message: this.l("Common.IqamaNumberStartsWithTwo"),
      flag: this.iqamaIdNoStartWithTwo.bind(this),
    },
  ];

  DateValidationItems: ValidationItem[] = [
    {
      message: this.l("Common.BirthDateRequired"),
      flag: isElementMissed.bind(this, this.personForm, 'birthdate'),
    },
    { message: this.l("Common.BirthDateInvalid"), flag: this.invalidDate.bind(this) },
  ];

  isElementInvalid(elementName: string) {
    return isElementInvalid(this.personForm, elementName);
  }

  isElementInvalidAnyForm(form: FormGroup, elementName: string) {
    return isElementInvalid(form, elementName);
  }

  isElementBlank(elementName: string) {
    return isElementBlank(this.personForm, elementName);
  }

  isElementTouched(elementName: string) {
    return isElementTouched(this.personForm, elementName);
  }

  saudiNationalIdNoStartWithOne() {
    let element = this.personForm.controls['saudiNationalId'];
    return element.touched && element.errors?.['invalidSaudiNationalId'];
  }

  iqamaIdNoStartWithTwo() {
    let element = this.personForm.controls['iqamaId'];
    return element.touched && element.errors?.['invalidIqamaId'];
  }

  invalidDate() {
    let element = this.personForm.controls['birthdate'];
    return element.touched && element.errors?.['invalidDate'];
  }

  get fetchedFromYakeenAlready() {
    return !(this.citizenInfoResponse == undefined && this.alienInfoResponse == undefined );
  }

  changeIdType() {
    if (this.personForm.value.selectedTypeId == '1') {
      this.myselectedDateType = ngBootstrapDatePickerDateType.Hijri;
      this.birthdateLable = this.l("Common.dateOfBirthHijri");
    } else {
      this.myselectedDateType = ngBootstrapDatePickerDateType.Gregorian;
      this.birthdateLable = this.l("Common.dateOfBirthGregorian");
    }
    this.setDateLimits();
  }

  // get translations() {
  //   return translations;
  // }

  generateGuid(): string {
    return '00000000-0000-0000-0000-000000000000'.replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }

  // addHafezaValidated($event){
  //   this.OnNewHafezaValidated.emit({hafeza:$event.hafezaCreate, isValid:$event.isValid});
  // }

  // editHafezaValidated($event){

  //     this.OnEditHafezaValidated.emit({editHafeza:$event.editHafeza, isValid:$event.isValid});
  // }
}
