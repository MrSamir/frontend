import {ConfirmationService, ConfirmEventType, MessageService} from 'primeng/api';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { Observable, Subject } from 'rxjs';

export class DialogModel {
    key:string='';
    message:string='';
    header:string='';
    icon:string='';

    private responseSubject = new Subject<boolean>();
      // Observable to subscribe to the response
    response$: Observable<boolean> = this.responseSubject.asObservable();

    constructor(private confirmService:ConfirmationService){}

    showDialog(key:string,message:string,header:string,icon:string):void
    {
        this.confirmService.confirm({
            key:key,
            message: message,
            header:header,
            icon:icon,
            accept: () => {
                //Actual logic to perform a confirmation
            },
            reject:()=>{

            }
        });
    }

}

