import {
  NgbCalendar,
  NgbCalendarGregorian,
  NgbDatepickerI18n,
  NgbDateStruct,
  NgbInputDatepicker,
} from '@ng-bootstrap/ng-bootstrap';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  OnChanges,
  SimpleChanges,
  forwardRef,
  ChangeDetectionStrategy,
  ViewChild,
  ChangeDetectorRef,
  AfterContentChecked,
} from '@angular/core';
import { ngBootstrapDatePickerDateType } from './Const';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { GregorianDatepickerI18n } from './datepicker-I18n/GregorianDatepickerI18n';
import { I18n } from './datepicker-I18n/datepickerI18n';
import { DateFormatterService } from './date-formatter.service';
import moment from 'moment';
import momentHijri from 'moment-hijri';
import '@angular/localize/init';

@Component({
  selector: 'app-ng-bootstrap-hijri-gregorian-datepicker',
  templateUrl: './ng-bootstrap-hijri-gregorian-datepicker.component.html',
  styleUrls: ['./ng-bootstrap-hijri-gregorian-datepicker.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    I18n,
    DateFormatterService,
    { provide: NgbDatepickerI18n, useClass: GregorianDatepickerI18n },
    { provide: NgbCalendar, useClass: NgbCalendarGregorian },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(
        () => NgBootstrapHijriGregorianDatepickerComponent
      ),
      multi: true,
    },
  ],
})
export class NgBootstrapHijriGregorianDatepickerComponent
  implements OnInit, OnChanges, AfterContentChecked {
  @Input() SelectedDate?: NgbDateStruct;
  @Input() class = 'form-control';
  @Input() placeholder = 'd/m/yyyy';
  @Input() Label = 'DatePicker';
  @Input() IsRequired = false;
  @Input() IsDisabled = false;
  @Input() min: NgbDateStruct;
  @Input() max: NgbDateStruct;
  @Input() name: string;
  @Input() CalenderType: ngBootstrapDatePickerDateType =
    ngBootstrapDatePickerDateType.Hijri;
  @Output() SelectedDateChange: EventEmitter<NgbDateStruct> =
    new EventEmitter();
  @ViewChild('ngdatepicker') datepicker: NgbInputDatepicker;

  labelcss = 'col-form-label';

  constructor(
    private _i18n: I18n,
    private dateFormatterService: DateFormatterService,
    private cd: ChangeDetectorRef
  ) { }
  ngAfterContentChecked(): void {
    this.cd.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['CalenderType'] && this.SelectedDate != undefined) {
      if (this.CalenderType == ngBootstrapDatePickerDateType.Hijri) {
        this.SelectedDate = this.dateFormatterService.ToHijri(
          this.SelectedDate
        );
        this.SelectedDateChange.emit(this.SelectedDate);
      } else if (!changes['CalenderType'].isFirstChange()) {
        this.SelectedDate = this.dateFormatterService.ToGregorian(
          this.SelectedDate
        );
        this.SelectedDateChange.emit(this.SelectedDate);
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
      this.SelectedDate = this.dateFormatterService.ToHijriDateStruct(
        date,
        'iD/iM/iYYYY'
      );
    } else {
      this.SelectedDate = this.dateFormatterService.ToGregorianDateStruct(
        date,
        'D/M/YYYY'
      );
    }
    this.SelectedDateChange.emit(this.SelectedDate);
  }
  getSelectedDate(): string {
    if (!this.SelectedDate) {
      throw "No Date Was Selected"
    }
    const formattedDate = this.dateFormatterService.ToString(this.SelectedDate);

    if (this.CalenderType == ngBootstrapDatePickerDateType.Hijri) {
      return momentHijri(formattedDate, 'iD/iM/iYYYY').locale('en').format();
    } else {
      return moment(formattedDate, 'D/M/YYYY').locale('en').format();
    }
  }
  ngOnInit() {
    this.class = this.class + ' calicon';
    if (this.IsRequired) {
      this.labelcss = this.labelcss + ' requiredInput';
    }
    this.cd.detectChanges();
  }
  onBlur() {
    if (!this.SelectedDate) {
      this.SelectedDateChange.emit(undefined);
    }
  }
  onDateSelect() {
    this.SelectedDateChange.emit(this.SelectedDate);
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
