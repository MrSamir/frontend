import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { appCore } from '../Classes/appCore';
import { localization } from "../Classes/localization";
import { setting } from "../Classes/setting";

@Injectable({
  providedIn: 'root'
})
export class AppCoreSubjectService {

  constructor() { }
  private appCoreObj: BehaviorSubject<appCore> = new BehaviorSubject<appCore>({

    localization : new localization(),
    settings : new setting()
  });

  public setAppCore(data:appCore){
    this.appCoreObj.next(data);
  }
  public getAppCore(){
    return this.appCoreObj.getValue();
  }
}
