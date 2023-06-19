import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MessageTypeEnum } from 'projects/core-lib/src/lib/enums/message-type';

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
    //this.AppMessageService.showMessage(MessageTypeEnum.toast,{key:'msg1',message:'Hello, world!',severity:'success', summary:'Success Message'});
    this.AppMessageService.showMessage(MessageTypeEnum.Dialog,{key:'confirmdlg',message:'Please Confirm',header:'Confirmation Dialog',icon:'pi pi-exclamation-triangle'});
    //this.AppMessageService.showMessage('msg1','Hello, world!', 'success', 'Success Message');
  }

  public showMessage():void
  {
    //this.AppMessageService.showMessage('msg1','Hello, world!', 'success', 'Success Message');
  }
}


