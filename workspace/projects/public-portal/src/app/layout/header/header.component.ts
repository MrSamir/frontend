import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public isCollapsed = true;
  isUserLoggedIn: boolean;
  inboxUrl: string = '#';
  //  version: string = environment.version;
  //items: MenuItem[] | undefined;
  private navClasses = {
    normal: 'wrapper-collapse',
    collapsed: 'wrapper-expand'
  };
  private state = 'normal';

  menuHidden = true;
  constructor( private titleService: Title) { }

  ngOnInit() {
  }


  login() {
    // this.authenticationServiceV2.redirectToPublicUserLoginLandingPage();
  }

  logout() {
    // this.authenticationServiceV2.logout();
  }

  internalLogin(){}
  get pageTitle(): string {
    
     return this.titleService.getTitle();
  }
}
