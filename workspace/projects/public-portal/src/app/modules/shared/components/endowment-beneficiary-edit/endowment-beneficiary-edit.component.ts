// import { Component, EventEmitter, Input, Output } from '@angular/core';
// import { AddBeneficiaryInputDto, AlienInfoResponse, CitizenInfoResponse, LookupApplicationServiceServiceProxy, OutputApplicationUserDto, OutputBeneficiaryDto } from '../../services/services-proxies/service-proxies';
// import { ArrayExtensions } from 'projects/core-lib/src/lib/helpers/array-extensions';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

// @Component({
//   selector: 'app-endowment-shared-beneficiary-edit',
//   templateUrl: './endowment-beneficiary-edit.component.html',
//   styleUrls: ['./endowment-beneficiary-edit.component.css']
// })
// export class EndowmentBeneficiaryEditComponent {


  
//   citizenToView: CitizenInfoResponse ;
//   alienToView: AlienInfoResponse ;
//   beneficiaryOutKSAToView: BeneficiaryOutKsa = undefined;
//   @Output() OnAddingNewBeneficiary = new EventEmitter<AddBeneficiaryInputDto>();
//   @Output() OnEditingExistingBeneficiary = new EventEmitter<AddBeneficiaryInputDto>();
//   @Output() OnDeletingExistingBeneficiary = new EventEmitter<{
//     BeneficiaryToDelete: OutputBeneficiaryDto;
//     index: number;
//   }>();
//   @Output() OnCancelClick = new EventEmitter();
//   @Input() BeneficiaryList: OutputBeneficiaryDto[] = [];
//   @Input() viewOnly: boolean = false;

//   yakeenPersonUtilities = {
//     1: (person: OutputApplicationUserDto) => {
//       this.citizenToView = CitizenUtilities.fromPerson(person);
//       this.newCitizen = CitizenUtilities.fromPerson(person);
//     },
//     2: (person: OutputApplicationUserDto) => {
//       this.alienToView = AlienUtilities.fromPerson(person);
//       this.newAlien = AlienUtilities.fromPerson(person);
//     },
//     5: (person: OutputApplicationUserDto) => {
//       this.beneficiaryOutKSAToView = BeneficiaryUtilities.fromPerson(person);
//     },
//   };

//   constructor(private modalService: NgbModal,private lookupssrv:LookupApplicationServiceServiceProxy){}


//   onNewCitizenAvailable(event: {
//     citizenInfo: CitizenInfoResponse;
//     idType: number;
//     idNumber: string;
//     person: OutputApplicationUserDto;
//   }) {
//     this.isValid = true;
//     this.isValidNumber = true;
//     this.newCitizen = event.citizenInfo;
//     this.newPerson = event.person;
//     //this.addBenificiaryInputDto = new AddBeneficiaryInputDto();
//     this.onNewPersonAvailable(event);
//     //CitizenUtilities.citizenToPerson(this.newCitizen, this.addBenificiaryInputDto.createBeneficiaryPersonInputDto);
//   }

//   onNewAlienAvailable(event: {
//     alienInfo: AlienInfoResponse;
//     idType: number;
//     idNumber: string;
//     person: OutputApplicationUserDto;
//   }) {
//     this.isValid = true;
//     this.isValidNumber = true;
//     this.newAlien = event.alienInfo;
//     this.newPerson = event.person;
//     //this.addBenificiaryInputDto = new AddBeneficiaryInputDto();
//     this.onNewPersonAvailable(event);
//     //AlienUtilities.alientToPerson(this.newAlien, this.addBenificiaryInputDto.createBeneficiaryPersonInputDto);
//   }

//   onNewBeneficiaryAvailable(event: {
//     beneficiary: BeneficiaryOutKsa;
//     isValid: boolean;
//   }) {
//     this.isValid = event.isValid;
//     this.newBeneficiaryOutKsa = event.beneficiary;
//     this.addBenificiaryInputDto.createBeneficiaryPersonInputDto.idTypeId = 5;
//     BeneficiaryUtilities.toPerson(
//       this.newBeneficiaryOutKsa,
//       this.addBenificiaryInputDto.createBeneficiaryPersonInputDto
//     );

//     var genderVal =
//       this.addBenificiaryInputDto.createBeneficiaryPersonInputDto.gender.toString();
//     this.addBenificiaryInputDto.createBeneficiaryPersonInputDto.gender =
//       genderVal === 'Male' || genderVal === 'M' || genderVal == '0' ? 0 : 1;
//     this.isValidNumber = event.isValid;
//   }

//   onNewPersonAvailable(event: {
//     idType: number;
//     idNumber: string;
//     person: OutputApplicationUserDto;
//   }) {
//     this.newPerson = event.person;
//     this.addBenificiaryInputDto.createBeneficiaryPersonInputDto.init(
//       this.newPerson
//     );
//     //this.addBenificiaryInputDto.createBeneficiaryPersonInputDto=new CreateBeneficiaryPersonInputDto();
//     // this.addBenificiaryInputDto.createBeneficiaryPersonInputDto.idTypeId = event.idType;
//     // this.addBenificiaryInputDto.createBeneficiaryPersonInputDto.idNumber = event.idNumber;
//     this.addBenificiaryInputDto.requestId = this.requestId;
//     this.addBenificiaryInputDto.isBeneficiaryInsideKsa =
//       this.isBenificiaryInKsa;
//     if (this.activeCrudOperation === CrudOperation.Update) {
//       this.essentialInfoForBeneficiaryTab.beneficiaries[
//         this.beneficiaryToEditIndex
//       ].person.mobileNumber = this.newPerson.mobileNumber;
//       this.essentialInfoForBeneficiaryTab.beneficiaries[
//         this.beneficiaryToEditIndex
//       ].person.email = this.newPerson.email;
//     }

//     var genderVal =
//       this.addBenificiaryInputDto.createBeneficiaryPersonInputDto.gender.toString();
//     this.addBenificiaryInputDto.createBeneficiaryPersonInputDto.gender =
//       genderVal === 'Male' || genderVal === 'M' || genderVal === '0' ? 0 : 1;
//     /*
//     this.newPerson = event.person;
//     this.addOwnerInputDto.init(this.newPerson);
//     this.addOwnerInputDto.requestId = this.requestId;
//     this.addOwnerInputDto.personId = this.newPerson.id;

//     if( this.activeCrudOperation === CrudOperation.Update) {
//       this.owners[this.requestedOwnerIndexToEditOrView].person.email = this.newPerson.email;
//       this.owners[this.requestedOwnerIndexToEditOrView].person.mobileNumber = this.newPerson.mobileNumber;
//     }
//     */
//   }

//   OnNewAlienNumberChanged(event: {
//     alienInfoNumber: string;
//     isValid: boolean;
//   }): void {
//     if (
//       event.alienInfoNumber !==
//       this.addBenificiaryInputDto.createBeneficiaryPersonInputDto.mobileNumber
//     ) {
//       this.isMobileNumberModified = true;
//     }
//     this.isValidNumber = true; //event.isValid;
//     this.addBenificiaryInputDto.createBeneficiaryPersonInputDto.mobileNumber =
//       event.alienInfoNumber;
//   }

//   OnNewCitizenNumberChanged(event: {
//     citizenInfoNumber: string;
//     isValid: boolean;
//   }): void {
//     if (
//       event.citizenInfoNumber !==
//       this.addBenificiaryInputDto.createBeneficiaryPersonInputDto.mobileNumber
//     ) {
//       this.isMobileNumberModified = true;
//     }
//     this.isValidNumber = true; // event.isValid;
//     this.addBenificiaryInputDto.createBeneficiaryPersonInputDto.mobileNumber =
//       event.citizenInfoNumber;
//   }
//   get hasBenifiaries() {
//     return (
//       // !!this.requestId &&
//       // this.essentialInfoForBeneficiaryTab &&
//       ArrayExtensions.notEmpty(
//         this.BeneficiaryList
//       )
//     );
//   }

// }
