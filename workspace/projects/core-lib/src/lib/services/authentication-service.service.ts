import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from "@angular/router";
import { LoggedInUserInfo } from '../models/LoggedInUserInfo';
import { __values } from 'tslib';

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

  public static PUBLIC_USER_LOGIN_PAGE: string = 'public/login';
  public static PUBLIC_USER_MY_PROFILE_PAGE: string = 'public/my-profile';


  // public loginStateObsevable: BehaviorSubject<NafathLoginState> = new BehaviorSubject<NafathLoginState>({
  //   status: NafathAuthenticationStatusEnum.New,
  //   random: undefined,
  //   transId: undefined,
  //   connectionId: undefined
  // });

  public loggedInUserObservable: BehaviorSubject<LoggedInUserInfo>
    = new BehaviorSubject<LoggedInUserInfo>(new LoggedInUserInfo());


  constructor(

    private router: Router) {

  }

  public get isUserConfirmed(): boolean {
    return this.loggedInUserObservable.getValue().isUserConfirmed;
  }

  public setloggedInUserObservable(loggedInUserInfo: LoggedInUserInfo) {
    this.loggedInUserObservable.next(loggedInUserInfo);
  }


  redirectToUserLoginLandingPage() {
    this.router.navigate([AuthenticationService.PUBLIC_USER_LOGIN_PAGE]).then(() => {
    });
  }

  redirectToPublicMyProfilePage() {
    this.router.navigate([AuthenticationService.PUBLIC_USER_MY_PROFILE_PAGE]).then(() => {
    });
  }

}
