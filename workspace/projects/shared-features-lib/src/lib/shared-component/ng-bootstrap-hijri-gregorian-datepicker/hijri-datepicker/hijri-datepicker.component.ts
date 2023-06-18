import { ChangeDetectionStrategy, Component, EventEmitter, forwardRef, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild, ViewEncapsulation, ChangeDetectorRef, AfterContentChecked } from '@angular/core';
import { ControlContainer, FormControl, FormGroup, NgForm, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { NgbCalendar, NgbCalendarIslamicUmalqura, NgbDatepickerI18n, NgbDateStruct, NgbInputDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { DateFormatterService } from 'ngx-hijri-gregorian-datepicker';
import { I18n } from '../datepicker-I18n/datepickerI18n';
import { hijriDatepickerI18n } from '../datepicker-I18n/hijriDatepickerI18n';

@Component({
  selector: 'hijri-datepicker',
  templateUrl: './hijri-datepicker.component.html',
  styleUrls: ['./hijri-datepicker.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers:[
    I18n,hijriDatepickerI18n,DateFormatterService,
    { provide:NgbDatepickerI18n,useClass: hijriDatepickerI18n},
    {provide: NgbCalendar, useClass: NgbCalendarIslamicUmalqura},
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => HijriDatepickerComponent),
      multi: true
    }

  ]
})
export class HijriDatepickerComponent implements OnInit,OnChanges,AfterContentChecked {
  @ViewChild('nhdatepicker') datePicker: NgbInputDatepicker;
  @Input() SelectedDate :NgbDateStruct | undefined;
  @Input() class:string="";
  @Input() placeholder:string="";
  @Input() Label:string="" ;
   @Input() IsRequired :boolean=false;
   @Input() IsDisabled:boolean=false;
   @Input() min: NgbDateStruct;
   @Input() max: NgbDateStruct;
   @Input() name: string;
   @Output() SelectedDateChange: EventEmitter<NgbDateStruct>=new EventEmitter();
   labelcss="col-form-label";
  constructor( private _i18n:I18n, private dateFormatterService: DateFormatterService,private cd:ChangeDetectorRef ) { }
  ngAfterContentChecked(): void {
    this.cd.detectChanges();
  }
  ngOnChanges(changes: SimpleChanges): void {

  }


  set Locale(language: string) {
    this._i18n.language = language;
  }

  get Locale() {
    return this._i18n.language;
  }
  ngOnInit() {
        this.class=this.class+" calicon";
    if(this.IsRequired)
    {
      this.labelcss=this.labelcss +" requiredInput";
    }

  }
  onBlur() {
    if (!this.SelectedDate) {
      this.SelectedDateChange.emit(undefined);
    }
  }


  close() {
    this.datePicker.close();
  }

  clear() {
    this.SelectedDate = undefined;
    this.close();
    this.SelectedDateChange.emit(undefined);
  }
  changeDate()
  {

    this.SelectedDateChange.emit(this.SelectedDate);
  }
  private setDate(date:string)
  {
        this.SelectedDate=this.dateFormatterService.ToHijriDateStruct(date,'iD/iM/iYYYY');
      this.SelectedDateChange.emit(this.SelectedDate);
  }
}
