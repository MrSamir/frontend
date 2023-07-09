import { Injectable } from '@angular/core';
import { appCore } from '../../Classes/appCore';
import { appCoreLoader } from '../../loaders/appCoreLoader';
import { AppCoreSubjectService } from '../app-core-subject.service';

@Injectable({
  providedIn: 'root'
})
export class LocalizationService {

  currentLanguageData:any;
  appData: appCore = new appCore;
  constructor(private customLoader: appCoreLoader, private appCoreSubject: AppCoreSubjectService) {
  }

    use(lang: string){
      let app = this.appCoreSubject.getAppCore();
      if(app.localization.languagesInfo.length == 0){
         this.customLoader.load("http://localhost:5022/Home/GetAppCore", app).then((result:appCore)=>{
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

      return this.currentLanguageData
    }

    setLocalization(app: appCore, lang: any){
      let locals = app.localization;
      let currentLanguage = locals?.languagesInfo?.find(l=>l.name == lang)
      this.currentLanguageData = JSON.parse(currentLanguage?.languageData || "{}");
      console.log(this.currentLanguageData);
    }

}
