import { MessageService } from 'primeng/api'

export class ToastMessageModel {
    value:string='';
    message:string='';
    closable:boolean| undefined;
    enableService:boolean| undefined;
    key:string='';
    severity:string='';
    summary:string='';
    detail:string='';

    constructor(private messageService:MessageService){}
    
    showMessage(key:string, message: string, severity: string , summary: string , detail: string):void
    {
        this.messageService.add({key:key, severity: severity, summary: summary, detail: message});
    }

}



