import { TranslationWidth, getLocaleDayNames, getLocaleMonthNames, registerLocaleData, FormStyle, } from "@angular/common";
import { NgbDatepickerI18n, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { I18n  } from "./datepickerI18n";
import { Injectable } from "@angular/core";

const WEEKDAYSAr = ['إثنين', 'ثلاثاء', 'اربعاء', 'خميس', 'جمعة', 'سبت', 'أحد'];
const WEEKDAYSen = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
const MONTHSAr = ['محرم', 'صفر', 'ربيع الأول', 'ربيع الآخر', 'جمادى الأولى', 'جمادى الآخرة', 'رجب', 'شعبان', 'رمضان', 'شوال','ذو القعدة', 'ذو الحجة'];
const MONTHSEn = ['Muḥarram', 'Safar', 'Rabīʿ al-Awwal', 'Rabī’ al-Ākhir', 'Jumādá al-Ūlá', 'Jumādá al-Ākhirah', 'Rajab', 'Sha‘bān', 'Ramaḍān', 'Shawwāl','Dhū al-Qa‘dah', 'Dhū al-Ḥijjah'];


@Injectable()
export class hijriDatepickerI18n  extends NgbDatepickerI18n
{ private _weekdaysShort: readonly string[];
  private _monthsShort: readonly string[];
  private _monthsFull: readonly string[];
 constructor (private _I18n : I18n )
 {
    super();
    this.Rebind(this._I18n);

 }
   Rebind(_I18n : I18n)
   {
    if(_I18n.language.includes('ar'))
    {

      this._weekdaysShort = WEEKDAYSAr;
      this._monthsShort = MONTHSAr;
      this._monthsFull = MONTHSAr;
    }else
    {
      this._weekdaysShort = WEEKDAYSen;
      this._monthsShort = MONTHSEn;
      this._monthsFull = MONTHSEn;
    }
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
