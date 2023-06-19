import {ConfirmationService, ConfirmEventType, MessageService} from 'primeng/api';
import {ConfirmDialogModule} from 'primeng/confirmdialog';

export class DialogModel {
    key:string='';
    message:string='';
    header:string='';
    icon:string='';

    constructor(private confirmService:ConfirmationService){}

    showDialog(key:string,message:string,header:string,icon:string):void
    {
        this.confirmService.confirm({
            key:key,
            message: 'Are you sure that you want to perform this action?',
            accept: () => {
                //Actual logic to perform a confirmation
            }
        });
    }

}

