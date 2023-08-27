import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication-service.service';

@Injectable({
  providedIn: 'root'
})
export class PublicActiveProfileGuardService implements CanActivate {
  constructor(private authenticationService: AuthenticationService){

  }
  canActivate(
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  if(!this.authenticationService.isLoggedIn){
    this.authenticationService.redirectToUserLoginLandingPage();
    return false;
  }

  if(!this.authenticationService.IsPublicUserProfileCompleted){
    this.authenticationService.redirectToPublicMyProfilePage();
    return false;
  }
    return true;

  }

}
