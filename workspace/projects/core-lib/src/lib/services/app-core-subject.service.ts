import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AppCore } from '../Classes/appCore';
import { localization } from "../Classes/localization";
import { setting } from "../Classes/setting";

@Injectable({
  providedIn: 'root'
})
export class AppCoreSubjectService {

  private appCoreObj: BehaviorSubject<AppCore> = new BehaviorSubject<AppCore>({
    localization: new localization(),
    settings: new setting()
  });

  public setAppCore(data: AppCore) {
    this.appCoreObj.next(data);
  }

  public getAppCore() {
    return this.appCoreObj.getValue();
  }

}
