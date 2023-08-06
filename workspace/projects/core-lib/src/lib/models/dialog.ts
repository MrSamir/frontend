import {ConfirmationService, ConfirmEventType, MessageService} from 'primeng/api';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { Observable, Subject } from 'rxjs';

export class DialogModel {
  dialogType: DailogType|undefined;
  message: string = '';
  header: string = '';
  OkLabel:string='';
  CancelLabel:string='';
  OnOK:Function|undefined;
  OnCancel:Function|undefined;
}
export enum DailogType
{
    OkCancel=1,
    Ok=2,
    Cancel=3
}

