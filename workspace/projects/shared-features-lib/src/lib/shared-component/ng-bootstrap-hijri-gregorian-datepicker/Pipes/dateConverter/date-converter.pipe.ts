import { DateTime } from 'luxon';
import { Pipe, PipeTransform } from '@angular/core';
import * as momentjs from 'moment';
const moment = momentjs;


import * as moment_ from 'moment-hijri';
const momentHijri = moment_;
export enum DateConvertTo{
  hijri="hijri",
  gregorian='gregorian'
}

@Pipe({
  name: 'dateConverter'
})
export class DateConverterPipe implements PipeTransform {

  transform(value: DateTime|string,convertTo :string,format:string,sourceforma:string=undefined): string {
    let date='';
    if(value instanceof DateTime)
        date = value.toISO();
        else
        date= DateTime.fromFormat(value,sourceforma).toISO();
    if(convertTo== DateConvertTo.hijri)
    {
     return momentHijri(date,"YYYY-MM-DDTHH:mm:ssZ").format(format);
    }
    else
    {
     return momentHijri(date,"YYYY-MM-DDTHH:mm:ssZ").locale('en').format(format)
    }
  }

}
