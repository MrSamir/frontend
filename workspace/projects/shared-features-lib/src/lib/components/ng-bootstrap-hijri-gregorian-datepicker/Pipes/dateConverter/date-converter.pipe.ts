 
import { Pipe, PipeTransform } from '@angular/core';
export enum DateConvertTo{
  hijri="hijri",
  gregorian='gregorian'
}

@Pipe({
  name: 'dateConverter'
})
export class DateConverterPipe implements PipeTransform {
 //value: DateTime|string,convertTo :string,format:string,sourceforma:string=undefined
    transform(): string {
  //   let date='';
  //   if(value instanceof DateTime)
  //       date = value.toISO();
  //       else
  //       date= DateTime.fromFormat(value,sourceforma).toISO();
  //   if(convertTo== DateConvertTo.hijri)
  //   {
  //    return momentHijri(date,"YYYY-MM-DDTHH:mm:ssZ").format(format);
  //   }
  //   else
  //   {
  //    return momentHijri(date,"YYYY-MM-DDTHH:mm:ssZ").locale('en').format(format)
  //   }
    return '';
    }

}
