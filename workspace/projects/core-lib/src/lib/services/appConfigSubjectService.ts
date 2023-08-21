import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { AppConfig } from "../Classes/appConfig";

@Injectable({
  providedIn: "root",
})
export class AppConfigSubjectService {

  private appConfigObj: BehaviorSubject<AppConfig> =
    new BehaviorSubject<AppConfig>({
      baseApiUrl: "",
      appBaseHref: "",
      langCookieName: "",
      tokenCookieName: "",
      refreshTokenName: ""
    });

  public setAppConfig(data: Partial<AppConfig>) {
    this.appConfigObj.next({
      ...this.getAppConfig(),
      ...data
    });
  }

  public getAppConfig() {
    return this.appConfigObj.getValue();
  }

  public setBaseHref(appBaseHref: string) {
    this.appConfigObj.next({
      ...this.getAppConfig(),
      appBaseHref
    })
  }
}
