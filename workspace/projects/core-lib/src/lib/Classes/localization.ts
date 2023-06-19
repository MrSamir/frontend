import { languageInfo } from "./languageInfo";
import { localizationSource } from "./localizationSource";


export class localization {
  constructor() {
  }

  languages: languageInfo[] = [];

  currentLanguage: languageInfo = new languageInfo();

  sources: localizationSource[] = [];

  defaultSourceName: string | undefined;

  values: { [key: string]: { [key: string]: string; }; } | undefined;

}
