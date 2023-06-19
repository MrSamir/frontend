import {ChangeDetectorRef, EventEmitter, Injectable, OnDestroy, Pipe, PipeTransform} from '@angular/core';
import { LocalizationService } from '../services/localization/localization.service';
import { Subscription } from 'rxjs';

@Injectable()
@Pipe({
  name: 'localize',
  pure: false // required to update the value when the promise is resolved
})
export class LocalizePipe implements PipeTransform {
  value: string = '';
  lastKey: string | null = null;
  lastParams: any[] = [];
  onTranslationChange: Subscription | undefined;
  onLangChange: Subscription | undefined;
  onDefaultLangChange: Subscription | undefined;

  constructor(private localization: LocalizationService) {

  }

  transform(query: any, args?: any): any {

    debugger;
    if (!query) {
      return '';
    }

    let translatedValue = this.localization.currentLanguageData[query];

    if (args) {
      for (const key in args) {
        debugger;
        if (args.hasOwnProperty(key)) {
          translatedValue = translatedValue.replace(new RegExp(`{{${key}}}`, 'g'), args[key]);
        }
      }
    }

    return translatedValue;
  }
}
