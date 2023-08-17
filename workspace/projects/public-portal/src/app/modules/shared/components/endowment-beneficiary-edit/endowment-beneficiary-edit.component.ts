import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AddBeneficiaryInputDto, AlienInfoResponse, CitizenInfoResponse, CreateBeneficiaryDto, InputApplicationUserDto, LookupApplicationServiceProxy, OutputApplicationUserDto, OutputBeneficiaryDto } from '../../services/services-proxies/service-proxies';
import { ArrayExtensions } from 'projects/core-lib/src/lib/helpers/array-extensions';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CitizenUtilities } from 'projects/shared-features-lib/src/lib/Models/CitizenInfo';
import { AlienUtilities } from 'projects/shared-features-lib/src/lib/Models/alienInfo';
import { BeneficiaryOutKsa, BeneficiaryUtilities } from 'projects/shared-features-lib/src/lib/Models/beneficiaryOutKsa';
import { CrudOperation } from 'projects/core-lib/src/lib/enums/CrudOperation';

@Component({
  selector: 'app-endowment-shared-beneficiary-edit',
  templateUrl: './endowment-beneficiary-edit.component.html',
  styleUrls: ['./endowment-beneficiary-edit.component.css']
})
export class EndowmentBeneficiaryEditComponent {


  addBenificiaryInputDto:AddBeneficiaryInputDto;
  newPerson?: InputApplicationUserDto;
  newCitizen?: CitizenInfoResponse;
  newAlien?: AlienInfoResponse;
  citizenToView: CitizenInfoResponse ;
  alienToView: AlienInfoResponse ;
  beneficiaryOutKSAToView?: BeneficiaryOutKsa;
  @Output() OnAddingNewBeneficiary = new EventEmitter<AddBeneficiaryInputDto>();
  @Output() OnEditingExistingBeneficiary = new EventEmitter<AddBeneficiaryInputDto>();
  @Output() OnDeletingExistingBeneficiary = new EventEmitter<{
    BeneficiaryToDelete: OutputBeneficiaryDto;
    index: number;
  }>();
  @Output() OnCancelClick = new EventEmitter();
  @Input() BeneficiaryList: OutputBeneficiaryDto[] = [];
  @Input() viewOnly: boolean = false;

  yakeenPersonUtilities = {
    1: (person: OutputApplicationUserDto) => {
      this.citizenToView = CitizenUtilities.fromPerson(person);
      this.newCitizen = CitizenUtilities.fromPerson(person);
    },
    2: (person: OutputApplicationUserDto) => {
      this.alienToView = AlienUtilities.fromPerson(person);
      this.newAlien = AlienUtilities.fromPerson(person);
    },
    5: (person: OutputApplicationUserDto) => {
      this.beneficiaryOutKSAToView = BeneficiaryUtilities.fromPerson(person);
    },
  };
  isBenificiaryInKsa: boolean;
  isEditRequested: boolean;
  isBeneficiaryInKsaEditView: boolean;
  activeCrudOperation: CrudOperation;
  isThereBeneficiaries: any;
  isValid: boolean;
  isValidNumber: boolean;
  beneficiaryToEditIndex: any;
  newBeneficiaryOutKsa: BeneficiaryOutKsa;
  isMobileNumberModified: boolean;

  constructor(private modalService: NgbModal,private lookupssrv:LookupApplicationServiceProxy){}


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
  }) {

    this.newCitizen = event.citizenInfo;
    this.newPerson = event.person;
    //this.addBenificiaryInputDto = new AddBeneficiaryInputDto();
    this.onNewPersonAvailable(event);
    //CitizenUtilities.citizenToPerson(this.newCitizen, this.addBenificiaryInputDto.createBeneficiaryPersonInputDto);
  }

  onNewAlienAvailable(event: {
    alienInfo: AlienInfoResponse;
    idType: number;
    userName: string;
    person: InputApplicationUserDto;
  }) {
    this.isValid = true;
    this.isValidNumber = true;
    this.newAlien = event.alienInfo;
    this.newPerson = event.person;
    //this.addBenificiaryInputDto = new AddBeneficiaryInputDto();
    this.onNewPersonAvailable(event);
    //AlienUtilities.alientToPerson(this.newAlien, this.addBenificiaryInputDto.createBeneficiaryPersonInputDto);
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
    this.newPerson = event.person;
    // this.addBenificiaryInputDto.applicationUserId.init(
    //   this.newPerson
    // );

    this.addBenificiaryInputDto.applicationUserId=this.newPerson.id;
    this.addBenificiaryInputDto.createBeneficiaryDto=new CreateBeneficiaryDto();
    // this.addBenificiaryInputDto.createBeneficiaryPersonInputDto.idTypeId = event.idType;
    // this.addBenificiaryInputDto.createBeneficiaryPersonInputDto.idNumber = event.idNumber;
    //this.addBenificiaryInputDto.requestId = this.requestId;   // appended on the parent component
    this.addBenificiaryInputDto.createBeneficiaryDto.isBeneficiaryInsideKsa = this.isBenificiaryInKsa;
    if (this.activeCrudOperation === CrudOperation.Update) {
      this.BeneficiaryList[this.beneficiaryToEditIndex].beneficiaryPerson.phoneNumber = this.newPerson.phoneNumber;
      this.BeneficiaryList[this.beneficiaryToEditIndex].beneficiaryPerson.email = this.newPerson.email;
    }

    // var genderVal =
    // this.addBenificiaryInputDto.createBeneficiaryDto.gender.toString();
    // this.addBenificiaryInputDto.createBeneficiaryPersonInputDto.gender =
    //   genderVal === 'Male' || genderVal === 'M' || genderVal === '0' ? 0 : 1;

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
  addToBenefList()
  {
    this.OnAddingNewBeneficiary.emit(this.addBenificiaryInputDto);
  }

  // Emit Edit New beneficiary event to parent component

  onEditBtnClicked() {

    this.activeCrudOperation = CrudOperation.Update;
    this.OnEditingExistingBeneficiary.emit(this.addBenificiaryInputDto);

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
