import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
// import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
// import { ngBootstrapDatePickerDateType } from '@app/_shared/ng-bootstrap-hijri-gregorian-datepicker/Const';
// import {  isElementInvalid, isElementMissed, isElementTooLong, isElementTooShort } from '@app/lib/controller/validation/validation-queries';
// import { ValidationItem } from '@app/lib/models/validation-item';
// import { HintEntry } from '@app/model/HintEntry.model';
// import { LookupModel } from '@app/model/LookupModel';
// import { translations } from '@app/model/translations';
// import { lifeStatusMap } from '@app/model/users/personalInformation.model';
// import { LookupService } from '@app/services/lookup/lookup.service';
// import { AddHafezaInputDto, CreateHafezaPersonInputDto, ICreateHafezaPersonInputDto } from '@app/services/services-proxies/service-proxies';
// import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
// import { HintDictionary } from 'configuration/HintDictionary';
// import { DateFormatterService } from 'ngx-hijri-gregorian-datepicker';
//
@Component({
  selector: 'app-create-hafeza',
  templateUrl: './create-hafeza.component.html',
  styleUrls: ['./create-hafeza.component.css']
})
export class CreateHafezaComponent implements OnInit {
  ngOnInit() {
  }
//   @Output() OnNewHafezaValidated = new EventEmitter<{ hafezaCreate: AddHafezaInputDto, isValid:boolean }>();
//   @Input() isHafeza:boolean= false;
//   hafeza:AddHafezaInputDto=undefined;
//   myselectedDateType: ngBootstrapDatePickerDateType = ngBootstrapDatePickerDateType.Hijri;
//   nationalities: LookupModel[];
//
//   minHijri: NgbDateStruct ;
//   minDate: NgbDateStruct ;
//   maxDate: NgbDateStruct ;
//   maxDateExpiry: NgbDateStruct ;
//   minDateExpiry: NgbDateStruct ;
//
//   selectedDate:NgbDateStruct;
//   selectedDateIdIssueDate:NgbDateStruct;
//   selectedDateIdExpiryDate:NgbDateStruct;
//   birthDay:string;
//   idIssueDate:string;
//   idExpiryDate:string;
//   ownertypehint: HintEntry;
//
//   constructor( private formBuilder: FormBuilder,public lookupService: LookupService,
//                private dateHelper: DateFormatterService,
//
//   ) {
//     this.nationalities = this.lookupService.nationalities;
//
//     this.hafezaForm.valueChanges.subscribe(values=>{
//       if(this.hafezaForm.valid){
//         this.onNewHafeza();
//       }
//     });
//
//   }
//
//   ngOnInit(): void {
//     this.setLimits();
//     this.ownertypehint = HintDictionary.getHintByKey("seertype");
//
//     if(this.isHafeza){
//       this.hafezaForm.get('reason').clearValidators();
//       this.hafezaForm.get('reason').updateValueAndValidity();
//       this.hafezaForm.removeControl('reason');
//     }else{
//       this.hafezaForm.get('nationalId').clearValidators();
//       this.hafezaForm.get('nationalId').updateValueAndValidity();
//       this.hafezaForm.removeControl('nationalId');
//     }
//
//   }
//
//
//   onNewHafeza():void{
//     this.hafeza = new AddHafezaInputDto();
//     this.hafeza.isHafeza = this.isHafeza;
//     this.hafeza.createHafezaPersonInputDto = new CreateHafezaPersonInputDto();
//     this.hafeza.createHafezaPersonInputDto.firstName = this.hafezaForm.value.firstName;
//     this.hafeza.createHafezaPersonInputDto.secondName= this.hafezaForm.value.secondName;
//     this.hafeza.createHafezaPersonInputDto.thirdName= this.hafezaForm.value.thirdName;
//     this.hafeza.createHafezaPersonInputDto.lastName= this.hafezaForm.value.fourthName;
//     this.hafeza.createHafezaPersonInputDto.gender= this.hafezaForm.value.gender;
//     this.hafeza.createHafezaPersonInputDto.hijriBirthDate= this.birthDay;
//     this.hafeza.createHafezaPersonInputDto.mobileNumber= this.hafezaForm.value.mobileNumber;
//     this.hafeza.createHafezaPersonInputDto.nationalityId=this.hafezaForm.value.nationality;
//     this.hafeza.createHafezaPersonInputDto.lifeStatus=this.hafezaForm.value.lifeStatus;
//     this.hafeza.createHafezaPersonInputDto.idIssueDate=this.idIssueDate;
//     this.hafeza.createHafezaPersonInputDto.idExpiryDate=this.idExpiryDate;
//     this.hafeza.createHafezaPersonInputDto.idTypeId= this.isHafeza?3:4;
//     this.hafeza.createHafezaPersonInputDto.ownerTypeId = this.hafezaForm.value.ownerTypeId;
//     this.hafeza.createHafezaPersonInputDto.idNumber = this.hafezaForm.value.nationalId===undefined?Math.floor(Math.random()*100000) + 8000000000:this.hafezaForm.value.nationalId;
//     this.hafeza.createHafezaPersonInputDto.fullName = this.hafezaForm.value.firstName+" "+ this.hafezaForm.value.secondName +" "+this.hafezaForm.value.thirdName + " "+
//       this.hafezaForm.value.fourthName;
//     this.hafeza.createHafezaPersonInputDto.email = this.hafezaForm.value.email;
//     if(!this.isHafeza)
//       this.hafeza.createHafezaPersonInputDto.noIdentityReason = this.hafezaForm.value.reason;
//
//     this.OnNewHafezaValidated.emit({
//       hafezaCreate: this.hafeza,
//       isValid:true
//     });
//
//   }
//
//   hafezaForm = this.formBuilder.group(
//     {
//       firstName: new FormControl(null, [Validators.required]),
//       secondName: new FormControl(null, [Validators.required]),
//       thirdName: new FormControl(""),
//       fourthName: new FormControl(""),
//       nationality: new FormControl(null),
//       nationalId:new FormControl("",[Validators.maxLength(5),Validators.required]),
//       gender: new FormControl(null, [Validators.required]),
//       mobileNumber: new FormControl(null, [Validators.maxLength(14)]),
//       gregorianBirthdate: new FormControl(null, [Validators.required]),
//       lifeStatus: new FormControl(null, [Validators.required]),
//       idIssueDate: new FormControl(null),
//       idExpiryDate: new FormControl(null),
//       email:new FormControl(null, [Validators.email]),
//       ownerTypeId:new FormControl(null,[Validators.required]),
//       reason:new FormControl("", [Validators.required])
//     });
//
//
//   get translations() {
//     return translations;
//   }
//
//   private setLimits() {
//     //this.minGreg = {year: 1870, month: 1, day: 1};
//     this.minDate = {year: 100, month: 1, day: 1};
//     // this.maxGregToday = this.dateHelper.GetTodayGregorian();
//     this.maxDate = this.dateHelper.GetTodayHijri();
//
//     this.maxDateExpiry = this.dateHelper.GetTodayHijri();
//     this.maxDateExpiry.year = this.maxDateExpiry.year+100;
//     this.minDateExpiry = this.dateHelper.GetTodayHijri();
//     this.minDateExpiry.year = this.maxDateExpiry.year - 150;
//   }
//
//   isElementInvalid(elementName: string) {
//     return isElementInvalid(this.hafezaForm, elementName);
//   }
//
//   firstNameValidationItems: ValidationItem[] = [
//     { message: "الاسم الاول مطلوب", flag: isElementMissed.bind(this, this.hafezaForm, 'firstName') }
//   ];
//
//
//   secondNameValidationItems: ValidationItem[] = [
//     { message: "اسم الأب مطلوب", flag: isElementMissed.bind(this, this.hafezaForm, 'secondName') }
//   ];
//
//
//   thirdNameValidationItems: ValidationItem[] = [
//     { message: "اسم الجد مطلوب", flag: isElementMissed.bind(this, this.hafezaForm, 'thirdName') }
//   ];
//
//   fourthNameValidationItems: ValidationItem[] = [
//     { message: "اسم العائلة مطلوب", flag: isElementMissed.bind(this, this.hafezaForm, 'fourthName') }
//   ];
//
//
//
//   nationalIdValidationItems : ValidationItem[] = [
//     { message: "رقم الهوية من 5 ارقام او حروف", flag: isElementMissed.bind(this, this.hafezaForm, 'nationalId') }
//   ];
//
//   genderValidationItems: ValidationItem[] = [
//     { message: "الجنس مطلوب", flag: isElementMissed.bind(this, this.hafezaForm, 'gender') }
//   ];
//
//   lifeStatusValidationItems: ValidationItem[] = [
//     { message: "حالة الحياة مطلوبة", flag: isElementMissed.bind(this, this.hafezaForm, 'lifeStatus') }
//   ];
//
//   ownerTypeIdValidationItems: ValidationItem[] = [
//     { message: "حالة الحياة مطلوبة", flag: isElementMissed.bind(this, this.hafezaForm, 'ownerTypeId') }
//   ];
//
//   nationalityValidationItems: ValidationItem[] = [
//     { message: "الجنسية مطلوب", flag: isElementMissed.bind(this, this.hafezaForm, 'nationality') }
//   ];
//
//   mobileNumberValidationItems: ValidationItem[] = [
//     { message: "رقم الجوال يجب أن يحتوي علىاكثر من 14 رقم", flag: isElementTooLong.bind(this, this.hafezaForm, 'mobileNumber') }
//   ];
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
//   emailValidationItems: ValidationItem[] = [
//     {message: translations.missingEmail, flag: isElementMissed.bind(this, this.hafezaForm, 'email')},
//     { message: translations.invalidEmail, flag: isElementInvalid.bind(this, this.hafezaForm, 'email') }
//   ];
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
//   lifeStatusFormGender = {
//     '0': translations.alive,
//     '1': translations.dead
//   }
//
//   onDateChange(event)
//   {
//     if(this.selectedDate)
//       this.birthDay = `${this.selectedDate.year}-${this.selectedDate.month}-${this.selectedDate.day}`;
//     else
//       this.birthDay="";
//     this.hafezaForm.get('gregorianBirthdate').setValue( this.birthDay);
//   }
//
//   onDateChangeIdIssueDate(event){
//     if(this.selectedDateIdIssueDate)
//       this.idIssueDate = `${this.selectedDateIdIssueDate.year}-${this.selectedDateIdIssueDate.month}-${this.selectedDateIdIssueDate.day}`;
//     else
//       this.idIssueDate="";
//     this.hafezaForm.get('idIssueDate').setValue( this.idIssueDate);
//   }
//
//   onDateChangeIdExpiryDate(event){
//     if(this.selectedDateIdExpiryDate)
//       this.idExpiryDate = `${this.selectedDateIdExpiryDate.year}-${this.selectedDateIdExpiryDate.month}-${this.selectedDateIdExpiryDate.day}`;
//     else
//       this.idExpiryDate="";
//     this.hafezaForm.get('idExpiryDate').setValue( this.idExpiryDate);
//
//   }
//
//   changeOwner(event){
//     this.ownertypehint = HintDictionary.getHintByKey(event?.target?.selectedOptions[0]?.dataset?.hintkey);
//
//   }
//
//
//   isElementInvalidAnyForm(form: FormGroup, elementName: string) {
//     return isElementInvalid(form, elementName);
//   }
//
//
}
