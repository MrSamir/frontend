import { Injectable } from '@angular/core';
import { languageInfo } from '../Classes/languageInfo';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrentLangaugeSubjectService {
  constructor() {}
  private currentLangaugeObj: BehaviorSubject<languageInfo> =
    new BehaviorSubject<languageInfo>({
      name: "",

      displayName: "",

      icon: "",

      isDefault: false,

      isDisabled: false,

      isRightToLeft: false,
    });

  public setCurrentLangauge(data: languageInfo) {
    this.currentLangaugeObj.next(data);
  }
  public getCurrentLangauge() {
    return this.currentLangaugeObj.getValue();
  }
}
