import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  public isCollapsed = true;
  isUserLoggedIn: boolean;
  inboxUrl = '#';

  menuHidden = true;
  constructor(private titleService: Title) {}

  get pageTitle(): string {
    return this.titleService.getTitle();
  }
}
