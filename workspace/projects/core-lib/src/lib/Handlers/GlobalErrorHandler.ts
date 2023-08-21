import { ErrorHandler, Injectable, NgZone } from "@angular/core";

import { HttpErrorResponse, HttpStatusCode } from "@angular/common/http";
import { MessageTypeEnum } from "../enums/message-type";
import { MessageSeverity } from "../enums/message-severity";
import { AppMessageService } from "../services/message/app-message.service";
import { MessageModel } from "../models/MessageModel";


@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(
    private messageService: AppMessageService,
    private zone: NgZone
  ) {}

  handleError(error: any) {
    // Check if it's an error from an HTTP response
    if (!(error instanceof HttpErrorResponse)) {
       if (error.status == HttpStatusCode.Unauthorized){
         //ToDo: handel logout in case falier of refresh the token.
           var message =new MessageModel();
           message.closable=true;
           message.detail = error.message;
           
           message.severity=MessageSeverity.Error;
           message.summary="Authntication Error";
         this.messageService.showMessage(MessageTypeEnum.message, message);
        }else if(error.status==HttpStatusCode.BadRequest)
        {
          console.error(error);
        }
        else
        {
                 var message = new MessageModel();
                 message.closable = true;
                 message.detail = error.message;
                 message.severity = MessageSeverity.Error;
                 message.summary = 'Error';
                 this.messageService.showMessage(
                   MessageTypeEnum.message,
                   message
                 );
               console.error(error);
        }
    }else
    {
    this.zone.run(() =>{
        /*    var message =new MessageModel();
           message.closable=true;
           message.detail = error.message;
           message.severity=MessageSeverity.Error;
           message.summary="Error";
         this.messageService.showMessage(MessageTypeEnum.message, message); */
    });
     }
  }
}
 