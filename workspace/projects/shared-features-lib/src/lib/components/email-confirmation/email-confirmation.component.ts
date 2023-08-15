import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import * as serviceProxies from 'projects/public-portal/src/app/modules/shared/services/services-proxies/service-proxies';

@Component({
  selector: 'app-email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styles: []
})
export class EmailConfirmationComponent implements OnInit {

  userId: string = this.activatedRoute.snapshot.params['userId'];
  confirmationCode: string = this.activatedRoute.snapshot.params['confirmationCode'];
  confirmationResult: any;

  constructor(private activatedRoute: ActivatedRoute
    , private userProfileProxyService: serviceProxies.ApplicationUserServiceServiceProxy
    //, private authenticationService: AuthenticationService
    ) {
  }

  ngOnInit(): void {
    this.userProfileProxyService.confirmUserEmail(new serviceProxies.ConfirmUserEmailInputDto({
      userId: this.userId,
      code : this.confirmationCode,
      id: 0
    })).subscribe((response) => {
      this.confirmationResult = response;
      if(this.confirmationResult && this.confirmationResult.isSuccess) return;
    })
  }

  onNavigateToHomePage() {
    //this.authenticationService.logout();
  }
}
