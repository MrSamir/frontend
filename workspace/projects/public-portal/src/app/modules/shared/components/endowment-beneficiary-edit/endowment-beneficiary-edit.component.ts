import { Component, EventEmitter, Input, Output, OnInit, Injector, OnChanges, TemplateRef, ViewChild } from '@angular/core';
import { AccountProxy, AddBeneficiaryInputDto, AddBeneficiaryOutputDto, AlienInfoResponse, CitizenInfoResponse, CreateBeneficiaryDto, EndowmentRegistrationServiceProxy, InputApplicationUserDto, LookupApplicationServiceProxy, OutputApplicationUserDto, OutputBeneficiaryDto } from '../../services/services-proxies/service-proxies';
import { ArrayExtensions } from 'projects/core-lib/src/lib/helpers/array-extensions';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CitizenUtilities } from 'projects/shared-features-lib/src/lib/Models/CitizenInfo';
import { AlienUtilities } from 'projects/shared-features-lib/src/lib/Models/alienInfo';
import { BeneficiaryOutKsa, BeneficiaryUtilities } from 'projects/shared-features-lib/src/lib/Models/beneficiaryOutKsa';
import { CrudOperation } from 'projects/core-lib/src/lib/enums/CrudOperation';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ComponentBase } from 'projects/core-lib/src/lib/components/ComponentBase/ComponentBase.component';
import { MessageSeverity } from 'projects/core-lib/src/lib/enums/message-severity';
import { MessageTypeEnum } from 'projects/core-lib/src/lib/enums/message-type';

@Component({
  selector: 'app-endowment-shared-beneficiary-edit',
  templateUrl: './endowment-beneficiary-edit.component.html',
  styleUrls: ['./endowment-beneficiary-edit.component.css']
})
export class EndowmentBeneficiaryEditComponent extends ComponentBase implements OnInit, OnChanges {
  @ViewChild('addData') templateRef: TemplateRef<any>;
  ngOnChanges() {
    if (this.editBenificaryInfo) {
      this.activeCrudOperation = CrudOperation.Update;
      this.isEditRequested = true;
      
      this.yakeenPersonUtilities[this.editBenificaryInfo.beneficiaryPerson.idTypeId!](this.editBenificaryInfo.beneficiaryPerson);
      this.newPerson = new InputApplicationUserDto();
      this.newPerson.init(this.editBenificaryInfo.beneficiaryPerson);
      this.isCitizen = this.editBenificaryInfo.beneficiaryPerson.idTypeId == 1;

      this.modalService.open(this.templateRef, { size: 'lg' });
    }
    this.ngOnInit();
  }

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
    this.requestId = this.activatedRoute.snapshot.params['requestId'];
    this.OnAddingNewBeneficiary.emit('empty');
  }

  isCitizen: boolean = false;
  addBenificiaryInputDto: AddBeneficiaryInputDto;
  newPerson?: InputApplicationUserDto | undefined;
  newCitizen?: CitizenInfoResponse;
  newAlien?: AlienInfoResponse;
  citizenToView: CitizenInfoResponse;
  alienToView: AlienInfoResponse;
  beneficiaryOutKSAToView?: BeneficiaryOutKsa;
  @Output() OnAddingNewBeneficiary = new EventEmitter<string>();
  @Output() OnEditingExistingBeneficiary = new EventEmitter<AddBeneficiaryOutputDto>();
  @Output() OnDeletingExistingBeneficiary = new EventEmitter<{
    BeneficiaryToDelete: OutputBeneficiaryDto;
    index: number;
  }>();
  @Output() OnCancelClick = new EventEmitter();
  @Input() BeneficiaryList: OutputBeneficiaryDto[] = [];
  @Input() viewOnly: boolean = false;
  @Input() requestId: string;
  @Input() beneficiary: AddBeneficiaryInputDto;

  yakeenPersonUtilities = {
    1: (person: OutputApplicationUserDto) => {
      this.newCitizen = CitizenUtilities.fromPerson(person);
    },
    2: (person: OutputApplicationUserDto) => {
      this.newAlien = AlienUtilities.fromPerson(person);
    }
  };
  isBenificiaryInKsa: boolean;
  isEditRequested: boolean = false;
  @Input() editBenificaryInfo: AddBeneficiaryInputDto | undefined;
  isBeneficiaryInKsaEditView: boolean;
  activeCrudOperation: CrudOperation;
  isThereBeneficiaries: any;
  isValid: boolean;
  isValidNumber: boolean;
  beneficiaryToEditIndex: any;
  newBeneficiaryOutKsa: BeneficiaryOutKsa;
  isMobileNumberModified: boolean;



  openLg(content: any) {
    this.isEditRequested = false;
    //this.beneficiaryInfo.isBeneficiaryInKsa = true;
    this.beneficiaryOutKSAToView = undefined;
    this.isBeneficiaryInKsaEditView = true;
    this.isBenificiaryInKsa = true;
    this.activeCrudOperation = CrudOperation.Create;
    this.newAlien = undefined;
    this.newCitizen = undefined;
    this.modalService.open(content, { size: 'lg' });
  }

  onNewCitizenAvailable(event: {
    citizenInfo: CitizenInfoResponse;
    idType: number;
    userName: string;
    person: InputApplicationUserDto;
    isValid: boolean;
  }) {
    this.isValid = event.isValid;

    this.newCitizen = event.citizenInfo;
    this.newPerson = event.person;
    this.onNewPersonAvailable(event);
  }

  onNewAlienAvailable(event: {
    alienInfo: AlienInfoResponse;
    idType: number;
    userName: string;
    person: InputApplicationUserDto;
    isValid: boolean;
  }) {
    this.isValid = event.isValid;
    this.isValidNumber = true;
    this.newAlien = event.alienInfo;
    this.newPerson = event.person;
    this.onNewPersonAvailable(event);
  }

  onNewBeneficiaryAvailable(event: {
    beneficiary: BeneficiaryOutKsa;
    isValid: boolean;
  }) {
    this.isValid = event.isValid;
    this.newBeneficiaryOutKsa = event.beneficiary;
    this.addBenificiaryInputDto.beneficiaryPerson.idTypeId = 5;
    BeneficiaryUtilities.toPerson(
      this.newBeneficiaryOutKsa,
      this.addBenificiaryInputDto.beneficiaryPerson
    );

    var genderVal =
      this.addBenificiaryInputDto.beneficiaryPerson.gender.toString();
    this.addBenificiaryInputDto.beneficiaryPerson.gender =
      genderVal === 'Male' || genderVal === 'M' || genderVal == '0' ? 0 : 1;
    this.isValidNumber = event.isValid;
  }

  onNewPersonAvailable(event: {
    idType: number;
    userName: string;
    person: InputApplicationUserDto;
  }) {
    this.isValid = true;
    this.newPerson = event.person as InputApplicationUserDto;
    this.addBenificiaryInputDto = new AddBeneficiaryInputDto();
    this.addBenificiaryInputDto.applicationUserId = this.newPerson.id;
    this.addBenificiaryInputDto.createBeneficiaryDto = new CreateBeneficiaryDto();
    this.addBenificiaryInputDto.createBeneficiaryDto.isBeneficiaryInsideKsa = this.isBenificiaryInKsa;
    this.addBenificiaryInputDto.beneficiaryPerson = this.newPerson;
    this.addBenificiaryInputDto.requestId = this.requestId;
    this.addBenificiaryInputDto.createBeneficiaryDto.beneficiaryName = this.newPerson.fullName;
    this.addBenificiaryInputDto.beneficiaryPerson.nationalityId = this.newPerson.nationalityId;
    this.addBenificiaryInputDto.createBeneficiaryDto.beneficiaryId = this.newPerson.id;
    if (this.activeCrudOperation === CrudOperation.Update) {
      this.addBenificiaryInputDto.beneficiaryPerson.phoneNumber = this.newPerson.phoneNumber;
      this.addBenificiaryInputDto.beneficiaryPerson.email = this.newPerson.email;
    }



  }


  OnNewAlienNumberChanged(event: {
    alienInfoNumber: string;
    isValid: boolean;
  }): void {
    if (
      event.alienInfoNumber !==
      this.addBenificiaryInputDto.beneficiaryPerson.phoneNumber
    ) {
      this.isMobileNumberModified = true;
    }
    this.isValidNumber = true; //event.isValid;
    this.addBenificiaryInputDto.beneficiaryPerson.phoneNumber =
      event.alienInfoNumber;
  }

  OnNewCitizenNumberChanged(event: {
    citizenInfoNumber: string;
    isValid: boolean;
  }): void {
    if (
      event.citizenInfoNumber !==
      this.addBenificiaryInputDto.beneficiaryPerson.phoneNumber
    ) {
      this.isMobileNumberModified = true;
    }
    this.isValidNumber = true; // event.isValid;
    this.addBenificiaryInputDto.beneficiaryPerson.phoneNumber =
      event.citizenInfoNumber;
  }

  // Emit Add New beneficiary event to parent component
  addToBenefList() {

    this.endowmentRegistrationServiceProxy.addBeneficiary(this.addBenificiaryInputDto).subscribe(
      res => {
        if (res.isSuccess) {
          this.OnAddingNewBeneficiary.emit(this.addBenificiaryInputDto.beneficiaryPerson.userName);
          this.message.showMessage(MessageTypeEnum.toast,
            {
              severity: MessageSeverity.Success,
              message: '',
              closable: true,
              detail: this.l(
                'EndowmentModule.EndowmentRgistrationService.AddBeneficiarySuccess'
              ),
              summary: '',
              enableService: true,
            });
        }
        this.modalService.dismissAll();
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
        this.modalService.dismissAll();
      }
    )
    // this.OnAddingNewBeneficiary.emit(this.addBenificiaryInputDto);
  }

  // Emit Edit New beneficiary event to parent component

  onEditBtnClicked() {

    this.activeCrudOperation = CrudOperation.Update;
    this.endowmentRegistrationServiceProxy.updateBeneficiary(this.addBenificiaryInputDto).subscribe(
      res => {
        if (res.isSuccess) {
          this.OnAddingNewBeneficiary.emit(this.addBenificiaryInputDto.beneficiaryPerson.userName);
          this.message.showMessage(MessageTypeEnum.toast,
            {
              severity: MessageSeverity.Success,
              message: '',
              closable: true,
              detail: this.l(
                'EndowmentModule.EndowmentRgistrationService.AddBeneficiarySuccess'
              ),
              summary: '',
              enableService: true,
            });
        }
        this.modalService.dismissAll();
        
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
        this.modalService.dismissAll();
      }
    )

  }

  get hasBenifiaries() {
    return (
      // !!this.requestId &&
      // this.essentialInfoForBeneficiaryTab &&
      ArrayExtensions.notEmpty(
        this.BeneficiaryList
      )
    );
  }

  get isUpdateMode() {
    return this.activeCrudOperation === CrudOperation.Update;
  }

  get isCreateMode() {
    return this.activeCrudOperation === CrudOperation.Create;
  }
  get isYakeenPersonReady() {
    return !!this.newCitizen || !!this.newAlien;
  }

  get isPersonEmailFound() {
    return !!this.newPerson && !!this.newPerson.email;
  }

  get isPersonMobileFound() {
    return !!this.newPerson && !!this.newPerson.phoneNumber;
  }

  isInsideKsaChanged(event: any) {
    this.isBenificiaryInKsa = event.target.value == '1';
  }

  isThereNewBenifacyFoundChange(event: any) {
    //this.beneficiaryInfo.isThereBeneficiaries = event.target.value == '1';
    this.isThereBeneficiaries = event.target.value;
  }

}
