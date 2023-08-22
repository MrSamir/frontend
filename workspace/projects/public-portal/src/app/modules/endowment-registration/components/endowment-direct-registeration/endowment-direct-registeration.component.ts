import { ComponentBase } from '../../../../../../../core-lib/src/lib/components/ComponentBase/ComponentBase.component';
import { NgForm } from '@angular/forms';
import { MessageTypeEnum } from '../../../../../../../core-lib/src/lib/enums/message-type';
import { MessageSeverity } from '../../../../../../../core-lib/src/lib/enums/message-severity';
import { MojDataMigrationApplicationServicesProxy } from '../../../shared/services/services-proxies/service-proxies'
import { Component, OnInit, Injector } from '@angular/core';

@Component({
  selector: 'app-endowment-direct-registeration',
  templateUrl: './endowment-direct-registeration.component.html',
  styleUrls: ['./endowment-direct-registeration.component.css']
})
export class EndowmentDirectRegisterationComponent extends ComponentBase implements OnInit {

  constructor(injector: Injector, private mojDataMigrationApplicationServices: MojDataMigrationApplicationServicesProxy) {
    super(injector);
  }

  ngOnInit(): void {
  }

  deedNumber: number;


  directRegisterClicked(form: NgForm) {

    this.mojDataMigrationApplicationServices.registerEndowmentByDeedNumberFromWeb(this.deedNumber, true).subscribe(result => {
      this.message.showMessage(MessageTypeEnum.toast, {
        closable: true,
        enableService: true,
        summary: '',
        detail: this.l('EndowmentModule.EndowmentRgistrationService.EndowmentRegisteredSuccessfully'),
        severity: MessageSeverity.Success,
      });
    },
      (error) => {
        this.message.showMessage(MessageTypeEnum.toast, {
          closable: true,
          enableService: true,
          summary: '',
          detail: error.message!,
          severity: MessageSeverity.Error,
        });
      });
  }
}
