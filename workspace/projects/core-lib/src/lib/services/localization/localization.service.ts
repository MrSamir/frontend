import { Injectable } from '@angular/core';
import { appCore } from '../../Classes/appCore';
import { localization } from "../../Classes/localization";
import { setting } from "../../Classes/setting";
import { BehaviorSubject } from 'rxjs';
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
      debugger;
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
      debugger;
      // ///for test
      // let l1 = new languageInfo;
      // l1.name = "ar";
      // l1.isRightToLeft = true;
      // l1.languageData = "{\"common.welcom\":\"مرحبا {{name}}\"}";
      // let l2 = new languageInfo;
      // l2.name = "en";
      // l2.isRightToLeft = true;
      // l2.languageData = "{\"common.welcom\":\"welcom {{name}}\"}";
      // locals.languages.push(l1, l2);

      let currentLanguage = locals?.languagesInfo?.find(l=>l.name == lang)
      this.currentLanguageData = JSON.parse(currentLanguage?.languageData || "{}");
      console.log(this.currentLanguageData);
    }


    // private unsubscribeAppCore(){
    //   this.appCoreObj.unsubscribe();
    // }
}
