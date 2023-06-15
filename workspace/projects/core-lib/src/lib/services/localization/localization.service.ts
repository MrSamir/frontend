import { Injectable } from '@angular/core';
import { appCore } from '../../Interfaces/appCore';

@Injectable({
  providedIn: 'root'
})
export class LocalizationService {

  get languages() {
      return appCore.localization.languageInfo[];
  }

  get currentLanguage(): appCore.localization.ILanguageInfo {
      return appCore.localization.currentLanguage;
  }
 localizeWeb(key: string): string {
    return appCore.localization.localizeWeb(key);
}
  localize(key: string, sourceName: string): string {

      return appCore.localization.localize(key, sourceName);
  }

  getSource(sourceName: string): (...key: string[]) => string {
      return appCore.localization.getSource(sourceName);
  }
  localizeWeb: (key: string) => string;

    localize(key: string, sourceName: string): string;

    getSource(sourceName: string): (...key: string[]) => string;

    isCurrentCulture(name: string): boolean;


}
