import { AfterContentChecked, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import {NgbDateStruct, NgbInputDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { ngBootstrapDatePickerDateType } from './Const';
import { I18n } from './datepicker-I18n/datepickerI18n';
import '@angular/localize/init';
import { DateTime } from 'luxon';

import { DateFormatterService } from './date-formatter.service';
@Component({
  selector: 'app-ng-bootstrap-hijri-gregorian-datepicker',
  templateUrl: './ng-bootstrap-hijri-gregorian-datepicker.component.html',
  styleUrls: ['./ng-bootstrap-hijri-gregorian-datepicker.component.css']
})

export class NgBootstrapHijriGregorianDatepickerComponent{// implements OnInit, OnChanges,AfterContentChecked {
  model: NgbDateStruct;
  @Input() SelectedDate: NgbDateStruct | undefined;
  @Input() class: string = "form-control";
  @Input() placeholder: string = "d/m/yyyy";
  @Input() Label: string = "DatePicker";
  @Input() IsRequired: boolean = false;
  @Input() IsDisabled: boolean = false;
  @Input() min: NgbDateStruct;
  @Input() max: NgbDateStruct;
  @Input() name: string;
  @Input() CalenderType: ngBootstrapDatePickerDateType = ngBootstrapDatePickerDateType.Hijri;
  @Output() SelectedDateChange: EventEmitter<NgbDateStruct> = new EventEmitter();
  @ViewChild('ngdatepicker') datepicker:NgbInputDatepicker;

  labelcss = "col-form-label";

   constructor(private _i18n: I18n, private dateFormatterService: DateFormatterService,private cd: ChangeDetectorRef) {
  //   options : Intl.DateTimeFormatOptions
  // options={calender: 'islamic-umalqura',month: 'numeric', day: 'numeric', year: 'numeric'};

const hijriformat= new Intl.DateTimeFormat('en-SA-u-ca-islamic-umalqura',
{calendar: 'islamic-umalqura', year: 'numeric', month: '2-digit', day: '2-digit' });




    // const  hij= new Date('2022-03-03').toLocaleDateString('en-SA-u-ca-islamic-umalqura',
    //   { timeZone: 'UTC', month: 'numeric', day: 'numeric', year: 'numeric' }
    // ) ;
 
const  hij= hijriformat.format(new Date());  // new Date(hij).toLocaleDateString('en-US', { timeZone: 'UTC' });
//console.log(hij);
console.log(hij);

    }
    ngAfterContentChecked(): void {
     this.cd.detectChanges();
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['CalenderType'] && this.SelectedDate!=undefined) {
      if (this.CalenderType == ngBootstrapDatePickerDateType.Hijri) {
        // this.SelectedDate = this.dateFormatterService.ToHijri(this.SelectedDate);
         this.SelectedDateChange.emit(this.SelectedDate);
      } else if  (!changes['CalenderType'].isFirstChange()){
        //this.SelectedDate = this.dateFormatterService.ToGregorian(this.SelectedDate);
        this.SelectedDateChange.emit(this.SelectedDate!);
       
      }
    }

    
  }
  set Locale(language: string) {
    
    this._i18n.language = language;
  }

  get Locale() {
    return this._i18n.language;
  }
  private setDate(date: string) {
    
    if (this.CalenderType == ngBootstrapDatePickerDateType.Hijri) {
      //this.SelectedDate = this.dateFormatterService.ToHijriDateStruct(date, 'iD/iM/iYYYY');
    } else {
      //this.SelectedDate = this.dateFormatterService.ToGregorianDateStruct(date, 'D/M/YYYY');
    }
    this.SelectedDateChange.emit(this.SelectedDate!);
  }
  getSelectedDate(): string | undefined {
    
    let formattedDate ="";
    if (this.SelectedDate !== undefined) {
        formattedDate = this.dateFormatterService.ToString(this.SelectedDate)!;

    }

    if (this.CalenderType == ngBootstrapDatePickerDateType.Hijri) {
      return undefined;
      //momentHijri(formattedDate, 'iD/iM/iYYYY').locale('en').format();
    } else
     // return moment(formattedDate, 'D/M/YYYY').locale('en').format();
     return '';
  }
  ngOnInit() {
    this.class = this.class + " calicon";
    if (this.IsRequired) {
      this.labelcss = this.labelcss + " requiredInput";
    }
    this.cd.detectChanges();
  }
  onBlur() {
    
    if (!this.SelectedDate) {
      this.SelectedDateChange.emit(undefined);
    }
    
  }
  onDateSelect() {
    this.SelectedDateChange.emit(this.SelectedDate!);
  }

  close() {
    this.datepicker.close();
  }

  clear() {
    this.SelectedDate = undefined;
    this.close();
    this.SelectedDateChange.emit(undefined);
  }
}


