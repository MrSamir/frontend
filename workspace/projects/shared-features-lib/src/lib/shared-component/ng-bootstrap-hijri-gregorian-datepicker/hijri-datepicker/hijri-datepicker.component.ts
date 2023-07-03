import { Component, EventEmitter, Injectable, Input, Output, ViewChild } from '@angular/core';
import {NgbDateStruct,NgbCalendar,NgbDatepickerI18n, NgbInputDatepicker, NgbCalendarIslamicUmalqura} from '@ng-bootstrap/ng-bootstrap';

const WEEKDAYS = ['ن', 'ث', 'ر', 'خ', 'ج', 'س', 'ح'];
const MONTHS = ['محرم','صفر','ربيع الأول','ربيع الآخر','جمادى الأولى','جمادى الآخرة','رجب','شعبان','رمضان','شوال','ذو القعدة','ذو الحجة',];

@Injectable()
export class IslamicI18n extends NgbDatepickerI18n {
	getMonthShortName(month: number) {
		return MONTHS[month - 1];
	}

	getMonthFullName(month: number) {
		return MONTHS[month - 1];
	}

	getWeekdayLabel(weekday: number) {
		return WEEKDAYS[weekday - 1];
	}

	getDayAriaLabel(date: NgbDateStruct): string {
		return `${date.day}-${date.month}-${date.year}`;
	}
}

@Component({
  selector: 'app-hijri-datepicker',
  templateUrl: './hijri-datepicker.component.html',
  styleUrls: ['./hijri-datepicker.component.css'],
  providers: [
		{ provide: NgbCalendar, useClass: NgbCalendarIslamicUmalqura  },
		{ provide: NgbDatepickerI18n, useClass: IslamicI18n },
	],
})


export class HijriDatepickerComponent {
	model: NgbDateStruct;
	@Input() SelectedDate: NgbDateStruct | undefined;
	@Input() class: string = "form-control";
	@Input() placeholder: string = "d/m/yyyy";
 
	@Input() IsRequired: boolean = false;
	@Input() IsDisabled: boolean = false;
	@Input() min: NgbDateStruct;
	@Input() max: NgbDateStruct;
	@Input() name: string;
	labelcss = "col-form-label";
	@Output() SelectedDateChange: EventEmitter<NgbDateStruct> = new EventEmitter();
	@ViewChild('ngdatepicker') datepicker:NgbInputDatepicker;
 
 
	constructor(private calendar: NgbCalendar) {}

	selectToday() {
		this.model = this.calendar.getToday();
	}
	onBlur() {
    
		if (!this.model) {
		  this.SelectedDateChange.emit(undefined);
		}
		
	  }
	  onDateSelect() {
		this.SelectedDateChange.emit(this.model!);
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
 