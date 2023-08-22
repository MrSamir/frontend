import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AddBeneficiaryInputDto, ApiException, EndowmentRegistrationServiceProxy, OutputBeneficiaryDto, RemoveBeneficiaryInputDto } from '../../../../shared/services/services-proxies/service-proxies';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { wizardNavDto } from '../../../models/wizard-nav-data';

@Component({
  selector: 'app-beneficiary-step',
  templateUrl: './beneficiary-step.component.html',
  styleUrls: ['./beneficiary-step.component.css']
})
export class BeneficiaryStepComponent implements OnInit {

  @Input() public requestId: string;
  @Input() waqfId: string;
  @Output() onBtnNextClicked = new EventEmitter<wizardNavDto>();
  @Output() onBtnPreviousClicked = new EventEmitter<wizardNavDto>();
  BeneficiaryList: OutputBeneficiaryDto[] = [];
  OneRequestSeer: RemoveBeneficiaryInputDto;
  wizardNavDto: wizardNavDto = new wizardNavDto();
  constructor(private registerWaqfService: EndowmentRegistrationServiceProxy, private modalService: NgbModal) { }


  ngOnInit(): void {
    //throw new Error('Method not implemented.');
  }

  OnAddingNewBeneficiary(newAwqafBeneficiary: AddBeneficiaryInputDto) {
    this.registerWaqfService.addBeneficiary(
      newAwqafBeneficiary
    ).subscribe(
      (data) => {
        if (data) {
          let resSeerData = data;
          if (resSeerData.isSuccess) {
            //showSuccess('تم إنشاء الاصل بنجاح', () => {
            // console.log('res here: ', resSeerData);
            // this.newSeer.id = resSeerData.data.toString();
            // let obj = {Seer: resSeerData.data}
            //this.modalService.dismissAll();
            //this.getAllBeneficiaries();
            //});
          }
        }
      },
      (err: ApiException) => {
        handleServiceProxyError(err);
      }
    );
  }

  OnEditingExistingBeneficiary(updtedAwqafSeer: AddBeneficiaryInputDto) {

  }

  OnDeletingExistingBeneficiary(event: { BeneficiaryToDelete: OutputBeneficiaryDto; index: number }) {

  }

  getAllBeneficiaries() {
    this.registerWaqfService.getBeneficiartiesInformationByReqId(this.requestId).subscribe(
      (res: OutputBeneficiaryDto[]) =>
        (this.BeneficiaryList = res),
      (err: ApiException) => handleServiceProxyError(err)
    );
  }

  onNextBtnClicked() {
    // if (!this.BeneficiaryList || this.BeneficiaryList.length == 0) {
    //   this.message.showMessage(MessageTypeEnum.toast, {
    //     closable: true,
    //     enableService: true,
    //     summary: '',
    //     detail: this.l('EndowmentModule.EndowmentRgistrationService.atLeastOneAsset'),
    //     severity: MessageSeverity.Error,
    //   });
    //   return;
    // }
    this.wizardNavDto.isNaviagateToNext = true;
    this.wizardNavDto.requestId = this.requestId;
    this.wizardNavDto.phaseId = '4';
    this.wizardNavDto.endowmentId = this.waqfId;
    this.onBtnNextClicked.emit(this.wizardNavDto);
  }

  onBackBtnClicked() {
    debugger;
    this.wizardNavDto.requestId = this.requestId;
    this.wizardNavDto.phaseId = '5';
    this.wizardNavDto.endowmentId = this.waqfId;
    this.onBtnPreviousClicked.emit(this.wizardNavDto);
    // this.wizard.goToPreviousStep();
  }
}
function handleServiceProxyError(err: ApiException): void {
  throw new Error('Function not implemented.');
}

