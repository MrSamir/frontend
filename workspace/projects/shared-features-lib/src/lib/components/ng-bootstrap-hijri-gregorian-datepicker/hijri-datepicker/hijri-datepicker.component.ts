import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
  ChangeDetectorRef,
  AfterContentChecked,
  Renderer2,
  ElementRef,
  ViewContainerRef,
  EmbeddedViewRef,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  NgbCalendar,
  NgbCalendarIslamicUmalqura,
  NgbDatepickerI18n,
  NgbDateStruct,
  NgbInputDatepicker,
} from '@ng-bootstrap/ng-bootstrap';

import { I18n } from '../datepicker-I18n/datepickerI18n';
import { hijriDatepickerI18n } from '../datepicker-I18n/hijriDatepickerI18n';
import { DateFormatterService } from '../date-formatter.service';
import { CustomYearSelectComponent } from './custom-year-select/custom-year-select.component';

@Component({
  selector: 'hijri-datepicker',
  templateUrl: './hijri-datepicker.component.html',
  styleUrls: ['./hijri-datepicker.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    I18n,
    hijriDatepickerI18n,
    DateFormatterService,
    { provide: NgbDatepickerI18n, useClass: hijriDatepickerI18n },
    { provide: NgbCalendar, useClass: NgbCalendarIslamicUmalqura },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => HijriDatepickerComponent),
      multi: true,
    },
  ],
})
export class HijriDatepickerComponent implements OnInit, AfterContentChecked {
  @ViewChild('nhdatepicker') datePicker: NgbInputDatepicker;
  @ViewChild('yearSelectHost', { static: true, read: ElementRef })
  yearSelectHost: ElementRef;
  @Input() SelectedDate?: NgbDateStruct;
  @Input() class = '';
  @Input() placeholder = '';
  @Input() Label = '';
  @Input() IsRequired = false;
  @Input() IsDisabled = false;
  @Input() min: NgbDateStruct;
  @Input() max: NgbDateStruct;
  @Input() name: string;
  @Output() SelectedDateChange: EventEmitter<NgbDateStruct> =
    new EventEmitter();
  labelcss = 'col-form-label';
  selectedYear: number;
  constructor(
    private _i18n: I18n,
    private dateFormatterService: DateFormatterService,
    private cd: ChangeDetectorRef,
    private renderer: Renderer2,
    private vcr: ViewContainerRef
  ) { }

  ngAfterContentChecked(): void {
    this.cd.detectChanges();
  }

  set Locale(language: string) {
    this._i18n.language = language;
  }

  get Locale() {
    return this._i18n.language;
  }
  ngOnInit() {
    this.class = this.class + ' calicon';
    if (this.IsRequired) {
      this.labelcss = this.labelcss + ' requiredInput';
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

  changeDate() {
    const nextDate = {
      ...(this.SelectedDate || { day: 1, month: 1 }),
      year: this.selectedYear,
    };
    this.SelectedDateChange.emit(nextDate);
    this.datePicker.writeValue(nextDate);
  }

  private clampSelectedYearMin(year: number) {
    return year <= 0 ? 1 : year;
  }

  private clampSelectedYearMax(year: number) {
    return year > 3000 ? 3000 : year;
  }

  private clampSelectedYear(year: number) {
    return this.clampSelectedYearMax(this.clampSelectedYearMin(year));
  }

  private attachCustomDatepicker() {
    const select = document.querySelector('ngb-datepicker-navigation-select');
    const navInputs = select?.querySelectorAll('.form-select');
    const orginalYearSelect = navInputs?.item(1);
    orginalYearSelect?.setAttribute('hidden', '');
    const component = this.vcr.createComponent(CustomYearSelectComponent);
    component.instance.yearChange.subscribe((year) => {
      const clampedYear = this.clampSelectedYear(year);
      this.selectedYear = clampedYear;
      this.datePicker.navigateTo({ year: clampedYear, month: 1, day: 1 });
    });
    if (this.SelectedDate) {
      component.instance.selectedYear = this.SelectedDate.year;
    }
    const domElem = (component.hostView as EmbeddedViewRef<HTMLElement>)
      .rootNodes[0] as HTMLElement;
    this.renderer.appendChild(select, domElem);
  }

  toggleDatepicker() {
    this.datePicker.toggle();
    this.attachCustomDatepicker();
  }
}
