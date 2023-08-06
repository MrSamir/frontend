import { Component, Injector, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { AccountServiceProxy, LoginModel } from '../modules/shared/services/services-proxies/service-proxies';
import { ComponentBase } from 'projects/core-lib/src/lib/components/ComponentBase/ComponentBase.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'; 
import {
  AppFormControl,
  
} from 'projects/core-lib/src/public-api';
import { isElementMissed, isElementTooLong } from 'projects/core-lib/src/lib/ReactiveFromHelpers/ValidationHelpers';
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
    private accountServiceProxy: AccountServiceProxy,
    private formBuilder: FormBuilder
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
        debugger;
        this.Util.setCookieValue(
          this.config.getAppConfig().TokenCookieName,
          result.token!
        );
        this.redirectToLandingPage();
      });
  }
}
