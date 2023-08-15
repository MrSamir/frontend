import { Injectable } from '@angular/core';
import { Message, MessageService } from 'primeng/api'
import { MessageTypeEnum } from '../../enums/message-type';
import { MessageModel } from '../../models/MessageModel';
import { DailogType, DialogModel } from '../../models/dialog';
import {ConfirmationService, ConfirmEventType} from 'primeng/api';
import { keyframes } from '@angular/animations';

@Injectable({
  providedIn: 'root',
})
export class AppMessageService {
  public toastMessageModel: MessageModel | undefined;
  private dialogModel: DialogModel | undefined;
  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  showMessage(
    messageTypeId: number,
    messagebody: MessageModel | DialogModel,
    Key: string = ''
  ) {
    switch (messageTypeId) {
      case MessageTypeEnum.toast:
        if (messagebody instanceof DialogModel) throw new Error('Message modal show be instance of MessageModel ');
        if (Key == '') Key = 'toast';
        this._showMessage(Key, messagebody as MessageModel);
        break;
      case MessageTypeEnum.message:
        default:
         if (messagebody instanceof DialogModel)
           throw new Error('Message modal show be instance of MessageModel ');

        if (Key == '') Key = 'message';
        this._showMessage(Key, messagebody as MessageModel);
        break;

      case MessageTypeEnum.Dialog:
   if (messagebody instanceof MessageModel)
     throw new Error('Message modal show be instance of DialogModel ');
         if (Key == '') Key = 'confirmDialog';
        let dialog = messagebody as DialogModel;
        this._showDialog(Key, dialog);
        break;
    }
  }

  private _showMessage(key: string, message: MessageModel) {
    let basemessage = message as Message;
    basemessage.key = key;
    this.messageService.add(basemessage);
  }
  private _showDialog(key: string,message:DialogModel): void {

    var IsOkVisable=false;
    var isCancelVisable=false;
     var icon="";
     var okIcon="";
     var CancelIcon="";
    switch(message.dialogType)
    {
      case DailogType.OkCancel:
        default:
        IsOkVisable=true;
        isCancelVisable=true;
        icon="pi pi-question";
       // okIcon = "pi pi-check";
        //CancelIcon = "pi pi-times";
        break;
        case  DailogType.Ok:
           IsOkVisable = true;
           icon = 'pi pi-info';
          break;
          case DailogType.Cancel:
           isCancelVisable = true;
            icon = 'pi pi-info';
            break;

    }
    this.confirmationService.confirm({
      key: key,
      message: message.message,
      header: message.header,
      icon: icon,
      acceptVisible :IsOkVisable ,
      rejectVisible:isCancelVisable,
      acceptLabel:message.OkLabel,
      rejectLabel:message.CancelLabel,
      acceptIcon:okIcon,
      rejectIcon:CancelIcon,
      blockScroll:true,
      closeOnEscape:true,
      defaultFocus:"reject",
      acceptButtonStyleClass:"p-button-success",
      rejectButtonStyleClass:'p-button-danger',
      accept: () => {
        if(message.OnOK!=undefined) message.OnOK();
      },
      reject: () => {
         if (message.OnCancel != undefined) message.OnCancel();
      },
    });
  }
}
