import { Injectable, Injector } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from "@angular/router";
import { LoggedInUserInfo } from '../models/LoggedInUserInfo';
import { __values } from 'tslib';
import { UtilsService } from './Utils/Utils.Service';
import { AppConfigSubjectService } from './appConfigSubjectService';
import { ApplicationUserServiceProxy } from 'projects/public-portal/src/app/modules/shared/services/services-proxies/service-proxies';

const JWT_TOKEN_KEY = "jwt";
const REFRESH_TOKEN_KEY = "refresh-token";
const CURRENT_USER_TYPE = "current-user-type";


/**
 * Provides a base for authentication workflow.
 * The Credentials interface as well as login/logout methods should be replaced with proper implementation.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  Util:UtilsService;
  config:AppConfigSubjectService
  public static PUBLIC_USER_LOGIN_PAGE: string = '';
  public static PUBLIC_USER_MY_PROFILE_PAGE: string = 'public-user-profile';
  public static PUBLIC_USER_HOME_PAGE: string = 'landing';

  // public loginStateObsevable: BehaviorSubject<NafathLoginState> = new BehaviorSubject<NafathLoginState>({
  //   status: NafathAuthenticationStatusEnum.New,
  //   random: undefined,
  //   transId: undefined,
  //   connectionId: undefined
  // });

  public loggedInUserObservable: BehaviorSubject<LoggedInUserInfo>
    = new BehaviorSubject<LoggedInUserInfo>(new LoggedInUserInfo());


  constructor(

    private router: Router, injector: Injector, private applicationUserServiceProxy: ApplicationUserServiceProxy) {
      this.Util = injector.get<UtilsService>(UtilsService);
      this.config=injector.get <AppConfigSubjectService> (AppConfigSubjectService);
  }

  // public get isUserConfirmed(): boolean {
  //   return this.loggedInUserObservable.getValue().isUserConfirmed;
  // }
  public get currentLoggedInUser(): LoggedInUserInfo {
    var currentUser = this.loggedInUserObservable.getValue();
    if (currentUser.isUserConfirmed == undefined)
    {
          currentUser.isUserConfirmed = Boolean(localStorage.getItem("IsConfirmed"));
          this.setloggedInUserObservable(currentUser);
    }
    currentUser = this.loggedInUserObservable.getValue();
    return currentUser
  }

  public setloggedInUserObservable(loggedInUserInfo: LoggedInUserInfo) {
    this.loggedInUserObservable.next(loggedInUserInfo);
  }


  redirectToUserLoginLandingPage() {
    this.router.navigate([AuthenticationService.PUBLIC_USER_LOGIN_PAGE]).then(() => {
    });
  }

  redirectToLandingPage() {
    this.router.navigate([AuthenticationService.PUBLIC_USER_HOME_PAGE]).then(() => {
    });
  }

  redirectToPublicMyProfilePage() {
    this.router.navigate([AuthenticationService.PUBLIC_USER_MY_PROFILE_PAGE]).then(() => {
    });
  }
  public get isLoggedIn(): boolean {
    if (!this.isJwtTokenValid()) return false;
    return true;
  }

  private isJwtTokenValid(): boolean {
    let token: string = this.Util.getCookieValue(this.config.getAppConfig().tokenCookieName);
    if (!token) return false;
    //let isExpired = this.jwtHelper.isTokenExpired(token);
    return token!= undefined && token!= '';
  }

  public get IsPublicUserProfileCompleted(): boolean {

    if (!this.currentLoggedInUser.isUserConfirmed) return false;
    return true;
  }
}
