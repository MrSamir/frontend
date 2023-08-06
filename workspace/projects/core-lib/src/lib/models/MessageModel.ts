import { MessageService,Message } from "primeng/api";
import { MessageSeverity } from "../enums/message-severity";


export class MessageModel implements Message {
  closable: boolean | undefined;
  enableService: boolean | undefined;
  severity: MessageSeverity = MessageSeverity.None;
  summary: string = '';
  detail: string = '';
}




