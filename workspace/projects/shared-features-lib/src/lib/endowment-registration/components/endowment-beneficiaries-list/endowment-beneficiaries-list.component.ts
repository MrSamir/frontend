import { Component, EventEmitter, Injector, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ComponentBase } from 'projects/core-lib/src/lib/components/ComponentBase/ComponentBase.component';
import { PrimengTableHelper } from 'projects/core-lib/src/lib/helpers/PrimengTableHelper';
import { AccountProxy, AddBeneficiaryInputDto, AlienInfoResponse, ApiException, ApiResponseOfPagedResultDtoOfOutputBeneficiaryDto, CitizenInfoResponse, EndowmentRegistrationServiceProxy, InputApplicationUserDto, OutputApplicationUserDto, OutputBeneficiaryDto, PagedResultDtoOfOutputBeneficiaryDto, RemoveBeneficiaryInputDto, RequestApplicationServiceProxy } from 'projects/public-portal/src/app/modules/shared/services/services-proxies/service-proxies';
import { CitizenUtilities } from '../../../Models/CitizenInfo';
import { AlienUtilities } from '../../../Models/alienInfo';
import { BeneficiaryUtilities } from '../../../Models/beneficiaryOutKsa';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CrudOperation } from 'projects/core-lib/src/lib/enums/CrudOperation';
import Swal from 'sweetalert2';
import { AppMessageService } from 'projects/core-lib/src/lib/services/message/app-message.service';
import { MessageSeverity } from 'projects/core-lib/src/lib/enums/message-severity';
import { MessageTypeEnum } from 'projects/core-lib/src/lib/enums/message-type';

@Component({
  selector: 'app-endowment-beneficiaries-list',
  templateUrl: './endowment-beneficiaries-list.component.html',
  styleUrls: ['./endowment-beneficiaries-list.component.css']
})
export class EndowmentBeneficiariesListComponent extends ComponentBase implements OnInit, OnChanges {
  primengTableHelper: PrimengTableHelper;
  citizenToView: CitizenInfoResponse | undefined;
  alienToView: AlienInfoResponse | undefined;
  addBenificiaryInputDto: AddBeneficiaryInputDto;
  isCitizen: boolean = false;
  isBeneficiaryInKsaEditView: boolean = true;
  @Input() updated: boolean = false;
  @Output() onEditBeneficiayData = new EventEmitter<AddBeneficiaryInputDto>();
  
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
  @Input() requestId: string | null;
  @Input() viewOnly: boolean = true;

  ngOnChanges() {
    
    this.ngOnInit();
  }

  ngOnInit() {
    this.primengTableHelper = new PrimengTableHelper();
    this.loadBeneficiaries();
  }
  onBackBtnClicked() {
    // this.wizard.goToPreviousStep();
  }

  loadBeneficiaries() {
    this.primengTableHelper.showLoadingIndicator();
    this.endowmentRegistrationServiceProxy.getBeneficiariesInformationByReqId(this.requestId as string).subscribe(
      (res: ApiResponseOfPagedResultDtoOfOutputBeneficiaryDto) => {
        this.primengTableHelper.records = res.dto.items as OutputBeneficiaryDto[];
        this.primengTableHelper.totalRecordsCount = res.dto.totalCount;
      }
    )

    this.primengTableHelper.hideLoadingIndicator();
  }


  yakeenPersonUtilities = {
    1: (person: OutputApplicationUserDto) => {
      this.citizenToView = CitizenUtilities.fromPerson(person);
      // this.newCitizen = CitizenUtilities.fromPerson(person);
    },
    2: (person: OutputApplicationUserDto) => {
      this.alienToView = AlienUtilities.fromPerson(person);
      // this.newAlien = AlienUtilities.fromPerson(person);
    }
  };


  beneficiaryToEdit: any;
  newPerson: InputApplicationUserDto | undefined;

  viewBeneficiary(content: any, index: number) {
    this.beneficiaryToEdit = this.primengTableHelper.records[index];
    // set isBeneficiaryInsideKsa property explicity
    if (this.beneficiaryToEdit.beneficiaryPerson.idTypeId === null) {
      this.beneficiaryToEdit.beneficiaryPerson.idTypeId = 1;
    }
    this.yakeenPersonUtilities[this.beneficiaryToEdit.beneficiaryPerson.idTypeId](
      this.beneficiaryToEdit.beneficiaryPerson
    );

    this.isCitizen = this.beneficiaryToEdit.beneficiaryPerson.idTypeId === 1;

    this.modalService.open(content, { size: 'lg' });
  }


  activeCrudOperation: CrudOperation = CrudOperation.Create;
  get isUpdateMode() {
    return this.activeCrudOperation === CrudOperation.Update;
  }

  get isCreateMode() {
    return this.activeCrudOperation === CrudOperation.Create;
  }

  editBeneficiary(index: number) {
    const beneficiary =
      this.primengTableHelper.records[index];

    this.onEditBeneficiayData.emit(beneficiary);
  }

  deleteBeneficiary(index: number) {
    Swal.fire({
      title: this.l(
        'EndowmentModule.EndowmentRgistrationService.EnsureDeleteBeneficiary'
      ),
      icon: 'question',
      confirmButtonText: 'متابعة',
      width: 600,
      padding: '3em',
      confirmButtonColor: '#D6BD81',
    }).then((result) => {
      if (result.isConfirmed) {
        this.activeCrudOperation = CrudOperation.Delete;
        const beneficiary =
          this.primengTableHelper.records[index];
        const removeBenifiacyInputDto = new RemoveBeneficiaryInputDto();
        removeBenifiacyInputDto.beneficiaryId = beneficiary.beneficiaryId;
        removeBenifiacyInputDto.requestId = this.requestId as string;
        this.endowmentRegistrationServiceProxy
          .removeBeneficiary(removeBenifiacyInputDto)
          .subscribe(
            (result) => {
              this.primengTableHelper.records.splice(index, 1);
              this.primengTableHelper.totalRecordsCount = this.primengTableHelper.totalRecordsCount - 1;
              if (result.isSuccess) {
                this.message.showMessage(MessageTypeEnum.toast,
                  {
                    severity: MessageSeverity.Success,
                    message: '',
                    closable: true,
                    detail: this.l(
                      'EndowmentModule.EndowmentRgistrationService.RemoveBeneficiarySuccess'
                    ),
                    summary: '',
                    enableService: true,
                  });
              }
              else {
                this.message.showMessage(MessageTypeEnum.toast,
                  {
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
            }
          );
      }
    });
  }


}





