import { ChangeDetectorRef, EventEmitter, Injectable, OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppInitializer } from '../application-configuration-loader/appInitializer';
import { AppCoreSubjectService } from '../services/app-core-subject.service';
import { LocalizationService } from '../../public-api';

@Injectable()
@Pipe({
  name: 'localize',
  pure: false, // required to update the value when the promise is resolved
})
export class LocalizePipe implements PipeTransform {
  value: string = '';
  lastKey: string | null = null;
  lastParams: any[] = [];
  onTranslationChange: Subscription | undefined;
  onLangChange: Subscription | undefined;
  onDefaultLangChange: Subscription | undefined;

  constructor( private locliazeService: LocalizationService) {

  }

  transform(query: any, args?: any): any {
   return this.locliazeService.localize(query,args);
  }
}
