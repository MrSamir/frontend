import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api'
import { MessageTypeEnum } from '../enums/message-type';
import { ToastMessageModel } from '../models/toast-message';
import { DialogModel } from '../models/dialog';
import {ConfirmationService, ConfirmEventType} from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class AppMessageService {

  private toastMessageModel:ToastMessageModel | undefined;
  private dialogModel:DialogModel| undefined;
  constructor(private messageService:MessageService,private confirmationService:ConfirmationService) 
  { }


  showMessage(messageTypeId:number,messagebody:any)
  {
      switch(messageTypeId)
      {
        case MessageTypeEnum.toast:
        case MessageTypeEnum.message:
          let toast= messagebody as ToastMessageModel;
          this.toastMessageModel=new ToastMessageModel(this.messageService);
          this.toastMessageModel.showMessage(toast.key,toast.message,toast.severity,toast.summary,toast.detail);
          break;

        case MessageTypeEnum.Dialog:
          let dialog=messagebody as DialogModel;
          this.dialogModel=new DialogModel(this.confirmationService);
          this.dialogModel.showDialog(dialog.key,dialog.message,dialog.header,dialog.icon);
          break;
      }
  }

  // showMessage(key:string, message: string, severity: string = 'success', summary: string = '', detail: string = ''):void
  // {
  //   this.messageService.add({key:key, severity: severity, summary: summary, detail: message});
  // }
}
