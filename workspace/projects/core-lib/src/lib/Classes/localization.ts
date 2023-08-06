import { currentCulture } from "./currentCulture";
import { languageInfo } from "./languageInfo";


export class localization {
  constructor() {}
  currentCulture: currentCulture = new currentCulture();
  languages: languageInfo[] = [];
  currentLanguage: languageInfo = new languageInfo();
  localizationDatas: { [key: string]: { [key: string]: string } };
}
