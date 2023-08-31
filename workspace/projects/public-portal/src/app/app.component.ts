import { ChangeDetectorRef, Component } from '@angular/core';
//import {LoginDemoComponent} from 'projects/shared-features-lib/src/lib/components/login-demo/login-demo.component'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Common.welcome';
  constructor(private cdref: ChangeDetectorRef) {

  }
  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }
}
