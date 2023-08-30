import { ComponentBase } from '../../../../../../../core-lib/src/lib/components/ComponentBase/ComponentBase.component';
import { NgForm } from '@angular/forms';
import { MessageTypeEnum } from '../../../../../../../core-lib/src/lib/enums/message-type';
import { MessageSeverity } from '../../../../../../../core-lib/src/lib/enums/message-severity';
import { MojDataMigrationApplicationServicesProxy } from '../../../shared/services/services-proxies/service-proxies'
import { Component, OnInit, Injector, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-endowment-direct-registeration',
  templateUrl: './endowment-direct-registeration.component.html',
  styleUrls: ['./endowment-direct-registeration.component.css'],
})
export class EndowmentDirectRegisterationComponent
  extends ComponentBase
  implements OnInit {
  constructor(
    injector: Injector,
    private mojDataMigrationApplicationServices: MojDataMigrationApplicationServicesProxy,
    private route: Router
  ) {
    super(injector);
  }

  ngOnInit(): void { }

  deedNumber: number;
  @Output() deedNumberFound = new EventEmitter<boolean>();

  directRegisterClicked(form: NgForm) {
    this.mojDataMigrationApplicationServices
      .registerEndowmentByDeedNumberFromWeb(this.deedNumber, true)
      .subscribe(
        (result) => {
          debugger;
          this.message.showMessage(MessageTypeEnum.toast, {
            closable: true,
            enableService: true,
            summary: '',
            detail: this.l(
              'EndowmentModule.EndowmentRgistrationService.EndowmentRegisteredSuccessfully'
            ),
            severity: MessageSeverity.Success,
          });
          if (result.dto.serialNumber == undefined || result.dto.serialNumber == '') {
            this.route.navigate(['userdashboard/', 3]);
          }
          else {
            this.route.navigate(['/endowmentregistration/registrationform/', ...[result.dto.id, '1', result.dto.serialNumber]]);
          }

        },
        (error) => {
          this.deedNumberFound.emit(false);
        }
      );
  }
}
