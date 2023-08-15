import { Injectable } from '@angular/core';
import { UtilsService } from '../Utils/Utils.Service';
import { CurrentLangaugeSubjectService } from '../current-langauge-subject.service';
import { AppCoreSubjectService } from '../app-core-subject.service';
import { AppInitializer } from '../../application-configuration-loader/appInitializer';
import { currentCulture } from '../../Classes/currentCulture';
import { appCore } from '../../Classes/appCore';
import { AppConfigSubjectService } from '../appConfigSubjectService';

@Injectable({
  providedIn: 'root',
})
export class LocalizationService {
  constructor(
    private utilsService: UtilsService,
    private CurrentLangauge: CurrentLangaugeSubjectService,
    private AppCoreSubject: AppCoreSubjectService,
    private appconfigSubject:AppConfigSubjectService
  ) {}

  changeLanguage(lang: string) {
    var currentlang = this.CurrentLangauge.getCurrentLangauge();
    var appcore = this.AppCoreSubject.getAppCore();
    var selectedLang = appcore.localization.languages.filter(function (
      value,
      index
    ) {
      return value.name == lang;
    })[0];
    appcore.localization.currentLanguage = selectedLang;
    appcore.localization.currentCulture.displayName = selectedLang.displayName;
    appcore.localization.currentCulture.name = selectedLang.name;
    var appConfig =this.appconfigSubject.getAppConfig();
    this.utilsService.setCookieValue(
      appConfig.langCookieName,
      selectedLang.name
    );
    this.CurrentLangauge.setCurrentLangauge(selectedLang);
    this.AppCoreSubject.setAppCore(appcore);
  }
  localize(Key: string, args?: any) {
    if (!Key) {
      return '';
    }
    const appCore = this.AppCoreSubject.getAppCore();
    const culture = appCore.localization.currentLanguage.name;
   
    let translatedValue = !appCore.localization?.localizationDatas[culture][Key]
      ? Key
      : appCore.localization?.localizationDatas[culture][Key];
    if (args &&args.length>0) {

     translatedValue= this.utilsService.formatString(translatedValue,args);
   /*    for (const index in args) {
        if (args.hasOwnProperty(index)) {
          translatedValue = !translatedValue
            ? Key
            : translatedValue.replace(
                new RegExp(`{{${index}}}`, 'g'),
                args[index]
              );
        }
      } */
    }

    return translatedValue;
  }

  isCurrentCulture(name: string) {}
}

