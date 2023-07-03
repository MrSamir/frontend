import { Injectable } from '@angular/core';
import { NgbDateStruct, NgbDateParserFormatter, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { DateTime } from 'luxon';

import * as momentjs from 'moment';
const moment = momentjs;


 
 



 

 

 
 

@Injectable()
export class DateFormatterService {
 

  hijriformat= new Intl.DateTimeFormat('en-SA-u-ca-islamic-umalqura',{calendar: 'islamic-umalqura', year: 'numeric', month: '2-digit', day: '2-digit' });

  georgianformat= new Intl.DateTimeFormat('en-US',{timeZone: "UTC", year: 'numeric', month: '2-digit', day: '2-digit' });
  constructor(private parserFormatter: NgbDateParserFormatter) {
   
   
   //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    var date = new Date();
    var ngbDateStruct = { day: date.getUTCDay(), month: date.getUTCMonth(), year: date.getUTCFullYear()};
    
   //console.log(this.ToHijri(ngbDateStruct));
    
 /////////////////////////////////////////////////////////////////////////////////////////////
 
       const dateStr = this.hijriformat.format(new Date()).toString();
       const momentDate= dateStr.split('/');
       const day = momentDate[1]; // refer to days
       const month = +momentDate[0] ; // refer to month 
       const year = momentDate[2].split(' ')[0]; //refer to year
       const nghijDate =  new NgbDate(+year, month, +day);
       var ngbDateStruct = { day: nghijDate.day, month: nghijDate.month, year: nghijDate.year};
        
       console.log(this.ToGregorian(ngbDateStruct));
   
       console.log(this.GetTodayGregorian());
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////



   }

    ToString(date: NgbDateStruct): string {
        const dateStr = this.parserFormatter.format(date);
        return dateStr;
    }

  //  ToHijriDateStruct(hijriDate: string, format: string): NgbDate  {

  //    const hijriMomentDate =  toHijri(hijriDate , format); // Parse a Hijri date based on format.

  //    const day = hijriMomentDate.iDate();
  //    const month = +hijriMomentDate.iMonth() + 1 ;
  //    const year = hijriMomentDate.iYear();

  //    const ngDate =  new NgbDate(+year, month, +day);
  //    return ngDate;
  // }


    ToGregorianDateStruct(gregorianDate: string, format: string): NgbDate {
      const momentDate = moment(gregorianDate, format); // Parse a Gregorian date based on format.
      const day = momentDate.date();
      const month = +momentDate.month() + 1;
      const year = momentDate.year();
      const ngDate = new NgbDate(+year, +month, day);
      return ngDate;
    }

    ToHijri(date: NgbDateStruct): NgbDateStruct | null {
        if (!date) {
            return null;
        }
        const dateStr = this.ToString(date);
        const momentDate= this.hijriformat.format(new Date(dateStr)).split('/');
        const day = momentDate[1]; // refer to days
        const month = +momentDate[0] ; // refer to month 
        const year = momentDate[2].split(' ')[0]; //refer to year
        const ngDate =  new NgbDate(+year, month, +day);
        return ngDate;
    }

    ToGregorian(date: NgbDateStruct) {
      if (!date) {
          return null;
      }
      const dateStr =date.month+'/'+date.day+'/'+date.year;//+ ' AH'; //this.ToString(date) +' AH';
      const momentDate = new Date(dateStr).toLocaleDateString("en-US", {
        timeZone: 'UTC',
        calendar: 'gregory',
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).split('/');
      const day = momentDate[1]; // refer to days
      const month = +momentDate[0] ; // refer to month 
      const year = momentDate[2].split(' ')[0]; //refer to year
  
      const ngDate =  new NgbDate(+year, +month, +day);
 
      return ngDate;
  }
   


    // GetTodayHijri(): NgbDateStruct {

    //   const todayHijri = momentHijri().locale('en').format('iYYYY/iM/iD');

    //   return this.ToHijriDateStruct(todayHijri, 'iYYYY/iM/iD') ;

    // }

    GetTodayGregorian(): NgbDateStruct {

      const todayGregorian = moment().locale('en').format('YYYY/M/D');

      return this.ToGregorianDateStruct(todayGregorian, 'YYYY/M/D') ;
    }

}
