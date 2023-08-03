import { ChangeDetectorRef, EventEmitter, Injectable, OnDestroy, Pipe, PipeTransform } from '@angular/core';
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

    if (!query) {
      return '';
    }

    let translatedValue = !LocalizationService.currentLanguageData ? undefined : LocalizationService.currentLanguageData[query];
    if (args) {
      for (const key in args) {
        if (args.hasOwnProperty(key)) {
          translatedValue = !translatedValue ? undefined : translatedValue.replace(new RegExp(`{{${key}}}`, 'g'), args[key]);
        }
      }
    }

    return translatedValue;
  }
}
