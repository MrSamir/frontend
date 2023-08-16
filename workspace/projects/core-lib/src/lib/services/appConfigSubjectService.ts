import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { appConfig } from "../Classes/appConfig";

@Injectable({
  providedIn: "root",
})
export class AppConfigSubjectService{
  constructor() {}
  
  private appConfigObj: BehaviorSubject<appConfig> =
    new BehaviorSubject<appConfig>({
      baseApiUrl: "",
      appBaseHref: "",
      langCookieName: "",
      tokenCookieName:"",
    refreshTokenName:""
    });

  public setAppConfig(data: appConfig) {
    this.appConfigObj.next(data);
  }
  public getAppConfig() {
    return this.appConfigObj.getValue();
  }
}
