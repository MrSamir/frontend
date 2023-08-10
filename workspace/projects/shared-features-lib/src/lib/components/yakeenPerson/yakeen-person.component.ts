import { DateConvertTo } from './../ng-bootstrap-hijri-gregorian-datepicker/Pipes/dateConverter/date-converter.pipe';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  AlienInfoResponse,
  ApiResponse,
  ApiResponseOfAlienInfoResponse,
  ApiResponseOfCitizenInfoResponse,
  ApiResponseOfOutputApplicationUserDto,
  ApplicationUserServiceServiceProxy,
  CitizenInfoResponse,
  GetAlienInfoInputDto,
  GetCitizenInfoInputDto,
  InputApplicationUserDto,
  InputLookUpDto,
  LookupApplicationServiceServiceProxy,
  OutputApplicationUserDto,
  YaqeenApplicationServiceServiceProxy,
} from '../../../../../public-portal/src/app/modules/shared/services/services-proxies/service-proxies';
import { DateFormatterService } from '../ng-bootstrap-hijri-gregorian-datepicker/date-formatter.service';
import { ngBootstrapDatePickerDateType } from '../ng-bootstrap-hijri-gregorian-datepicker/Const';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { handleError } from 'projects/core-lib/src/lib/services/alert/alert.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { EnumValidation } from '../IDNumberWithValidation/EnumValidation';
import { ValidationItem } from '../../Models/validation-item';
import { Subscription } from 'rxjs';
import { DateTime } from 'luxon';
import {
  isElementBlank,
  isElementInvalid,
  isElementMissed,
  isElementTooShort,
  isElementTouched
} from 'projects/core-lib/src/lib/Validators/validation-queries';

@Component({
  selector: 'yakeen-person',
  templateUrl: './yakeen-person.component.html',
})
export class YakeenPersonComponent implements OnInit, OnDestroy {
  @Output() OnNewCitizenValidated = new EventEmitter<{
    citizenInfo: CitizenInfoResponse | null;
    idType: number | null;
    idNumber: string | null;
    person: InputApplicationUserDto | null;
    isValid: boolean | false;
  }>();
  @Output() OnNewAlienValidated = new EventEmitter<{
    alienInfo: AlienInfoResponse | null;
    idType: number | null;
    idNumber: string | null;
    person: InputApplicationUserDto | null;
    isValid: boolean | false;
  }>();
  @Output() OnNewPersonAvailable = new EventEmitter<{
    idType: number | null;
    idNumber: string | null;
    person: InputApplicationUserDto | null;
  }>();
  // @Output() OnNewHafezaValidated = new EventEmitter<{hafeza:AddHafezaInputDto, isValid:boolean}>();
  // @Output() OnEditHafezaValidated = new EventEmitter<{editHafeza:EditHafezaInputDto, isValid:boolean}>();
  @Input() isOutsideKSA: boolean;
  @Input() initialData: {
    citizen: CitizenInfoResponse;
    alien: AlienInfoResponse;
    person: InputApplicationUserDto;
    //,hafeza:HafezaInfoResponse
  };
  @Input() fromSeer: boolean = false;
  lookupfliter: InputLookUpDto = new InputLookUpDto();
  IdTypeLookup: any = [];
  myselectedDateType: ngBootstrapDatePickerDateType =
    ngBootstrapDatePickerDateType.Hijri;
  //birthdateLable: string = "تاريخ الميلاد (هجري)";
  constructor(
    private formBuilder: FormBuilder,
    private dateHelper: DateFormatterService,
    private lookupService: LookupApplicationServiceServiceProxy,
    private yakeenValidationService: YaqeenApplicationServiceServiceProxy,
    private PersonalInformationServiceProxy: ApplicationUserServiceServiceProxy
  ) {}

  newPerson: InputApplicationUserDto = new InputApplicationUserDto(); // When we finish yakeen validation we ask the system for the person if found through his IdNumber
  newCreatedYakeenPerson: InputApplicationUserDto =
    new InputApplicationUserDto();
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

    this.PersonalInformationServiceProxy.ensureYaqeenPersonalInfo(
      YaqeenPersonInfo
    ).subscribe(
      (fetchedPerson: ApiResponseOfOutputApplicationUserDto) => {
        this.newCreatedYakeenPerson = fetchedPerson.dto;

        this.OnNewCitizenValidated.emit({
          citizenInfo: this.citizenInfoResponse,
          idType: this.personForm.value.selectedTypeId
            ? parseInt(this.personForm.value.selectedTypeId)
            : 0,
          idNumber: this.personForm.value.saudiNationalId ?? null,
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
    this.alienInfoResponse = res;
    const timestamp = Date.parse(this.personDateString ?? '');
    if (!isNaN(timestamp)) {
      const date = new Date(timestamp);
      this.alienInfoResponse.dateOfBirthG = DateTime.fromJSDate(date);
    }
    var YaqeenPersonInfo = new InputApplicationUserDto();
    YaqeenPersonInfo.userName = this.personForm.value.iqamaId ?? undefined;
    YaqeenPersonInfo.birthDate = this.alienInfoResponse.dateOfBirthG;
    YaqeenPersonInfo.idTypeId = this.personForm.value.selectedTypeId
      ? parseInt(this.personForm.value.selectedTypeId)
      : 0;

    this.PersonalInformationServiceProxy.ensureYaqeenPersonalInfo(
      YaqeenPersonInfo
    ).subscribe((fetchedPerson: ApiResponseOfOutputApplicationUserDto) => {
      this.OnNewAlienValidated.emit({
        alienInfo: this.alienInfoResponse,
        idType: this.personForm.value.selectedTypeId
          ? parseInt(this.personForm.value.selectedTypeId)
          : 0,
        idNumber: this.personForm.value.iqamaId?.toString() ?? null,
        person: fetchedPerson.dto,
        isValid: this.isVaild,
      });
      this.personForm.controls.birthdate.disable();
      this.personForm.controls.iqamaId.disable();
      this.onPersonFetched(fetchedPerson.dto);
    });
  };

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
        this.initialData.person.idTypeId?.toString() ?? null
      );
      this.personForm.controls.iqamaId.setValue(
        this.initialData.person.userName ?? null
      );
      this.personForm.controls.saudiNationalId.setValue(
        this.initialData.person.userName ?? null
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
  onPersonFetched(fetchedPerson: OutputApplicationUserDto) {
    this.newPerson = fetchedPerson;
    this.mobileEditAllowed =
      !!this.newPerson &&
      (!this.newPerson.phoneNumber || !this.newPerson.phoneNumberConfirmed);
    this.emailEditAllowed =
      !!this.newPerson &&
      (!this.newPerson.email || !this.newPerson.emailConfirmed);
    if (!!this.newPerson) {
      this.personAppendixForm.controls.mobileNumber.setValue(
        this.newPerson.phoneNumber ?? ''
      );
      this.personAppendixForm.controls.email.setValue(
        this.newPerson.email ?? ''
      );
    }
    this.newPerson = fetchedPerson;
  }

  reason: string = '';
  personDate: NgbDateStruct;
  personDateString: string | undefined;
  citizenInfoResponse: CitizenInfoResponse;
  alienInfoResponse: AlienInfoResponse;

  // idTypeLables = [
  //     'هوية وطنية',
  //     'إقامة',
  //     'حفيظة نفوس',
  //     'لا يوجد'
  // ];

  patterns = [
    EnumValidation.pattern_nationalId,
    EnumValidation.pattern_iqama,
    EnumValidation.pattern_number_attribute_validation,
  ];

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
    email: ['', [Validators.required, Validators.email]],
  });

  mobileNumberValidationItems: ValidationItem[] = [
    { message: "رقم الجوال غير صحيح", flag: isElementInvalid.bind(this, this.personAppendixForm, 'mobileNumber') }
  ];

  emailValidationItems: ValidationItem[] = [
    {message: "البريد الالكتروني مطلوب", flag: isElementMissed.bind(this, this.personAppendixForm, 'email')},
    { message: "البريد الالكتروني غير صحيح", flag: isElementInvalid.bind(this, this.personAppendixForm, 'email') }
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
    return this.IdTypeLookup[this.personForm.value.selectedTypeId ?? 0 + 1]
      .name;
  }

  LoadIdTypes() {
    this.lookupfliter.lookUpName = 'IdTypes';
    this.lookupfliter.filters = [];
    this.lookupService.getAllLookups(this.lookupfliter).subscribe((data) => {
      this.IdTypeLookup = data.dto.items;
      console.log(data);
      this.personForm.controls.birthdate.enable();
      this.personForm.controls.iqamaId.enable();
      this.personForm.controls.saudiNationalId.enable();
      this.initFormFromInitialData();
    });
  }

  ngOnInit(): void {
    this.setDateLimits();
    this.LoadIdTypes();
    this.subscribeToChanges();
  }

  subscribeToChanges() {
    this.performAppendixFormSubscription =
      this.personAppendixForm.valueChanges.subscribe((values) => {
        if (this.personAppendixForm.valid) {
          this.newPerson.email =
            this.personAppendixForm.value.email ?? undefined;
          this.newPerson.phoneNumber =
            this.personAppendixForm.value.mobileNumber ?? undefined;
          this.OnNewPersonAvailable.emit({
            idType: this.personForm.value.selectedTypeId
              ? parseInt(this.personForm.value.selectedTypeId)
              : 0,
            idNumber: this.newPerson?.userName ?? null,
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

  // get IdTypes() {
  //   return this.isOutsideKSA ? this.lookupService.outsideKSAIdTypeLookups : !this.fromSeer? this.lookupService.insideKSAIdTypeLookups: this.lookupService.insideKSAIdTypeLookups.filter(c=>c.value!=IdType.NONE_OF_THE_ABOVE&&c.value!=IdType.OTHER);
  // }

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
      return this.isElementInvalid('saudiNationalId') ||
        !this.personDateString ||
        this.isElementBlank('saudiNationalId');
    }
    if (this.personForm.value.selectedTypeId === '2') {
      return this.isElementInvalid('iqamaId') || !this.personDateString || this.isElementBlank('iqamaId');
    }
    return true;
  }

  onValidateBtnClicked() {
    this.yakeenValidationActions[
      this.personForm.value.selectedTypeId ?? 0
    ]().subscribe(
      (res) => {
        this.yakeenValidationResultAction[
          this.personForm.value.selectedTypeId ?? 0
        ](res.data);
      },
      (err) => {
        handleError<object>(err.error);
      }
    );
  }

  validateCitizen(): CitizenInfoResponse {
    var citizen: CitizenInfoResponse = new CitizenInfoResponse();
    var citizenInfo = new GetCitizenInfoInputDto();
    citizenInfo.nin = this.personForm.value.saudiNationalId?? undefined;
    citizenInfo.dateOfBirth = this.personDateString;
    this.yakeenValidationService
      .getCitizenInfo(citizenInfo)
      .subscribe((res: ApiResponseOfCitizenInfoResponse) => {
        citizen = res.dto;
      });
    return citizen;
  }

  validateAlien(): AlienInfoResponse {
    var alien: AlienInfoResponse = new AlienInfoResponse();
    var alienInfo = new GetAlienInfoInputDto();
    alienInfo.iqama = this.personForm.value.iqamaId?? undefined;
    alienInfo.dateOfBirth = this.personDateString;
    this.yakeenValidationService
      .getAlienInfo(alienInfo)
      .subscribe((res: ApiResponseOfAlienInfoResponse) => {
        alien = res.dto;
      });
    return alien;
  }

  saudiNationalIdValidationItems: ValidationItem[] = [
      { message: "رقم الهوية الوطنية مطلوب", flag: isElementMissed.bind(this, this.personForm, 'saudiNationalId') },
      {
          message: "رقم الهوية الوطنية يجب أن يحتوي على عشر أرقام",
          flag: isElementTooShort.bind(this, this.personForm, "saudiNationalId")
      },
      { message: "رقم الهوية الوطنية يجب يبدأ بالرقم 1", flag: this.saudiNationalIdNoStartWithOne.bind(this) }
  ];

  iqamaIdValidationItems: ValidationItem[] = [
      { message: "رقم الإقامة مطلوب", flag: isElementMissed.bind(this, this.personForm, 'iqamaId') },
      { message: "رقم الإقامة يجب أن يحتوي على عشر أرقام", flag: isElementTooShort.bind(this, this.personForm, "iqamaId") },
      { message: "رقم الإقامة يجب أن يبدأ بالرقم 2", flag: this.iqamaIdNoStartWithTwo.bind(this) }
  ];

  DateValidationItems: ValidationItem[] = [
    {
      message: "التاريخ  مطلوب",
      flag: isElementMissed.bind(this, this.personForm, 'birthdate')
    },
    {message: "الصيغة المدخلة غير صحيحة", flag: this.invalidDate.bind(this)}
  ];

    isElementInvalid( elementName: string) {
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
        return !!this.citizenInfoResponse || !!this.alienInfoResponse;// ||!!this.initialData.hafeza;
    }

  changeIdType() {
    if (this.personForm.value.selectedTypeId == '1') {
      this.myselectedDateType = ngBootstrapDatePickerDateType.Hijri;
      //this.birthdateLable = "تاريخ الميلاد (هجري)";
    } else {
      this.myselectedDateType = ngBootstrapDatePickerDateType.Gregorian;
      //this.birthdateLable = "تاريخ الميلاد (ميلادي)";
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
