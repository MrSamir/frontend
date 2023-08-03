import { Injectable } from '@angular/core';
import { appCore } from '../../Classes/appCore';
import { appCoreLoader } from '../../loaders/appCoreLoader';
import { AppCoreSubjectService } from '../app-core-subject.service';

@Injectable({
  providedIn: 'root'
})
export class LocalizationService {

  public static currentLanguageData:any;
  appData: appCore = new appCore;
  constructor(private customLoader: appCoreLoader, private appCoreSubject: AppCoreSubjectService) {
  }

    use(lang: string){
      let app = this.appCoreSubject.getAppCore();
      if(app.localization.languagesInfo.length == 0){
         this.customLoader.load("https://localhost:7071/api/AppCoreConfigurationsService/GetAppCoreConfigurations", app).then((result:any)=>{
          this.appData = result;
          this.appCoreSubject.setAppCore(this.appData);
          app = this.appCoreSubject.getAppCore();
          this.setLocalization(app, lang);
        });

      }
      else
        {
          this.setLocalization(app, lang);
        }

      return LocalizationService.currentLanguageData
    }

    setLocalization(app: appCore, lang: any){
      let locals = app.localization;
      let currentLanguage = locals?.languagesInfo?.find(l=>l.name == lang)
      LocalizationService.currentLanguageData = JSON.parse(currentLanguage?.languageData || "{}");
      console.log(LocalizationService.currentLanguageData);
    }

}

