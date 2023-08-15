import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
// import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
// import { ngBootstrapDatePickerDateType } from '@app/_shared/ng-bootstrap-hijri-gregorian-datepicker/Const';
// import { HafezaInfoResponse } from '@app/dto/yakeen/hafezaInfoResponse';
// import { isElementInvalid, isElementMissed, isElementTooLong, isElementTooShort } from '@app/lib/controller/validation/validation-queries';
// import { hijriDateExtensions } from '@app/lib/core/hijri-date-extensions';
// import { ValidationItem } from '@app/lib/models/validation-item';
// import { HintEntry } from '@app/model/HintEntry.model';
// import { LookupModel } from '@app/model/LookupModel';
// import { translations } from '@app/model/translations';
// import { lifeStatusMap } from '@app/model/users/personalInformation.model';
// import { LookupService } from '@app/services/lookup/lookup.service';
// import { CreateHafezaPersonInputDto, EditHafezaInputDto, EditHafezaPersonInputDto, ICreateHafezaPersonInputDto } from '@app/services/services-proxies/service-proxies';
// import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
// import { HintDictionary } from 'configuration/HintDictionary';
// import { DateFormatterService } from 'ngx-hijri-gregorian-datepicker';
@Component({
  selector: 'app-edit-hafeza',
  templateUrl: './edit-hafeza.component.html',
  styleUrls: ['./edit-hafeza.component.css']
})
export class EditHafezaComponent implements OnInit {
  ngOnInit() {
  }

//   @Output() OnEditHafezaValidated = new EventEmitter<{ editHafeza: EditHafezaInputDto, isValid: boolean }>();
//   hafeza: EditHafezaInputDto = undefined;
//   myselectedDateType: ngBootstrapDatePickerDateType = ngBootstrapDatePickerDateType.Hijri;
//   nationalities: LookupModel[];
//
//   @Input() initialHafeza: HafezaInfoResponse;
//   minHijri: NgbDateStruct;
//   minDate: NgbDateStruct;
//   maxDate: NgbDateStruct;
//   maxDateExpiry: NgbDateStruct;
//   minDateExpiry: NgbDateStruct;
//   selectedDate: NgbDateStruct;
//   selectedDateIdIssueDate: NgbDateStruct;
//   selectedDateIdExpiryDate: NgbDateStruct;
//   birthDay: string;
//   idIssueDate: string;
//   idExpiryDate: string;
//   ownertypehint: HintEntry;
//
//   constructor(private formBuilder: FormBuilder, public lookupService: LookupService,
//               private dateHelper: DateFormatterService,
//
//   ) {
//     this.nationalities = this.lookupService.nationalities;
//
//
//
//   }
//
//   ngOnInit(): void {
//     this.setLimits();
//     this.ownertypehint = HintDictionary.getHintByKey("seertype");
//     this.bindValues();
//
//   }
//
//   firstNameValidationItems: ValidationItem[];
//   secondNameValidationItems: ValidationItem[];
//   thirdNameValidationItems: ValidationItem[];
//   fourthNameValidationItems: ValidationItem[];
//   nationalIdValidationItems: ValidationItem[];
//   genderValidationItems: ValidationItem[];
//   lifeStatusValidationItems: ValidationItem[];
//   ownerTypeIdValidationItems: ValidationItem[];
//   nationalityValidationItems: ValidationItem[];
//   emailValidationItems: ValidationItem[];
//   mobileNumberValidationItems: ValidationItem[];
//   reasonValidationItems: ValidationItem[];
//
//   hafezaForm: FormGroup;
//   bindValues() {
//     this.hafezaForm = new FormGroup(
//       {
//         firstName: new FormControl(this.initialHafeza.firstName, [Validators.required]),
//         secondName: new FormControl(this.initialHafeza.secondName, [Validators.required]),
//         thirdName: new FormControl(this.initialHafeza.thirdName),
//         fourthName: new FormControl(this.initialHafeza.lastName),
//         nationality: new FormControl(this.initialHafeza.nationalityId),
//         nationalId: new FormControl(this.initialHafeza.idNumber, [Validators.maxLength(5), Validators.required]),
//         gender: new FormControl(+this.initialHafeza.gender, [Validators.required]),
//         mobileNumber: new FormControl(this.initialHafeza.mobileNumber, [Validators.maxLength(14)]),
//         gregorianBirthdate: new FormControl(null, [Validators.required]),
//         lifeStatus: new FormControl(+this.initialHafeza.lifeStatus, [Validators.required]),
//         idIssueDate: new FormControl(),
//         idExpiryDate: new FormControl(),
//         email: new FormControl(this.initialHafeza.email, [Validators.email]),
//         ownerTypeId: new FormControl(this.initialHafeza.ownerTypeId, [Validators.required]),
//         reason: new FormControl(this.initialHafeza.noIdentityReason, [Validators.required])
//
//       });
//
//     if (this.initialHafeza.idTypeId === 3) {
//       this.hafezaForm.get('reason').clearValidators();
//       this.hafezaForm.get('reason').updateValueAndValidity();
//       this.hafezaForm.removeControl('reason');
//     } else {
//       this.hafezaForm.get('nationalId').clearValidators();
//       this.hafezaForm.get('nationalId').updateValueAndValidity();
//       this.hafezaForm.removeControl('nationalId');
//     }
//
//
//     this.selectedDate = hijriDateExtensions.parseHijriStringWithDash(this.initialHafeza.hijriBirthDate);
//     this.onDateChange(event);
//     if (!!this.initialHafeza.idIssueDate) {
//       this.selectedDateIdIssueDate = hijriDateExtensions.parseHijriStringWithDash(this.initialHafeza.idIssueDate);
//       this.onDateChangeIdIssueDate(event);
//     }
//     if (!!this.initialHafeza.idExpiryDate) {
//       this.selectedDateIdExpiryDate = hijriDateExtensions.parseHijriStringWithDash(this.initialHafeza.idExpiryDate);
//       this.onDateChangeIdExpiryDate(event);
//     }
//
//
//
//
//     this.reasonValidationItems = [
//       { message: "السبب مطلوب", flag: isElementMissed.bind(this, this.hafezaForm, 'firstName') }
//     ];
//
//     this.firstNameValidationItems = [
//       { message: "الاسم الاول مطلوب", flag: isElementMissed.bind(this, this.hafezaForm, 'firstName') }
//     ];
//     this.secondNameValidationItems = [
//       { message: "اسم الأب مطلوب", flag: isElementMissed.bind(this, this.hafezaForm, 'secondName') }
//     ];
//
//
//     this.thirdNameValidationItems = [
//       { message: "اسم الجد مطلوب", flag: isElementMissed.bind(this, this.hafezaForm, 'thirdName') }
//     ];
//
//     this.fourthNameValidationItems = [
//       { message: "اسم العائلة مطلوب", flag: isElementMissed.bind(this, this.hafezaForm, 'fourthName') }
//     ];
//
//
//
//     this.nationalIdValidationItems = [
//       { message: "رقم الهوية من 5 ارقام او حروف", flag: isElementMissed.bind(this, this.hafezaForm, 'nationalId') }
//     ];
//
//     this.genderValidationItems = [
//       { message: "الجنس مطلوب", flag: isElementMissed.bind(this, this.hafezaForm, 'gender') }
//     ];
//
//     this.lifeStatusValidationItems = [
//       { message: "حالة الحياة مطلوبة", flag: isElementMissed.bind(this, this.hafezaForm, 'lifeStatus') }
//     ];
//
//     this.ownerTypeIdValidationItems = [
//       { message: "حالة الحياة مطلوبة", flag: isElementMissed.bind(this, this.hafezaForm, 'ownerTypeId') }
//     ];
//
//     this.nationalityValidationItems = [
//       { message: "الجنسية مطلوب", flag: isElementMissed.bind(this, this.hafezaForm, 'nationality') }
//     ];
//
//     this.emailValidationItems = [
//       { message: translations.missingEmail, flag: isElementMissed.bind(this, this.hafezaForm, 'email') },
//       { message: translations.invalidEmail, flag: isElementInvalid.bind(this, this.hafezaForm, 'email') }
//     ];
//
//     this.mobileNumberValidationItems = [
//       { message: "رقم الجوال يجب أن يحتوي علىاكثر من 14 رقم", flag: isElementTooLong.bind(this, this.hafezaForm, 'mobileNumber') }
//     ];
//
//     this.hafezaForm.valueChanges.subscribe(values => {
//       if (this.hafezaForm.valid) {
//         this.onEditHafeza();
//
//       }
//     });
//
//   }
//
//
//   onEditHafeza(): void {
//     this.hafeza = new EditHafezaInputDto();
//     this.hafeza.editHafezaPersonInputDto = new EditHafezaPersonInputDto();
//     this.hafeza.editHafezaPersonInputDto.firstName = this.hafezaForm.value.firstName;
//     this.hafeza.editHafezaPersonInputDto.secondName = this.hafezaForm.value.secondName;
//     this.hafeza.editHafezaPersonInputDto.thirdName = this.hafezaForm.value.thirdName;
//     this.hafeza.editHafezaPersonInputDto.lastName = this.hafezaForm.value.fourthName;
//     this.hafeza.editHafezaPersonInputDto.gender = this.hafezaForm.value.gender;
//     this.hafeza.editHafezaPersonInputDto.hijriBirthDate = this.birthDay;
//     this.hafeza.editHafezaPersonInputDto.mobileNumber = this.hafezaForm.value.mobileNumber;
//     this.hafeza.editHafezaPersonInputDto.nationalityId = this.hafezaForm.value.nationality;
//     this.hafeza.editHafezaPersonInputDto.lifeStatus = this.hafezaForm.value.lifeStatus;
//     this.hafeza.editHafezaPersonInputDto.idIssueDate = this.idIssueDate;
//     this.hafeza.editHafezaPersonInputDto.idExpiryDate = this.idExpiryDate;
//     this.hafeza.editHafezaPersonInputDto.idTypeId = this.initialHafeza.idTypeId;
//     this.hafeza.editHafezaPersonInputDto.ownerTypeId = this.hafezaForm.value.ownerTypeId;
//     this.hafeza.editHafezaPersonInputDto.idNumber = this.hafezaForm.value.nationalId == undefined ? this.initialHafeza.idNumber : this.hafezaForm.value.nationalId;
//     this.hafeza.editHafezaPersonInputDto.fullName = this.hafezaForm.value.firstName + " " + this.hafezaForm.value.secondName + " " + this.hafezaForm.value.thirdName + " " +
//       this.hafezaForm.value.fourthName;
//     this.hafeza.editHafezaPersonInputDto.noIdentityReason = this.hafezaForm.value.reason;
//     this.hafeza.editHafezaPersonInputDto.email = this.hafezaForm.value.email;
//     this.hafeza.ownerId = this.initialHafeza.ownerId;
//     this.OnEditHafezaValidated.emit({
//       editHafeza: this.hafeza,
//       isValid: true
//     });
//
//   }
//
//
//
//
//   get translations() {
//     return translations;
//   }
//
//   private setLimits() {
//     this.minDate = { year: 100, month: 1, day: 1 };
//     this.maxDate = this.dateHelper.GetTodayHijri();
//     this.maxDateExpiry = this.dateHelper.GetTodayHijri();
//     this.maxDateExpiry.year = this.maxDateExpiry.year + 100;
//     this.minDateExpiry = this.dateHelper.GetTodayHijri();
//     this.minDateExpiry.year = this.maxDateExpiry.year - 150;
//
//   }
//
//   isElementInvalid(elementName: string) {
//     return isElementInvalid(this.hafezaForm, elementName);
//   }
//
//
//   gregorianDateValidationItems: ValidationItem[] = [
//     {
//       message: "التاريخ الميلادي مطلوب للأجنبي",
//       flag: isElementMissed.bind(this, this!.hafezaForm, 'gregorianBirthdate')
//     },
//     { message: "الصيغة المدخلة غير صحيحة", flag: this.invalidGregorianDate.bind(this) }
//   ];
//
//
//
//
//   invalidGregorianDate() {
//     let element = this.hafezaForm.controls['gregorianBirthdate'];
//     return element.touched && element.errors?.invalidGregorianDate;
//   }
//
//   beforeInput(event: InputEvent) {
//     if (!event.data) {
//       return true;
//     }
//     var num = parseInt(event.data);
//     return !isNaN(num);
//   }
//
//   hafezaFormGender = {
//     'M': 'ذكر',
//     'F': 'أنثى'
//   }
//
//   hafezaGender: number[] = [0, 1];
//
//   lifeStatusFormGender = {
//     '0': translations.alive,
//     '1': translations.dead
//   }
//
//   lifeStatuses: number[] = [0, 1];
//
//   onDateChange(event) {
//     if (this.selectedDate)
//       this.birthDay = `${this.selectedDate.year}-${this.selectedDate.month}-${this.selectedDate.day}`;
//     else
//       this.birthDay = "";
//     this.hafezaForm.get('gregorianBirthdate').setValue(this.birthDay);
//   }
//
//   onDateChangeIdIssueDate(event) {
//     if (this.selectedDateIdIssueDate)
//       this.idIssueDate = `${this.selectedDateIdIssueDate.year}-${this.selectedDateIdIssueDate.month}-${this.selectedDateIdIssueDate.day}`;
//     else
//       this.idIssueDate = "";
//     this.hafezaForm.get('idIssueDate').setValue(this.idIssueDate);
//   }
//
//   onDateChangeIdExpiryDate(event) {
//     if (this.selectedDateIdExpiryDate)
//       this.idExpiryDate = `${this.selectedDateIdExpiryDate.year}-${this.selectedDateIdExpiryDate.month}-${this.selectedDateIdExpiryDate.day}`;
//     else
//       this.idExpiryDate = "";
//     this.hafezaForm.get('idExpiryDate').setValue(this.idExpiryDate);
//
//   }
//
//   changeOwner(event) {
//     this.ownertypehint = HintDictionary.getHintByKey(event?.target?.selectedOptions[0]?.dataset?.hintkey);
//
//   }
//
//
//   isElementInvalidAnyForm(form: FormGroup, elementName: string) {
//     return isElementInvalid(form, elementName);
//   }
//
}
