import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

import { AppMessageService } from 'projects/core-lib/src/lib/services/app-message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor (private AppMessageService: AppMessageService){}
  title = 'employee-portal';

  public showToast():void
  {
    //this.AppMessageService.showMessage('Hello, world!', 'success', 'Success Toast');
    //this.AppMessageService.showMessage('tl1','sdfsdf', 'info', 'Info',  'Message Content'); 

    this.AppMessageService.showMessage('msg1','Hello, world!', 'success', 'Success Message');
  }

  public showMessage():void
  {
    this.AppMessageService.showMessage('msg1','Hello, world!', 'success', 'Success Message');
  }
}


