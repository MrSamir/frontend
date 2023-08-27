import { Component, OnInit, Input, Output, EventEmitter, Injector } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ComponentBase } from "projects/core-lib/src/lib/components/ComponentBase/ComponentBase.component";
import { OutputBeneficiaryDto, RemoveBeneficiaryInputDto, AccountProxy, EndowmentRegistrationServiceProxy, AddBeneficiaryInputDto } from "../../../../shared/services/services-proxies/service-proxies";
import { wizardNavDto } from "../../../models/wizard-nav-data";
import { MessageTypeEnum } from "projects/core-lib/src/lib/enums/message-type";
import { MessageSeverity } from "projects/core-lib/src/lib/enums/message-severity";


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
    debugger;
    // if (!this.updated || String(this.updated) == "empty") {
    //   this.message.showMessage(MessageTypeEnum.toast, {
    //     closable: true,
    //     enableService: true,
    //     summary: '',
    //     detail: this.l('EndowmentModule.EndowmentRgistrationService.atLeastOneBenificiary'),
    //     severity: MessageSeverity.Error,
    //   });
    //   return;
    // }
    // this.wizardNavDto.isNaviagateToNext = true;
    // this.wizardNavDto.requestId = this.requestId;
    // this.wizardNavDto.step = '4';
    // this.wizardNavDto.endowmentId = this.waqfId;
    // this.onBtnNextClicked.emit(this.wizardNavDto);
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
    this.editBeneficiary = event;
    this.isEditRequested = true;

  }

  // onSubmitBankForm() {
  //   const req = new WaqfNewRegistrationRequestSubmitDto(); // || (!this.isRequired)

  //   if ((this.bankForm.valid && this.isRequired) || !this.isRequired) {
  //     req.accountName = this.bankForm.value.accountName;
  //     req.bankId = this.bankForm.value.bankName;
  //     req.iban = this.bankForm.value.iban;
  //     req.beneficiaryCategoryId = this.bankForm.value.beneficiaryCategory;
  //     req.beneficiaryName = this.bankForm.value.beneficiaryName;
  //   }

  //   req.id = this.requestId;
  //   req.waqfId = this.essentialInfoForBeneficiaryTab.waqfId;

  //   if (
  //     this.essentialInfoForBeneficiaryTab.status === 'MissingInfo' ||
  //     this.essentialInfoForBeneficiaryTab.status ===
  //     'PendingIBANAndBeneficiaryCompletionFromApplicant'
  //   ) {
  //     this.assignTaskInfoModel.actionName = 'Complete';
  //     this.assignTaskInfoModel.actionDisplayName =
  //       'تم تزويد المعلومات من المتقدم';
  //     this.assignTaskInfoModel.uiOnly = true;
  //     this.assignTaskInfoModel.requestStatus = this.taskStatus;
  //     this.assignTaskInfoModel.requestNumber = this.requestNumber;
  //     this.assignTaskInfoModel.serialNumber = this.taskNumber;
  //     this.assignTaskInfoModel.impersonateUserName = this.userName;
  //     this.assignTaskInfoModel.displayName = this.displayName;
  //     this.assignTaskInfoModel.requestId = this.requestId;
  //     req.actionInput = new ActionInput();
  //     req.actionInput = this.assignTaskInfoModel;
  //   }

  //   if (this.essentialInfoForBeneficiaryTab.waqfTypeId == 2) {
  //     this.bankForm.get('beneficiaryName').clearValidators();
  //     this.bankForm.get('beneficiaryName').updateValueAndValidity();
  //     this.bankForm.get('beneficiaryCategory').clearValidators();
  //     this.bankForm.get('beneficiaryCategory').updateValueAndValidity();
  //   }

  //   if ((this.isRequired && this.bankForm.valid) || !this.isRequired) {
  //     this.registerWaqfService.submitRequest(req).subscribe(
  //       (response: ServiceResponse<RequestModel>) => {
  //         // response.data
  //         if (
  //           this.essentialInfoForBeneficiaryTab.status === 'MissingInfo' ||
  //           this.essentialInfoForBeneficiaryTab.status ===
  //           'PendingIBANAndBeneficiaryCompletionFromApplicant'
  //         ) {
  //           this.router.navigate([
  //             '/success-message-return',
  //             this.requestNumber,
  //           ]);
  //         } else {
  //           this.router.navigate(['/success-message', response.data]);
  //         }
  //       },
  //       (err: ApiException) => {
  //         handleServiceProxyError(err);
  //         this.isFinalApproval = false;
  //       }
  //     );
  //     this.isFinalApproval = false;
  //   }
  // }

  // submit() {
  //   confirm(
  //     translations.endorsement,
  //     () => {
  //       (this.isFinalApproval = true), this.onSubmitBankForm();
  //     },
  //     () => (this.isFinalApproval = false),
  //     'question',
  //     translations.ok,
  //     translations.cancel
  //   );
  // }

  // UpdateRequestInfo() {
  //   this.userType = this.authenticationServiceV2.currentLoggedInUser.UserType;
  //   this.userName = this.authenticationServiceV2.currentLoggedInUser.username; // Reviewer1 Officer1 Auditor1 AQF:2256756789
  //   this.displayName =
  //     this.authenticationServiceV2.currentLoggedInUser.displayname;
  //   this.taskStatus = this.essentialInfoForBeneficiaryTab.status;
  //   Swal.fire({
  //     title: 'هل انت متأكد من اتخاذ القرار؟',
  //     showCancelButton: true,
  //     confirmButtonText: 'نعم',
  //     cancelButtonText: 'لا',
  //     icon: 'question',
  //     width: 600,
  //     padding: '3em',
  //     confirmButtonColor: '#D6BD81',
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       this.onSubmitBankForm();
  //       return;
  //     }
  //   });
  // }
}

