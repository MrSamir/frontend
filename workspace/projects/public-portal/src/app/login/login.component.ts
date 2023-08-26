import { AuthenticationService } from './../../../../core-lib/src/lib/services/authentication-service.service';
import { Component, Injector } from '@angular/core';
import { Router } from '@angular/router';
import {
  AccountProxy,
  LoginModel,
} from '../modules/shared/services/services-proxies/service-proxies';
import { ComponentBase } from 'projects/core-lib/src/lib/components/ComponentBase/ComponentBase.component';

import { MessageTypeEnum } from 'projects/core-lib/src/lib/enums/message-type';

import { MessageModel } from 'projects/core-lib/src/lib/models/MessageModel';
import { MessageSeverity } from 'projects/core-lib/src/lib/enums/message-severity';
import { LoggedInUserInfo } from 'projects/core-lib/src/lib/models/LoggedInUserInfo';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent extends ComponentBase {
  loginmodel: LoginModel = new LoginModel();
  constructor(
    _injecter: Injector,
    private router: Router,
    private accountServiceProxy: AccountProxy,
    private authenticationService: AuthenticationService
  ) {
    super(_injecter);
  }

  redirectToLandingPage() {
    this.authenticationService.redirectToLandingPage();
  }

  mockedUserLogin() {
    this.accountServiceProxy.login(this.loginmodel).subscribe((result) => {
      if (result.isSuccess) {
        this.Util.setCookieValue(
          this.config.getAppConfig().tokenCookieName,
          result.dto.accessToken!
        );
        this.Util.setCookieValue(
          this.config.getAppConfig().refreshTokenName,
          result.dto.refreshToken.token!
        );
        var userInfo = new LoggedInUserInfo();
        userInfo.isUserConfirmed = result.dto.isUserConfirmed;
        this.authenticationService.setloggedInUserObservable(userInfo);

        if(userInfo.isUserConfirmed)
        {
          this.authenticationService.redirectToLandingPage()
        }
        else
        {
          this.authenticationService.redirectToPublicMyProfilePage()
        }
        
      } else {
        const message: MessageModel = new MessageModel();
        message.summary = 'Invalid Auntication ';
        message.detail = result.message!;
        message.severity = MessageSeverity.Error;

        this.message.showMessage(MessageTypeEnum.toast, message);
      }
    });
  }
}
