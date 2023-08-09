import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from "@angular/core";
import {
  AlienInfoResponse,
  ApplicationUserServiceServiceProxy,
  CitizenInfoResponse,
  InputApplicationUserDto,
  LookupApplicationServiceServiceProxy,
  YaqeenApplicationServiceServiceProxy
} from "../../../../../public-portal/src/app/modules/shared/services/services-proxies/service-proxies";
import {DateFormatterService} from "../ng-bootstrap-hijri-gregorian-datepicker/date-formatter.service";
import {ngBootstrapDatePickerDateType} from "../ng-bootstrap-hijri-gregorian-datepicker/Const";
import {FormBuilder} from "@angular/forms";

@Component({
    selector: 'yakeen-person',
    templateUrl: './yakeen-person.component.html'
})
export class YakeenPersonComponent implements OnInit, OnDestroy {
    @Output() OnNewCitizenValidated = new EventEmitter<{ citizenInfo: CitizenInfoResponse, idType: number, idNumber: string, person: InputApplicationUserDto, isValid: boolean }>();
    @Output() OnNewAlienValidated = new EventEmitter<{ alienInfo: AlienInfoResponse, idType: number, idNumber: string, person: InputApplicationUserDto, isValid: boolean }>();
    @Output() OnNewPersonAvailable  = new EventEmitter<{ idType: number, idNumber: string, person: InputApplicationUserDto }>();
    // @Output() OnNewHafezaValidated = new EventEmitter<{hafeza:AddHafezaInputDto, isValid:boolean}>();
    // @Output() OnEditHafezaValidated = new EventEmitter<{editHafeza:EditHafezaInputDto, isValid:boolean}>();
    @Input() isOutsideKSA: boolean;
    @Input() initialData: { citizen: CitizenInfoResponse, alien: AlienInfoResponse, person: InputApplicationUserDto
      //,hafeza:HafezaInfoResponse
    };
    @Input() fromSeer:boolean=false;
    myselectedDateType: ngBootstrapDatePickerDateType = ngBootstrapDatePickerDateType.Hijri;
    birthdateLable: string = "تاريخ الميلاد (هجري)";
    constructor(private formBuilder: FormBuilder,
        private dateHelper: DateFormatterService,
        private lookupService: LookupApplicationServiceServiceProxy,
        private yakeenValidationService: YaqeenApplicationServiceServiceProxy,
        private PersonalInformationServiceProxy:ApplicationUserServiceServiceProxy) {
    }

    newPerson: InputApplicationUserDto | undefined;    // When we finish yakeen validation we ask the system for the person if found through his IdNumber
    newCreatedYakeenPerson :InputApplicationUserDto | undefined;
    mobileEditAllowed = true;
    emailEditAllowed = true;

    isVaild: boolean = false;

    yakeenValidationActions = {
        '1': this.validateCitizen.bind(this),
        '2': this.validateAlien.bind(this),
        '3': '',
        '4': ''
    }

    onCitizenValidated = (res: CitizenInfoResponse) => {
      this.citizenInfoResponse = res;
      this.citizenInfoResponse.dateOfBirthH = this.personDateString;
      var YaqeenPersonInfo = new InputApplicationUserDto();
      YaqeenPersonInfo.userName = this.personForm.value.saudiNationalId?.toString();
      YaqeenPersonInfo.birthDateHijri = this.citizenInfoResponse.dateOfBirthH;
      YaqeenPersonInfo.idTypeId = parseInt(this.personForm.value.selectedTypeId);

      this.PersonalInformationServiceProxy.ensureYaqeenPersonalInfo(YaqeenPersonInfo).subscribe
      (
        (fetchedPerson: ServiceResponse<PersonalInformation>) => {
          var YaqeenPersonInfo=undefined;
          this.newCreatedYakeenPerson  = JSON.parse(JSON.stringify(fetchedPerson.data));

          this.OnNewCitizenValidated.emit({
            citizenInfo: this.citizenInfoResponse,
            idType: parseInt(this.personForm.value.selectedTypeId),
            idNumber: this.personForm.value.saudiNationalId.toString(),
            person: this.newCreatedYakeenPerson,
            isValid: this.isVaild
          });
          this.personForm.controls.birthdate.disable();
          this.personForm.controls.saudiNationalId.disable();
          this.onPersonFetched(this.newCreatedYakeenPerson);
        },
        (err) => handleError<object>(err.error)
      );

    }

    onAlienValidated = (res: AlienInfoResponse) => {
      this.alienInfoResponse = res;
      this.alienInfoResponse.dateOfBirthG = this.personDateString;
      var YaqeenPersonInfo = new YaqeenPersonInputDto();
      YaqeenPersonInfo.idNumber = this.personForm.value.iqamaId.toString();
      YaqeenPersonInfo.birthDateGregorian = this.alienInfoResponse.dateOfBirthG;
      YaqeenPersonInfo.idTypeId = parseInt(this.personForm.value.selectedTypeId);

      this.PersonalInformationServiceProxy.ensureYaqeenPersonalInfo(YaqeenPersonInfo).
      subscribe(
        (fetchedPerson: ServiceResponse<PersonalInformation>) => {
          this.OnNewAlienValidated.emit({
            alienInfo: this.alienInfoResponse,
            idType: parseInt(this.personForm.value.selectedTypeId),
            idNumber: this.personForm.value.iqamaId.toString(),
            person: fetchedPerson.data,
            isValid: this.isVaild
          });
          this.personForm.controls.birthdate.disable();
          this.personForm.controls.iqamaId.disable();
          this.onPersonFetched(fetchedPerson.data);
        }
      );

    }

  yakeenValidationResultAction = {
    '1':  this.onCitizenValidated,
    '2': this.onAlienValidated
  }

    initFormFromInitialData() {
      if( !!this.initialData && !!this.initialData.person && (!!this.initialData.alien || !!this.initialData.citizen) ) {
        this.personForm.controls.selectedTypeId.setValue(this.initialData.person.idTypeId);
        this.personForm.controls.iqamaId.setValue(this.initialData.person.idNumber);
        this.personForm.controls.saudiNationalId.setValue(this.initialData.person.idNumber);
        this.personDateString = !!this.initialData.person.birthDateGregorian ? this.initialData.person.birthDateGregorian.toString():this.initialData.person.hijriBirthDate.toString();

        this.citizenInfoResponse = this.initialData.citizen;
        this.alienInfoResponse = this.initialData.alien;
        this.onPersonFetched(this.initialData.person);

        this.personForm.controls.birthdate.disable();
        this.personForm.controls.saudiNationalId.disable();
        this.personForm.controls.iqamaId.disable();
      }
    }

    // Whether it gets fetched from url hit or passed from the parent
    onPersonFetched(fetchedPerson: PersonalInformation) {
      this.newPerson = fetchedPerson;
      this.mobileEditAllowed = !!this.newPerson && (!this.newPerson.mobileNumber || !this.newPerson.isMobileNumberVerified);
      this.emailEditAllowed = !!this.newPerson && (!this.newPerson.email || !this.newPerson.isEmailVerified);
      if( !!this.newPerson ) {
        this.personAppendixForm.controls.mobileNumber.setValue(this.newPerson.mobileNumber ?? '');
        this.personAppendixForm.controls.email.setValue(this.newPerson.email ?? '');
      }
      this.newPerson = fetchedPerson;
    }

    reason: string = '';
    personDate: NgbDateStruct;
    personDateString: string = '';
    citizenInfoResponse: CitizenInfoResponse;
    alienInfoResponse: AlienInfoResponse;

    idTypeLables = [
        'هوية وطنية',
        'إقامة',
        'حفيظة نفوس',
        'لا يوجد'
    ];

    patterns = [
        EnumValidation.pattern_nationalId,
        EnumValidation.pattern_iqama,
        EnumValidation.pattern_number_attribute_validation
    ];

  personForm = this.formBuilder.group({
    selectedTypeId: ['', [Validators.required]],
    saudiNationalId: [{value: '', disabled: true}, [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
      CustomValidators.patternValidator(
        EnumValidation.pattern_nationalId,
        {invalidSaudiNationalId: true}
      )
    ]],
    iqamaId: [{value: '', disabled: true}, [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
      CustomValidators.patternValidator(
        EnumValidation.pattern_iqama,
        {invalidIqamaId: true}
      )
    ]]  ,
    birthdate: [{value: '', disabled: true}, [
      Validators.required,
      CustomValidators.patternValidator(
        EnumValidation.pattern_date,
        {invalidDate: true}
      )
    ]],
  });

  personAppendixForm = this.formBuilder.group(
    {
      mobileNumber: new FormControl(null,[Validators.pattern(EnumValidation.pattern_ksa_mobile_number)]),
      email: ['', [Validators.required, Validators.email]],
    });

  mobileNumberValidationItems: ValidationItem[] = [
    { message: "رقم الجوال غير صحيح", flag: isElementInvalid.bind(this, this.personAppendixForm, 'mobileNumber') }
  ];

  emailValidationItems: ValidationItem[] = [
    {message: translations.missingEmail, flag: isElementMissed.bind(this, this.personAppendixForm, 'email')},
    { message: translations.invalidEmail, flag: isElementInvalid.bind(this, this.personAppendixForm, 'email') }
  ];

  performAppendixFormSubscription: Subscription;

  get selectedTypeName() {
        if(!!this.initialData.hafeza){
          return this.idTypeLables[this.initialData.hafeza.idTypeId - 1]
        }
        else if (this.personForm.value.selectedTypeId > 3) {
            return undefined;
        }
        return this.idTypeLables[this.personForm.value.selectedTypeId - 1];
    }

    ngOnInit(): void {

        this.setDateLimits();
        this.lookupService.fetchtIdTypeLookups(() => {
          this.personForm.controls.birthdate.enable();
            this.personForm.controls.iqamaId.enable();
            this.personForm.controls.saudiNationalId.enable();
            this.initFormFromInitialData();
        });
        this.subscribeToChanges();
    }

    subscribeToChanges() {
      this.performAppendixFormSubscription = this.personAppendixForm.valueChanges.subscribe(values => {
        if( this.personAppendixForm.valid ) {
          this.newPerson.email = this.personAppendixForm.value.email;
          this.newPerson.mobileNumber = this.personAppendixForm.value.mobileNumber;
          this.OnNewPersonAvailable.emit( {
              idType: parseInt(this.personForm.value.selectedTypeId),
              idNumber: this.newPerson.idNumber.toString(),
              person: this.newPerson
            });
        }
      });
    }

    ngOnDestroy() {
      if( !!this.performAppendixFormSubscription ) {
        this.performAppendixFormSubscription.unsubscribe();
      }
    }

    get IdTypes() {
      return this.isOutsideKSA ? this.lookupService.outsideKSAIdTypeLookups : !this.fromSeer? this.lookupService.insideKSAIdTypeLookups: this.lookupService.insideKSAIdTypeLookups.filter(c=>c.value!=IdType.NONE_OF_THE_ABOVE&&c.value!=IdType.OTHER);
    }

    ePatternValidation: typeof EnumValidation = EnumValidation;

  // date component props
  min: NgbDateStruct;
  maxToday: NgbDateStruct;


  private setDateLimits() {

   if(this.myselectedDateType==ngBootstrapDatePickerDateType.Hijri)
    {
      this.min={year: 1286, month: 1, day: 1};
      this.maxToday= this.dateHelper.GetTodayHijri();
      this.maxToday.year -= 18;
    }else
    {
      this.min={year: 1870, month: 1, day: 1};
      this.maxToday= this.dateHelper.GetTodayGregorian();
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

  onPersonDateChange(date:NgbDateStruct) {
          if(this.personDate)
          this.personDateString = `${this.personDate.year}-${this.personDate.month}-${this.personDate.day}`;
          else
          this.personDateString="";
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
        this.yakeenValidationActions[this.personForm.value.selectedTypeId]().subscribe(res => {
            this.yakeenValidationResultAction[this.personForm.value.selectedTypeId](res.data);
        }, err => {
            handleError<object>(err.error);
        });
    }

    validateCitizen(): Observable<ServiceResponse<CitizenInfoResponse>> {
        return this.yakeenValidationService.validateCitizen({
            nin: this.personForm.value.saudiNationalId.toString(),
          dateOfBirth: this.personDateString
        });
    }

    validateAlien(): Observable<ServiceResponse<AlienInfoResponse>> {
        return this.yakeenValidationService.validateAlien({
            iqama: this.personForm.value.iqamaId.toString(),
          dateOfBirth: this.personDateString
        });
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
        return element.touched && element.errors?.invalidSaudiNationalId;
    }

    iqamaIdNoStartWithTwo() {
        let element = this.personForm.controls['iqamaId'];
        return element.touched && element.errors?.invalidIqamaId;
    }

  invalidDate() {
    let element = this.personForm.controls['birthdate'];
    return element.touched && element.errors?.invalidDate;
  }

    get fetchedFromYakeenAlready() {
        return !!this.citizenInfoResponse || !!this.alienInfoResponse ||!!this.initialData.hafeza;
    }

  changeIdType() {
    if (this.personForm.value.selectedTypeId == "1") {
      this.myselectedDateType = ngBootstrapDatePickerDateType.Hijri;
      this.birthdateLable = "تاريخ الميلاد (هجري)";
    }
    else {
      this.myselectedDateType = ngBootstrapDatePickerDateType.Gregorian;
      this.birthdateLable = "تاريخ الميلاد (ميلادي)";
    }
    this.setDateLimits();
  }

  get translations() {
    return translations;
  }

  generateGuid() : string {
    return '00000000-0000-0000-0000-000000000000'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  addHafezaValidated($event){
    this.OnNewHafezaValidated.emit({hafeza:$event.hafezaCreate, isValid:$event.isValid});
  }

  editHafezaValidated($event){

      this.OnEditHafezaValidated.emit({editHafeza:$event.editHafeza, isValid:$event.isValid});
  }


}
