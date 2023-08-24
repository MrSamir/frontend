import { ApplicationUserServiceProxy, ApplicationUserTasks } from './../modules/shared/services/services-proxies/service-proxies';
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
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent extends ComponentBase {
  loginmodel: LoginModel = new LoginModel();
  _applicationUserTasks: ApplicationUserTasks = new ApplicationUserTasks();
  constructor(
    _injecter: Injector,
    private router: Router,
    private accountServiceProxy: AccountProxy,private _applicationUserServiceProxy:ApplicationUserServiceProxy
  ) {
    super(_injecter);
  }

  redirectToLandingPage() {
    // this.authenticationServiceV2.redirectToPublicUserLoginPage();

    this.router.navigate(['landing']);
  }

  mockedUserLogin() {
    this.accountServiceProxy.login(this.loginmodel).subscribe((result) => {
      if (result.isSuccess) {
        this.Util.setCookieValue
        (
          this.config.getAppConfig().tokenCookieName,
          result.dto.accessToken!
        );

        this.Util.setCookieValue(
          this.config.getAppConfig().refreshTokenName,
          result.dto.refreshToken.token!
        );

        this.redirectToLandingPage();
      } 

      else {
        const message: MessageModel = new MessageModel();
        message.summary = 'Invalid Auntication ';
        message.detail = result.message!;
        message.severity = MessageSeverity.Error;

        this.message.showMessage(MessageTypeEnum.toast, message);
      }
    });
  }


UserTasks() {
    this._applicationUserServiceProxy.getCurrentUserTasks().subscribe((result) => {
      if (result.isSuccess) {
        this.Util.setCookieValue(this.config.getAppConfig().tokenCookieName,result.dto.totalCountTasks.toString());
     
        const message: MessageModel = new MessageModel();
        message.summary = '';
        message.detail = result.message!;
        message.severity = MessageSeverity.Error;

        this.message.showMessage(MessageTypeEnum.toast, message);
      }
    });
  }

}
