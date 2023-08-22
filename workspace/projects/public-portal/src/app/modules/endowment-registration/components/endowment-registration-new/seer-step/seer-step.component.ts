import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { AddSeerInputDto, AddSeerOutputDto, ApiException, ApiResponse, EndowmentRegistrationServiceProxy, OutputSeerDto, RemoveSeerInputDto } from '../../../../shared/services/services-proxies/service-proxies';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { ComponentBase } from 'projects/core-lib/src/lib/components/ComponentBase/ComponentBase.component';
import { MessageTypeEnum } from 'projects/core-lib/src/lib/enums/message-type';
import { MessageSeverity } from 'projects/core-lib/src/lib/enums/message-severity';
import { WizardComponent } from "angular-archwizard";
import { wizardNavDto } from '../../../models/wizard-nav-data';

@Component({
  selector: 'app-seer-step',
  templateUrl: './seer-step.component.html',
  styleUrls: ['./seer-step.component.css']
})
export class SeerStepComponent extends ComponentBase implements OnInit {

  @Input() public requestId: string;
  @Input() waqfId: string;
  @Input() public wizard: WizardComponent;

  @Output() onBtnNextClicked = new EventEmitter<wizardNavDto>();
  @Output() onBtnPreviousClicked = new EventEmitter<wizardNavDto>();

  seers: OutputSeerDto[] = [];
  wizardNavDto: wizardNavDto = new wizardNavDto();
  OneRequestSeer: RemoveSeerInputDto;
  constructor(private registerWaqfService: EndowmentRegistrationServiceProxy, private modalService: NgbModal, injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.getAllSeers();
    //throw new Error('Method not implemented.');
  }

  // Passed new Seer from Common Seers Component in order to add it through calling API from Parent component
  OnAddingNewSeer(newAwqafSeer: AddSeerInputDto) {
    //this.seers?.push(newAwqafSeer);
    //this.setIsAttachmentChanged(newAwqafSeer);
    newAwqafSeer.requestId = this.requestId;
    this.registerWaqfService.addSeer(
      newAwqafSeer
    ).subscribe(
      (data) => {
        if (data) {
          let resSeerData = data;
          if (resSeerData.isSuccess) {
            this.message.showMessage(MessageTypeEnum.toast, {
              severity: MessageSeverity.Success,
              message: '',
              closable: true,
              detail: this.l(
                'EndowmentModule.EndowmentRgistrationService.operationSuccess'
              ),
              summary: '',
              enableService: true,
            });
            this.modalService.dismissAll()
            this.getAllSeers();
            // });
          }
          else {
            this.message.showMessage(MessageTypeEnum.toast, {
              severity: MessageSeverity.Error,
              message: '',
              closable: true,
              detail: resSeerData.message!,
              summary: '',
              enableService: true,
            });
          }
        }
      },
      (error) => {
        this.message.showMessage(MessageTypeEnum.toast, {
          severity: MessageSeverity.Error,
          message: '',
          closable: true,
          detail: this.l(
            'Common.CommonError'
          ),
          summary: '',
          enableService: true,
        });
      }
    );
  }

  // Passed Seer from Common Seers Component in order to delete it through calling API from Parent component
  OnDeletingExistingSeer(SeerToDelete: OutputSeerDto) {
    this.onDeleteTableCellClicked(SeerToDelete);
  }

  OnEditingExistingSeer(CurrentSeer: AddSeerInputDto) {
    CurrentSeer.requestId = this.requestId; //set request ID
    //this.setIsAttachmentChanged();
    this.registerWaqfService.editSeer(
      CurrentSeer
    ).subscribe(
      (data) => {
        let resSeerData = data as ApiResponse;
        if (resSeerData.isSuccess) {
          this.message.showMessage(MessageTypeEnum.toast, {
            severity: MessageSeverity.Success,
            message: '',
            closable: true,
            detail: this.l(
              'EndowmentModule.EndowmentRgistrationService.operationSuccess'
            ),
            summary: '',
            enableService: true,
          });
          this.modalService.dismissAll()
          this.getAllSeers();
          // });
        }
        else {
          this.message.showMessage(MessageTypeEnum.toast, {
            severity: MessageSeverity.Error,
            message: '',
            closable: true,
            detail: resSeerData.message!,
            summary: '',
            enableService: true,
          });
        }
      },
      (error) => {
        this.message.showMessage(MessageTypeEnum.toast, {
          severity: MessageSeverity.Error,
          message: '',
          closable: true,
          detail: this.l(
            'Common.CommonError'
          ),
          summary: '',
          enableService: true,
        });
      }
    );

    this.modalService.dismissAll();
  }

  onDeleteTableCellClicked(seerToDelete: OutputSeerDto) {
    Swal.fire({
      title: 'تأكيد حذف ناظر؟',
      icon: 'question',
      confirmButtonText: 'متابعة',
      width: 600,
      padding: '3em',
      confirmButtonColor: '#D6BD81',
    }).then((result) => {
      if (result.isConfirmed) {
        this.OneRequestSeer = new RemoveSeerInputDto();
        this.OneRequestSeer.seerId = seerToDelete.seerId!;
        this.OneRequestSeer.requestId = this.requestId;

        this.registerWaqfService.removeSeer(
          this.OneRequestSeer
        ).subscribe((result) => {
          if (result.isSuccess) {
            this.message.showMessage(MessageTypeEnum.toast, {
              severity: MessageSeverity.Success,
              message: '',
              closable: true,
              detail: this.l(
                'EndowmentModule.EndowmentRgistrationService.operationSuccess'
              ),
              summary: '',
              enableService: true,
            });
            this.getAllSeers();
          }
          else {
            this.message.showMessage(MessageTypeEnum.toast, {
              severity: MessageSeverity.Error,
              message: '',
              closable: true,
              detail: result.message!,
              summary: '',
              enableService: true,
            });
          }
        },
          (error) => {
            this.message.showMessage(MessageTypeEnum.toast, {
              severity: MessageSeverity.Error,
              message: '',
              closable: true,
              detail: this.l(
                'Common.CommonError'
              ),
              summary: '',
              enableService: true,
            });
          });
      }
    });
  }

  getAllSeers() {
    this.registerWaqfService.getSeersInformationByReqId(this.requestId).subscribe(
      (res: OutputSeerDto[]) => {
        this.seers = res;
      },
      (error) => {
        this.message.showMessage(MessageTypeEnum.toast, {
          severity: MessageSeverity.Error,
          message: '',
          closable: true,
          detail: this.l(
            'Common.CommonError'
          ),
          summary: '',
          enableService: true,
        });
      }
    );
  }
  onNextBtnClicked() {
    if (!this.seers || this.seers.length == 0) {
      this.message.showMessage(MessageTypeEnum.toast, {
        severity: MessageSeverity.Error,
        message: '',
        closable: true,
        detail: this.l(
          'EndowmentModule.EndowmentRgistrationService.atLeastOneSeer'
        ),
        summary: '',
        enableService: true,
      });
      //showError(translations.atLeastOneOwner);
      return;
    }
    this.wizardNavDto.isNaviagateToNext = true;
    this.wizardNavDto.requestId = this.requestId;
    this.wizardNavDto.phaseId = '6';
    this.wizardNavDto.endowmentId = this.waqfId;
    this.onBtnNextClicked.emit(this.wizardNavDto);
  }

  onBackBtnClicked() {
    debugger;
    this.wizardNavDto.requestId = this.requestId;
    this.wizardNavDto.phaseId = '4';
    this.wizardNavDto.endowmentId = this.waqfId;
    this.onBtnPreviousClicked.emit(this.wizardNavDto);
    // this.wizard.goToPreviousStep();
  }
}

