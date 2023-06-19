import { Injectable } from '@angular/core';
import { appCoreLoader } from '../../loaders/appCoreLoader';
import { AppCoreSubjectService } from '../app-core-subject.service';
import { appCore } from '../../Classes/appCore';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  constructor(private customLoader: appCoreLoader, private appCoreSubject: AppCoreSubjectService) {
  }
  getSettings() {
    let app = this.appCoreSubject.getAppCore();
    if(!app.settings){
      this.customLoader.load("", app).then((result:appCore)=>{this.appCoreSubject.setAppCore(result);});
    }

    app = this.appCoreSubject.getAppCore();
    const settings = app.settings;
    return settings
  }
}
