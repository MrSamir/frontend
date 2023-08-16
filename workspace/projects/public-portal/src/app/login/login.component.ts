import { Component, Injector, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { AccountProxy, LoginModel } from '../modules/shared/services/services-proxies/service-proxies';
import { ComponentBase } from 'projects/core-lib/src/lib/components/ComponentBase/ComponentBase.component';


import { MessageTypeEnum } from 'projects/core-lib/src/lib/enums/message-type';

import { MessageModel } from 'projects/core-lib/src/lib/models/MessageModel';
import { MessageSeverity } from 'projects/core-lib/src/lib/enums/message-severity';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent extends ComponentBase implements OnInit {
  loginmodel: LoginModel = new LoginModel();
  constructor(
    _injecter: Injector,
    private router: Router,
    private accountServiceProxy: AccountProxy
  ) {
    super(_injecter);
  }

  ngOnInit() {
     }
  
  redirectToLandingPage() {
    // this.authenticationServiceV2.redirectToPublicUserLoginPage();

    this.router.navigate(['landing']).then(() => {});
  }

  mockedUserLogin() {
  
      this.accountServiceProxy.login(this.loginmodel).subscribe((result) => {
       if(result.isSuccess){
        this.Util.setCookieValue(
          this.config.getAppConfig().tokenCookieName,
          result.dto.accessToken!
        );
        this.Util.setCookieValue(this.config.getAppConfig().refreshTokenName,result.dto.refreshToken.token!)
        this.redirectToLandingPage();
      }else
      {
        var message: MessageModel=new MessageModel()
        message.summary="Invalid Auntication ";
        message.detail=result.message!;
        message.severity= MessageSeverity.Error;

        this.message.showMessage(MessageTypeEnum.toast,message);
      }

      });
  }
}
