import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api'

@Injectable({
  providedIn: 'root'
})
export class AppMessageService {

  constructor(private messageService:MessageService) 
  { }

  showMessage(key:string, message: string, severity: string = 'success', summary: string = '', detail: string = ''):void
  {
    this.messageService.add({key:key, severity: severity, summary: summary, detail: message});
  }
}
