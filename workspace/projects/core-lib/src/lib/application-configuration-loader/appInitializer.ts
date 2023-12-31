import { Injectable, Injector } from '@angular/core';
import { PlatformLocation, registerLocaleData } from '@angular/common';
import { HttpClient } from '@angular/common/http';
//import * as moment from 'moment-timezone';
//import { filter as _filter, merge as _merge } from 'lodash-es';
import { appCoreLoader } from 'projects/core-lib/src/lib/loaders/appCoreLoader';
import { AppSessionService } from 'projects/core-lib/src/lib/services/app-session.service';
import { AppCoreSubjectService } from 'projects/core-lib/src/lib/services/app-core-subject.service';
import { CurrentLangaugeSubjectService } from '../services/current-langauge-subject.service';
import { UtilsService } from '../../public-api';
import { AppConfigSubjectService } from '../services/appConfigSubjectService';
import { AppConfig } from '../Classes/appConfig';
import { AppCore } from '../Classes/appCore';


// import { AppSessionService } from '@shared/session/app-session.service';
/* import {
  AccountServiceProxy,
} from '@shared/service-proxies/service-proxies'; */

@Injectable({
  providedIn: 'root',
})
export class AppInitializer {
  constructor(
    private _injector: Injector,
    private _platformLocation: PlatformLocation,
    private _httpClient: HttpClient,
    private appcoreLoader: appCoreLoader,
    private appCoreSubject: AppCoreSubjectService,
    private currentLanguge: CurrentLangaugeSubjectService,
    private ConfigSubject: AppConfigSubjectService,
    private utilsService: UtilsService
  ) { }

  private getBaseHref(): string {
    const baseUrl = this._platformLocation.getBaseHrefFromDOM();
    if (baseUrl) {
      return baseUrl;
    }
    return '/';
  }

  async loadAppConfig(config: Partial<AppConfig>) {
    this.ConfigSubject.setAppConfig(config);
    this.ConfigSubject.setBaseHref(this.getBaseHref());
    return this.loadBakcendUserConfig();
  }

  private async loadBakcendUserConfig() {
    const appconfig = this.ConfigSubject.getAppConfig();
    if (!this.utilsService.getCookieValue(appconfig.langCookieName)) {
      this.utilsService.setCookieValue(appconfig.langCookieName, 'ar');
    }
    const cookieLangValue = this.utilsService.getCookieValue(
      appconfig.langCookieName
    )
      ? this.utilsService.getCookieValue(appconfig.langCookieName)
      : 'ar';

    const token = undefined; // App.auth.getToken();

    const requestHeaders = {
      'Accept-Language': `${cookieLangValue}`,
    };

    if (token) {
      requestHeaders['Authorization'] = `Bearer ${token}`;
    }
    return new Promise((resolve) => {
      this._httpClient
        .get<AppCore>(
          `${appconfig.baseApiUrl}/api/AppCoreConfigurationsService/GetAppCoreConfigurations`,
          {
            headers: requestHeaders,
          }
        )
        .subscribe(appCore => {
          console.log(['resolved', appCore])
          this.appCoreSubject.setAppCore(appCore)
          resolve(true);
        });
    })
  }

}
