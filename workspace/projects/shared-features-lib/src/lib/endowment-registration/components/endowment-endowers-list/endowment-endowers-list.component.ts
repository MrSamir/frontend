import { Component, ElementRef, EventEmitter, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { WizardComponent } from "angular-archwizard";
import { CrudOperation } from 'projects/core-lib/src/lib/enums/CrudOperation';
import { handleError } from 'projects/core-lib/src/lib/services/alert/alert.service';
import {
  AlienInfoResponse, ApiResponseOfOutputApplicationUserDto, ApiResponseOfOutputEndowmerDto,
  CitizenInfoResponse, EndowmentRegistrationServiceProxy,
  InputApplicationUserDto, InputAssetDto,
  InputEndowmerDto, InputLookUpDto,
  LookupApplicationServiceProxy, LookupDto, OutputApplicationUserDto,
  OutputEndowmerDto
} from 'projects/public-portal/src/app/modules/shared/services/services-proxies/service-proxies';
import { EnumValidation } from "../../../components/IDNumberWithValidation/EnumValidation";
import { ComponentBase } from 'projects/core-lib/src/lib/components/ComponentBase/ComponentBase.component';
import { CitizenUtilities } from '../../../Models/CitizenInfo';
import { AlienUtilities } from '../../../Models/alienInfo';
import { MessageTypeEnum } from 'projects/core-lib/src/lib/enums/message-type';
import { MessageSeverity } from 'projects/core-lib/src/lib/enums/message-severity';
import Swal from 'sweetalert2';
import { HintModel } from 'projects/core-lib/src/lib/components/hint/hint.component';
import { wizardNavDto } from 'projects/public-portal/src/app/modules/endowment-registration/models/wizard-nav-data';
import { PrimengTableHelper } from 'projects/core-lib/src/lib/helpers/PrimengTableHelper';


@Component({
  selector: 'app-endowment-endowers-list',
  templateUrl: './endowment-endowers-list.component.html',
  styleUrls: ['./endowment-endowers-list.component.css']
})
export class EndowmentEndowersListComponent extends ComponentBase implements OnInit {
  @Input() waqfId: string;
  @Input() public requestId: string;
  @Input() viewOnly: boolean = false;
  @Input() public wizard: WizardComponent;
  @Output() child_ownertypeid: EventEmitter<number> = new EventEmitter();
  @Output() onBtnNextClicked = new EventEmitter<wizardNavDto>();
  @Output() onBtnPreviousClicked = new EventEmitter<wizardNavDto>();
  isCitizen: boolean = false;
  isHafeza: boolean = false;
  ePatternValidation: typeof EnumValidation = EnumValidation;
  lookupfliter: InputLookUpDto = new InputLookUpDto();
  IdTypeLookup: LookupDto[] = [];
  // addHafezaOwnerInputDto:AddHafezaInputDto= undefined;
  // editHafezaOwnerInputDto:EditHafezaInputDto= undefined;
  addOwnerInputDto: InputEndowmerDto;
  requestedOwnerIndexToEditOrView: number;
  mainApplicantPerson: OutputEndowmerDto | undefined;
  isAddHafezaValid: boolean = false;

  activeCrudOperation: CrudOperation = CrudOperation.Create;

  newCitizen: CitizenInfoResponse | undefined;
  newAlien: AlienInfoResponse | undefined;
  newPerson: InputApplicationUserDto | undefined;    // When we finish yakeen validation we ask the system for the person if found through his IdNumber, if yes, then mobile/email will be readonly
  // newHafeza: HafezaInfoResponse= undefined;
  citizenToView: CitizenInfoResponse | undefined
  alienToView: AlienInfoResponse | undefined;
  PartiesTypesLookup: any = [];
  prestigiousAttributeTypes: any = [];
  //ownertypehint: HintEntry;
  EndowmerTypeHint: HintModel;

  lookupInput: InputLookUpDto = new InputLookUpDto();
  wizardNavDto: wizardNavDto = new wizardNavDto();
  primengTableHelper: PrimengTableHelper;

  yakeenPersonUtilities = {
    1: (person: OutputApplicationUserDto) => {
      this.citizenToView = CitizenUtilities.fromPerson(person);
      this.newCitizen = CitizenUtilities.fromPerson(person);
    },
    2: (person: OutputApplicationUserDto) => {
      this.alienToView = AlienUtilities.fromPerson(person);
      this.newAlien = AlienUtilities.fromPerson(person);
    },
    // 3: (person: OutputApplicationUserDto) => {
    //   this.alienToView = AlienUtilities.fromPerson(person);
    //   //this.newHafeza = HafezaUtilities.fromPerson(person);
    // },
    // 4: (person: OutputApplicationUserDto) => {
    //   this.alienToView = AlienUtilities.fromPerson(person);
    //   //this.newHafeza = HafezaUtilities.fromPerson(person);
    // }
  }

  constructor(private modalService: NgbModal,
    public lookupService: LookupApplicationServiceProxy,
    //private requestService: RequestServiceProxy,
    private registerWaqfService: EndowmentRegistrationServiceProxy, injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {

    this.init();
  }

  ngOnChanges() {
    this.init();
  }

  isView(): boolean {

    return this.viewOnly;
  }
  init() {
    this.primengTableHelper = new PrimengTableHelper();
    if (!this.requestId || this.mainApplicantPerson) {
      return;
    }
    //this.lookupService.fetchOwnerTypeLookups();
    //this.loadHint();
    this.LoadLookups('EndowmentPartiesType', (lookups) => {
      this.PartiesTypesLookup = lookups;
    });
    this.LoadLookups('PrestigiousAttributeType', (lookups) => {
      this.prestigiousAttributeTypes = lookups;
    });
    this.processRequest();
  }
  LoadLookups(LookupName: string, callback: (Lookups: LookupDto[]) => void) {
    this.lookupInput.lookUpName = LookupName;
    this.lookupInput.filters = [];
    this.lookupService.getAllLookups(this.lookupInput).subscribe((result) => {
      callback(result.dto.items!);
    });
  }
  processRequest() {
    this.loadEndowmers();
    this.loadEndowmerTypeHint();

  }
  loadEndowmers() {
    this.primengTableHelper.showLoadingIndicator();
    this.registerWaqfService.getEndowersInformationByReqId(this.requestId).subscribe(
      (res: any) => {
        this.primengTableHelper.records = res.dto.items as OutputEndowmerDto[];
        this.primengTableHelper.totalRecordsCount = res.dto.totalCount;
        this.mainApplicantPerson = this.primengTableHelper.records?.find(r => r.isMainApplicant) ?? new OutputEndowmerDto();
      },
      (err) => {
        this.message.showMessage(MessageTypeEnum.toast, {
          severity: MessageSeverity.Error,
          message: err.errMessage,
          closable: true,
          detail: this.l(
            'Common.CommonError'
          ),
          summary: '',
          enableService: true,
        });
      }//handleError<object>(err.error)
    );
    this.primengTableHelper.hideLoadingIndicator();
  }

  onAddNewWaqif(content: any) {
    this.addOwnerInputDto = new InputEndowmerDto();


    this.citizenToView = undefined;
    this.alienToView = undefined;

    this.newCitizen = undefined;
    this.newAlien = undefined;
    this.newPerson = undefined;
    this.isAddHafezaValid = false;
    this.activeCrudOperation = CrudOperation.Create;
    // this.newHafeza = undefined;
    // this.addHafezaOwnerInputDto = undefined;
    this.addOwnerInputDto.requestId = this.requestId;
    this.modalService.open(content, { size: 'lg' });
  }

  CheckDublicateItemInList(userName: string | undefined) {
    if (userName != undefined) {
      let itemindex = this.primengTableHelper.records.findIndex(item => item?.endowmerPerson?.userName === userName);
      if (itemindex !== -1) {
        this.modalService.dismissAll();
        let errMessage = this.l("EndowmentModule.EndowmentRgistrationService.EndomwerDuplicateValidationMessage");
        //showError(errMessage);
        this.message.showMessage(MessageTypeEnum.toast, {
          severity: MessageSeverity.Error,
          message: '',
          closable: true,
          detail: this.l(
            errMessage
          ),
          summary: '',
          enableService: true,
        });
        return true;
      }
    }
    return false;
  }


  addToWaqifList() {

    let duplicated = this.CheckDublicateItemInList(this.addOwnerInputDto?.endowmerPerson?.userName);
    if (duplicated) return;

    // if(this.isAddHafezaValid){
    //   this.registerWaqfService.addHafezaOwner(this.addHafezaOwnerInputDto).subscribe(
    //     (res: ServiceResponseOfAddOwnerOutputDto) => {
    //       if( !res?.isSuccess ) {
    //         return handleError<object>(res);
    //       }

    //       var newOwner = new GetOwnerByRequestIdOutputDto();
    //       newOwner.init(this.addHafezaOwnerInputDto.createHafezaPersonInputDto);
    //       newOwner.id = res.data.ownerId;
    //       newOwner.person = new PersonDto();
    //       newOwner.personId=res.data.personId;
    //       newOwner.person.init(this.addHafezaOwnerInputDto.createHafezaPersonInputDto);
    //       this.primengTableHelper.records.push(newOwner);
    //       showSuccess(translations.operationSuccess, () => {
    //         this.modalService.dismissAll()
    //       });
    //     },
    //     (apiException: ApiException) => handleServiceProxyError(apiException)
    //   );
    //   return;
    // }
    this.registerWaqfService.addEndowmer(this.addOwnerInputDto).subscribe(
      (res: ApiResponseOfOutputEndowmerDto) => {
        if (!res?.isSuccess) {
          this.message.showMessage(MessageTypeEnum.toast, {
            severity: MessageSeverity.Error,
            message: '',
            closable: true,
            detail: res.message!,
            summary: '',
            enableService: true,
          });
        }
        else {
          var newOwner = new OutputEndowmerDto();
          newOwner.init(this.addOwnerInputDto);
          newOwner = res.dto;
          this.loadEndowmers();
          this.processRequest
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
          console.log(res.message);
          this.modalService.dismissAll()
        }
      },
      // (error) => {
      //   this.message.showMessage(MessageTypeEnum.toast, {
      //     severity: MessageSeverity.Error,
      //     message: '',
      //     closable: true,
      //     detail: this.l(
      //       'Common.CommonError'
      //     ),
      //     summary: '',
      //     enableService: true,
      //   });
      // }
      // (apiException: ApiException) => handleServiceProxyError(apiException)
    );
  }

  deleteOwner(index: number) {
    if (this.isOwnerMainApplicant(index)) {   // can't delete main applicant: refer to Brs 1.6
      return;
    }
    // question(translations.assure, () => {
    this.removeOwner(index);
    // });
  }

  removeOwner(index: number) {
    let input = new InputEndowmerDto();
    Swal.fire({
      title: 'تأكيد حذف واقف ؟',
      icon: 'question',
      confirmButtonText: 'متابعة',
      width: 600,
      padding: '3em',
      confirmButtonColor: '#D6BD81',
    }).then((result) => {
      if (result.isConfirmed) {
        input.endowmerId = this.primengTableHelper.records[index].endowmerId;
        input.requestId = this.requestId;
        this.registerWaqfService.deleteEndowmer(input).subscribe(
          () => {
            this.loadEndowmers();
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
            //showSuccess(translations.operationSuccess);
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
          //(apiException: ApiException) => handleServiceProxyError(apiException)
        );
      }
    });

  }

  viewWaqif(content: any, index: number) {
    const owner = this.primengTableHelper.records[index];
    this.activeCrudOperation = CrudOperation.Read;
    this.requestedOwnerIndexToEditOrView = index;

    this.yakeenPersonUtilities[owner.endowmerPerson.idTypeId ?? 0](owner.endowmerPerson);
    this.isCitizen = owner.endowmerPerson.idTypeId === 1;
    //this.isHafeza = owner.endowmerPerson.idTypeId === 3;
    //set owner type id
    this.addOwnerInputDto = new InputEndowmerDto();
    this.addOwnerInputDto.init(owner);
    this.addOwnerInputDto.endowmerPerson = new InputApplicationUserDto()
    this.addOwnerInputDto.endowmerPerson.init(owner.endowmerPerson);

    this.modalService.open(content, { size: 'lg' });
  }

  get isUpdateMode() {
    return this.activeCrudOperation === CrudOperation.Update;
  }

  get isCreateMode() {
    return this.activeCrudOperation === CrudOperation.Create;
  }
  editWaqif(content: any, index: number) {
    this.activeCrudOperation = CrudOperation.Update;
    this.requestedOwnerIndexToEditOrView = index;
    const owner = this.primengTableHelper.records[index];
    //owner.person.idTypeId = defineIdType(owner.person.idNumber);    // This fix for old data only, for new data idType is already there

    //  if(owner.person.idTypeId === 3 || owner.person.idTypeId === 4){
    //      this.editHafezaOwnerInputDto = new EditHafezaInputDto();
    //      this.editHafezaOwnerInputDto.editHafezaPersonInputDto = new EditHafezaPersonInputDto();

    //      this.editHafezaOwnerInputDto.editHafezaPersonInputDto.init(owner.person);
    //      this.editHafezaOwnerInputDto.requestId = this.requestId;
    //      this.editHafezaOwnerInputDto.ownerId = owner.id;


    //  }
    // else{
    this.addOwnerInputDto = new InputEndowmerDto();
    this.addOwnerInputDto.init(owner);
    this.addOwnerInputDto.endowmerPerson = new InputApplicationUserDto()
    this.addOwnerInputDto.endowmerPerson.init(owner.endowmerPerson);
    this.addOwnerInputDto.requestId = this.requestId;
    //set owner type id
    this.addOwnerInputDto.endowmentPartiesTypeId = owner.endowmentPartiesTypeId;
    //}



    this.newPerson = new InputApplicationUserDto();
    this.newPerson.init(owner.endowmerPerson);

    this.citizenToView = undefined;
    this.newCitizen = undefined;
    this.alienToView = undefined;
    this.newAlien = undefined;
    //this.newHafeza = undefined;
    this.yakeenPersonUtilities[owner.endowmerPerson.idTypeId ?? 0](owner.endowmerPerson);

    // if(owner.person.idTypeId === 3|| owner.person.idTypeId === 4){
    //   this.newHafeza.ownerTypeId=owner.ownerTypeId;
    //   this.newHafeza.ownerId = owner.id;
    // }

    this.isCitizen = owner.endowmerPerson.idTypeId === 1;

    this.modalService.open(content, { size: 'lg' });
  }

  get requestedOwnerPerson() {
    var owner = this.primengTableHelper.records[this.requestedOwnerIndexToEditOrView];
    return owner.endowmerPerson;
  }

  isNewOrEditWaqifValid() {
    if (this.activeCrudOperation === CrudOperation.Update) {
      return true;
    }
    const ownerInputDto = this.addOwnerInputDto;
    return !!ownerInputDto.endowmerPerson?.userName &&
      !!ownerInputDto.endowmerPerson?.fullName &&
      (!!ownerInputDto.endowmerPerson?.birthDate || !!ownerInputDto.endowmerPerson?.birthDateHijri) &&
      !!ownerInputDto.endowmerPerson?.phoneNumber &&
      !!ownerInputDto.endowmerPerson?.email &&
      !!ownerInputDto.endowmerPerson?.nationalityId;
  }


  onEditBtnClicked() {

    // if(this.isAddHafezaValid){
    //   this.registerWaqfService.editHafezaOwner(this.editHafezaOwnerInputDto).subscribe(
    //     () => {
    //       showSuccess(translations.editOwnerSuccess, () => {

    //         this.primengTableHelper.records[this.requestedOwnerIndexToEditOrView].ownerTypeId = this.editHafezaOwnerInputDto.editHafezaPersonInputDto.ownerTypeId;
    //         this.primengTableHelper.records[this.requestedOwnerIndexToEditOrView].person.init(this.editHafezaOwnerInputDto.editHafezaPersonInputDto);
    //         this.child_ownertypeid.emit(this.editHafezaOwnerInputDto.editHafezaPersonInputDto.ownerTypeId);
    //         this.newPerson = undefined;
    //         this.newCitizen = undefined;
    //         this.newAlien = undefined;
    //         this.activeCrudOperation = CrudOperation.Create;
    //         this.editHafezaOwnerInputDto = undefined;
    //         this.modalService.dismissAll()
    //       });
    //     },
    //     (apiException: ApiException) => handleServiceProxyError(apiException)
    //   );
    //   return;
    // }



    var editOwnerInputDto = new InputEndowmerDto();
    editOwnerInputDto.init(this.addOwnerInputDto);
    editOwnerInputDto.endowmerPerson = new InputApplicationUserDto()
    editOwnerInputDto.endowmerPerson.init(this.addOwnerInputDto.endowmerPerson);
    editOwnerInputDto.requestId = this.requestId;
    editOwnerInputDto.endowmerId = this.primengTableHelper.records[this.requestedOwnerIndexToEditOrView].endowmerId;
    editOwnerInputDto.endowmerPerson.email = this.newPerson?.email;
    editOwnerInputDto.endowmerPerson.phoneNumber = this.newPerson?.phoneNumber;
    editOwnerInputDto.endowmentPartiesTypeId = this.addOwnerInputDto.endowmentPartiesTypeId;
    this.registerWaqfService.editEndowmer(editOwnerInputDto).subscribe(
      () => {
        this.loadEndowmers();
        this.message.showMessage(MessageTypeEnum.toast, {
          severity: MessageSeverity.Success,
          message: '',
          closable: true,
          detail: this.l(
            'EndowmentModule.EndowmentRgistrationService.editOwnerSuccess'
          ),
          summary: '',
          enableService: true,
        });
        //   showSuccess(translations.editOwnerSuccess, () => {
        this.primengTableHelper.records[this.requestedOwnerIndexToEditOrView].endowmentPartiesTypeId = editOwnerInputDto.endowmentPartiesTypeId;
        this.child_ownertypeid.emit(editOwnerInputDto.endowmentPartiesTypeId);
        this.newPerson = undefined;
        this.newCitizen = undefined;
        this.newAlien = undefined;
        this.activeCrudOperation = CrudOperation.Create;

        this.modalService.dismissAll()
        //   });
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
      // (apiException: ApiException) => handleServiceProxyError(apiException)
    );
  }

  onCancelBtnClicked() {
    this.modalService.dismissAll();
  }

  get isYakeenPersonReady() {

    return !!this.newCitizen || !!this.newAlien;
  }


  get isAddPersonReady() {
    return !!this.newCitizen || !!this.newAlien;//|| !!this.addHafezaOwnerInputDto  ;
  }
  onNewCitizenAvailable(event: {
    citizenInfo: CitizenInfoResponse;
    idType: number,
    userName: string,
    person: InputApplicationUserDto
  }) {
    this.newCitizen = event.citizenInfo;
    this.onNewPersonAvailable(event);
  }

  onNewAlienAvailable(event: {
    alienInfo: AlienInfoResponse;
    idType: number,
    userName: string,
    person: InputApplicationUserDto
  }) {
    this.newAlien = event.alienInfo;
    this.onNewPersonAvailable(event);
  }

  onNewPersonAvailable(event: { idType: number, userName: string, person: InputApplicationUserDto }) {
    this.newPerson = event.person;
    this.addOwnerInputDto.endowmerPerson = new InputApplicationUserDto()
    this.addOwnerInputDto.endowmerPerson.init(this.newPerson);
    this.addOwnerInputDto.requestId = this.requestId;
    this.addOwnerInputDto.endowmerId = this.newPerson.id;
    this.addOwnerInputDto.endowmentId = this.waqfId;
    if (this.activeCrudOperation === CrudOperation.Update) {
      this.primengTableHelper.records[this.requestedOwnerIndexToEditOrView].endowmerPerson.email = this.newPerson.email;
      this.primengTableHelper.records[this.requestedOwnerIndexToEditOrView].endowmerPerson.phoneNumber = this.newPerson.phoneNumber;
    }

  }

  get hasOwners() {
    return this.primengTableHelper.records?.length > 0;
  }

  isOwnerMainApplicant(index: number) {
    const owner = this.primengTableHelper.records[index];
    return owner.isMainApplicant;
  }

  overlay(i: number) {
    return this.isOwnerMainApplicant(i) ? 'disabledIcon' : '';
  }

  changeOwner(event: any) {
    const endowmerType = this.PartiesTypesLookup.filter(
      (ept, index) => ept.id == event.value
    )[0];
    if (endowmerType == undefined) {
      this.loadEndowmerTypeHint();
    } else {
      this.EndowmerTypeHint = {
        hintHeader: endowmerType?.name || '',
        hintBody: endowmerType?.hint || '',
      };
    }
  }


  onNextBtnClicked() {
    if (!this.primengTableHelper.records || this.primengTableHelper.records?.length == 0) {
      this.message.showMessage(MessageTypeEnum.toast, {
        severity: MessageSeverity.Error,
        message: '',
        closable: true,
        detail: this.l(
          'EndowmentModule.EndowmentRgistrationService.atLeastOneOwner'
        ),
        summary: '',
        enableService: true,
      });
      //showError(translations.atLeastOneOwner);
      return;
    }
    this.wizardNavDto.isNaviagateToNext = true;
    this.wizardNavDto.requestId = this.requestId;
    this.wizardNavDto.step = '5';
    this.wizardNavDto.endowmentId = this.waqfId;
    this.onBtnNextClicked.emit(this.wizardNavDto);
  }

  onBackBtnClicked() {
    this.wizardNavDto.requestId = this.requestId;
    this.wizardNavDto.step = '3';
    this.wizardNavDto.endowmentId = this.waqfId;
    this.onBtnPreviousClicked.emit(this.wizardNavDto);
    // this.wizard.goToPreviousStep();
  }

  loadEndowmerTypeHint() {
    this.EndowmerTypeHint = {
      hintBody: this.l(
        'EndowmentModule.EndowmentRgistrationService.EndowmmentPartyTypeHints'
      ),
      hintHeader: this.l(
        'EndowmentModule.EndowmentRgistrationService.EndowmerType'
      ),
    };
  }


  // onNewHafezaAvailable(event){
  //   this.isAddHafezaValid= true;

  //   this.addHafezaOwnerInputDto = new AddHafezaInputDto();
  //   this.addHafezaOwnerInputDto = event.hafeza;
  //   this.addHafezaOwnerInputDto.isHafeza = event.hafeza.isHafeza;
  //   this.addHafezaOwnerInputDto.requestId= this.requestId;

  // }


  // onEditHafezaAvailable(event){
  //   this.isAddHafezaValid= true;

  //   this.editHafezaOwnerInputDto = new EditHafezaInputDto();
  //   this.editHafezaOwnerInputDto.editHafezaPersonInputDto = event.editHafeza.editHafezaPersonInputDto;
  //   this.editHafezaOwnerInputDto.ownerId = event.editHafeza.ownerId;
  //   this.editHafezaOwnerInputDto.isHafeza =  event.editHafeza.isHafeza;
  //   this.editHafezaOwnerInputDto.requestId= this.requestId;

  // }
}
