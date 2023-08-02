import { TranslationWidth, getLocaleDayNames, getLocaleMonthNames, registerLocaleData, FormStyle, } from "@angular/common";
import { NgbDatepickerI18n, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import arlocale from '@angular/common/locales/ar';
import enlocale from '@angular/common/locales/en';
import { I18n  } from "./datepickerI18n";
import { Injectable } from "@angular/core";

@Injectable()
export class GregorianDatepickerI18n  extends NgbDatepickerI18n
{ private _weekdaysShort: readonly string[];
  private _monthsShort: readonly string[];
  private _monthsFull: readonly string[];
 constructor (private _I18n : I18n )
 {
    super();
    this.Rebind(_I18n);
 }

 Rebind(_I18n : I18n)
  {
    if(_I18n.language.includes('ar'))
    {
      registerLocaleData(arlocale);

    }else
    {
      registerLocaleData(enlocale);
    }
    const weekdaysStartingOnSunday = getLocaleDayNames(_I18n.language, FormStyle.Standalone, TranslationWidth.Short);
    this._weekdaysShort = weekdaysStartingOnSunday.map((day, index) => weekdaysStartingOnSunday[(index + 1) % 7]);
    this._monthsShort = getLocaleMonthNames(_I18n.language, FormStyle.Standalone, TranslationWidth.Abbreviated);
    this._monthsFull = getLocaleMonthNames(_I18n.language, FormStyle.Standalone, TranslationWidth.Wide);
  }

  getWeekdayLabel(weekday: number, width?: TranslationWidth): string {
    this.Rebind(this._I18n);
    return this._weekdaysShort[weekday - 1];
  }
  getMonthShortName(month: number, year?: number): string {
    this.Rebind(this._I18n);
    return this._monthsShort[month - 1];
  }
  getMonthFullName(month: number, year?: number): string {
    this.Rebind(this._I18n);
    return this._monthsFull[month - 1];
  }
  getDayAriaLabel(date: NgbDateStruct): string {
    return `${date.day}-${date.month}-${date.year}`;
  }

}
