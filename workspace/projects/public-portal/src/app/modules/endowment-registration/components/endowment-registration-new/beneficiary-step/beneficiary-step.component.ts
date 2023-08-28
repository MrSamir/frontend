import { Component, OnInit, Input, Output, EventEmitter, Injector } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ComponentBase } from "projects/core-lib/src/lib/components/ComponentBase/ComponentBase.component";
import { OutputBeneficiaryDto, RemoveBeneficiaryInputDto, AccountProxy, EndowmentRegistrationServiceProxy, AddBeneficiaryInputDto, RequestModelDto, RequestDto } from "../../../../shared/services/services-proxies/service-proxies";
import { wizardNavDto } from "../../../models/wizard-nav-data";
import { MessageTypeEnum } from "projects/core-lib/src/lib/enums/message-type";
import { MessageSeverity } from "projects/core-lib/src/lib/enums/message-severity";
import Swal from "sweetalert2";
import { AuthenticationService } from "projects/core-lib/src/lib/services/authentication-service.service";


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
  taskNumber: string;
  constructor(
    private modalService: NgbModal,
    _injecter: Injector,
    private router: Router,
    private accountServiceProxy: AccountProxy,
    private formBuilder: FormBuilder,
    private endowmentRegistrationServiceProxy: EndowmentRegistrationServiceProxy,
    private activatedRoute: ActivatedRoute,
    private authService: AuthenticationService
  ) {
    super(_injecter);
  }
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
    this.isEditRequested = false;
    this.requestId = this.activatedRoute.snapshot.params['requestId'];
    this.taskNumber = this.activatedRoute.snapshot.params['tasknumber'];
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
    this.submit();

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

  onSubmitBankForm() {
    var requestModelDto: RequestModelDto = new RequestModelDto()
    var request: RequestDto = new RequestDto();
    request.id = this.requestId;
    requestModelDto.requestDto = new RequestDto();
    requestModelDto.requestDto.init(request)
    this.endowmentRegistrationServiceProxy.submitRequest(requestModelDto).subscribe(res => {
      debugger;
      this.message.showMessage(MessageTypeEnum.toast, {
        closable: true,
        enableService: true,
        summary: '',
        detail: this.l('Common.DataSavedSuccessfully'),
        severity: MessageSeverity.Success,
      });
      this.authService.redirectToLandingPage();
      //this.router.navigate(['/success-message', res.dto.requestDto.requestNumber]);
      // this.router.navigate(['/success-message', response.data]);
      return;
    });
  }

  submit() {
    Swal.fire({
      title: this.l('EndowmentModule.EndowmentRgistrationService.Endorsement'),
      showCancelButton: true,
      confirmButtonText: 'نعم',
      cancelButtonText: 'لا',
      icon: 'question',
      width: 600,
      padding: '3em',
      confirmButtonColor: '#D6BD81',
    }).then((result) => {
      if (result.isConfirmed) {
        this.onSubmitBankForm();
        return;
      }
    });
  }

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

