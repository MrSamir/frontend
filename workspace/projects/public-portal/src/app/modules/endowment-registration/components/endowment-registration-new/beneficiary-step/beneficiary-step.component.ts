import { Component, OnInit, Input, Output, EventEmitter, Injector } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ComponentBase } from "projects/core-lib/src/lib/components/ComponentBase/ComponentBase.component";
import { OutputBeneficiaryDto, RemoveBeneficiaryInputDto, AccountProxy, EndowmentRegistrationServiceProxy, AddBeneficiaryInputDto } from "../../../../shared/services/services-proxies/service-proxies";
import { wizardNavDto } from "../../../models/wizard-nav-data";


@Component({
  selector: 'app-beneficiary-step',
  templateUrl: './beneficiary-step.component.html',
  styleUrls: ['./beneficiary-step.component.css']
})
export class BeneficiaryStepComponent extends ComponentBase implements OnInit {
  updated: boolean = false;
  @Input() public requestId: string;
  @Input() waqfId: string;
  @Output() onBtnNextClicked = new EventEmitter<wizardNavDto>();
  @Output() onBtnPreviousClicked = new EventEmitter<wizardNavDto>();
  BeneficiaryList: OutputBeneficiaryDto[] = [];
  OneRequestSeer: RemoveBeneficiaryInputDto;
  constructor(
    private modalService: NgbModal,
    _injecter: Injector,
    private router: Router,
    private accountServiceProxy: AccountProxy,
    private formBuilder: FormBuilder,
    private endowmentRegistrationServiceProxy: EndowmentRegistrationServiceProxy,
    private activatedRoute: ActivatedRoute
  ) {
    super(_injecter);
  }
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
    this.isEditRequested = false;
    this.updated = false;
    this.requestId = this.activatedRoute.snapshot.queryParamMap.get('requestId') as string;
  }


  wizardNavDto: wizardNavDto = new wizardNavDto();

  OnEditingExistingBeneficiary(updtedAwqafSeer: AddBeneficiaryInputDto) {

  }

  OnAddingNewBeneficiary(event: any) {
    this.updated = event;
  }



  OnEditingExistingSeer(event: any) {

  }

  OnDeletingExistingAsset(event: any) { }

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
    this.wizardNavDto.step = '4';
    this.wizardNavDto.endowmentId = this.waqfId;
    this.onBtnNextClicked.emit(this.wizardNavDto);
  }

  onBackBtnClicked() {
    this.wizardNavDto.requestId = this.requestId;
    this.wizardNavDto.step = '5';
    this.wizardNavDto.endowmentId = this.waqfId;
    this.onBtnPreviousClicked.emit(this.wizardNavDto);
    // this.wizard.goToPreviousStep();
  }
  isEditRequested: boolean = false;
  editBeneficiary: AddBeneficiaryInputDto;
  onEditBeneficiayData(event: AddBeneficiaryInputDto) {
    debugger
    this.editBeneficiary = event;
    this.isEditRequested = true;

  }


}

