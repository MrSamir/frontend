import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ArrayExtensions } from 'projects/core-lib/src/lib/helpers/array-extensions';
import { AddSeerInputDto, AlienInfoResponse, CitizenInfoResponse, CreateSeerInputDto, EditSeerInputDto, InputApplicationUserDto, InputLookUpDto, LookupApplicationServiceProxy, LookupDto, OutputApplicationUserDto, OutputSeerDto } from '../../services/services-proxies/service-proxies';
import { EnumValidation } from 'projects/core-lib/src/public-api';
import { CitizenUtilities } from 'projects/shared-features-lib/src/lib/Models/CitizenInfo';
import { AlienUtilities } from 'projects/shared-features-lib/src/lib/Models/alienInfo';
import { ComponentBase } from 'projects/core-lib/src/lib/components/ComponentBase/ComponentBase.component';

@Component({
  selector: 'app-endowment-shared-seer-edit',
  templateUrl: './endowment-seer-edit.component.html',
  styleUrls: ['./endowment-seer-edit.component.css']
})
export class EndowmentSeerEditComponent extends ComponentBase implements OnInit {

  @Input() viewOnly: boolean = false;
  @Output() OnAddingNewSeer = new EventEmitter<AddSeerInputDto>();
  @Output() OnEditingExistingSeer = new EventEmitter<AddSeerInputDto>();
  @Output() OnDeletingExistingSeer = new EventEmitter<{
    seerToDelete: OutputSeerDto;
    index: number;
  }>();
  @Output() OnCancelClick = new EventEmitter();
  @Input() seers: OutputSeerDto[] = [];

  lookupfliter:InputLookUpDto=new InputLookUpDto();
  regionsLookups: LookupDto[] = [];
  sifaEtibariLookups: LookupDto[] = [];
  seerTypeLookup:LookupDto[]=[];
  educationLevelLookups: LookupDto[] = [];
  ePatternValidation: typeof EnumValidation = EnumValidation;
  seerToCreate:AddSeerInputDto;
  seerToEditIndex: number;
  isEditRequested: boolean = false;
  citizenToView: CitizenInfoResponse;
  alienToView: AlienInfoResponse;
  oldSeedDeedAttachmentId: string;
  newCitizen: CitizenInfoResponse;
  newAlien: AlienInfoResponse;
  newPerson: InputApplicationUserDto ; // When we finish yakeen validation we ask the system for the person if found through his IdNumber, if yes, then mobile/email will be readonly
  isCitizen: boolean;
  isAddRequested: boolean;
  requestId: string;

  yakeenPersonUtilities = {
    1: (person: OutputApplicationUserDto) => {
      this.citizenToView = CitizenUtilities.fromPerson(person);
      this.newCitizen = CitizenUtilities.fromPerson(person);
    },
    2: (person: OutputApplicationUserDto) => {
      this.alienToView = AlienUtilities.fromPerson(person);
      this.newAlien = AlienUtilities.fromPerson(person);
      console.log('alienToView: ', this.alienToView);
    },
  };



  constructor (private modalService: NgbModal,private lookupssrv:LookupApplicationServiceProxy, injector: Injector)
  {
    super(injector);
  }

  ngOnInit(): void {
    this.fetchSeerLookup();
    this.fetchSifaEtibariTypeLookups();
    this.fetchRegionsLookups();
    this.fetchEducationLevelLookups();
  }

  viewSeer(content: any, index: number) {
    this.editSeer(content, index);
    this.isEditRequested = false; //To hide add/edit buttons
  }

  editSeer(content: any, index: number) {
    //his.activeCrudOperation = CrudOperation.Update;
    this.reset();
    this.isEditRequested = true;
    this.seerToEditIndex = index;
    const seerToEdit = this.seers[this.seerToEditIndex];
    this.seerToCreate.createSeerInputDto.init(seerToEdit);
    this.seerToCreate.seerPerson.init(seerToEdit.seerPerson);
    //this.setOldAttachmentIds();

    this.citizenToView = new CitizenInfoResponse();
    this.newCitizen = new CitizenInfoResponse();
    this.alienToView = new AlienInfoResponse();
    this.newAlien = new AlienInfoResponse();

    this.yakeenPersonUtilities[seerToEdit.seerPerson.idTypeId!](seerToEdit.seerPerson);

    this.newPerson = new InputApplicationUserDto();
    this.newPerson.init(seerToEdit.seerPerson);

    this.isCitizen = seerToEdit.seerPerson.idTypeId == 1;
    this.modalService.open(content, { size: 'lg' });
  }

  reset() {
    this.newCitizen = new CitizenInfoResponse();
    this.newAlien = new AlienInfoResponse();
    this.citizenToView = new CitizenInfoResponse();
    this.alienToView = new AlienInfoResponse();
    this.newPerson = new InputApplicationUserDto();
    this.isEditRequested = false;

    this.seerToCreate = new AddSeerInputDto();
    this.seerToCreate.seerPerson =new OutputApplicationUserDto();
    this.seerToCreate.createSeerInputDto = new CreateSeerInputDto();
    this.isAddRequested = true;
    this.seerToCreate.requestId = this.requestId;
  }

  deleteSeer(index: number) {
    const seerToDelete = this.seers[index];
    // if (seerToDelete.personId == this.mainApplicantPerson.applicantPersonId) {
    //   return;
    // }
    this.OnDeletingExistingSeer.emit({seerToDelete,index});
  }

  onNewCitizenAvailable(event: {
    citizenInfo: CitizenInfoResponse;
    idType: number;
    userName: string;
    person: InputApplicationUserDto;
  }) {
    this.newCitizen = event.citizenInfo;
    this.onNewPersonAvailable(event);
    //this.loadHint();
  }

  onNewAlienAvailable(event: {
    alienInfo: AlienInfoResponse;
    idType: number;
    userName: string;
    person: InputApplicationUserDto;
  }) {
    this.newAlien = event.alienInfo;
    this.onNewPersonAvailable(event);
    //this.loadHint();
  }

  onNewPersonAvailable(event: {
    idType: number;
    userName: string;
    person: InputApplicationUserDto;
  }) {
    //let educationLevel: number =this.seerToCreate.createSeerInputDto.educationLevelId;
    this.newPerson = event.person;
    this.seerToCreate.seerPerson.init(this.newPerson);
    this.seerToCreate.seerPerson.gender =
    this.seerToCreate.seerPerson.gender.toString() === 'Male' ? 0 : 1;
    //this.seerToCreate.createSeerInputDto.educationLevelId
    // if( !!event.person ) {
    //   this.newSeer.email = event.person.email;
    //   this.newSeer.mobileNumber = event.person.mobileNumber;
    // }
  }
  agentDeedFileSelect(event) {
    // this.AgentDeed = event.files[0];
  }
  agentDeedFileUpload(event) {
    // this.UploadFile(event.files[0], (response) => {
    //   this.agentDeedAttachment = {
    //     id: response.id,
    //     fileName: response.fileName!,
    //     fileData: response.fileData!,
    //     ContentType: response.contentType!,
    //   };
    //   this.AgentDeed = null!;
    //   this.requestInfo.applicantAgent.representativeAttachmentId = response.id;
    // });
  }
  // removeAgentDeedFile(event: AttachementItem) {
  //   this.removeFile(event, (result) => {
  //     this.requestInfo.applicantAgent.representativeAttachmentId = undefined!;
  //     this.agentDeedAttachment = undefined!;
  //   });
  // }
  onAddNewSeer(content: any) {
    this.reset();
    this.modalService.open(content, { size: 'lg' });
  }

  addToSeerList()
  {
    this.OnAddingNewSeer.emit(this.seerToCreate);
  }

  onEditBtnClicked() {

    // const input = new EditSeerInputDto({
    //   createSeerInputDto: this.seers[this.seerToEditIndex].id,
    //   requestId: this.requestId,
    //   seerPersonInputDto: this.seerToCreate.seerPersonInputDto,
    //   seerInputDto: this.seerToCreate.seerInputDto,
    //   email: this.newPerson.email,
    //   mobileNumber: this.newPerson.mobileNumber,
    // });
    // input.seerInputDto.isSeedDeedAttachmentChanged =
    //   input.seerInputDto != undefined &&
    //   this.oldSeedDeedAttachmentId != input.seerInputDto.seedDeedAttachmentId;
    //   this.OnEditingExistingSeer.emit(input);
  }

  onCancelBtnClicked() {
    this.modalService.dismissAll();
  }


  get hasSeers() {
    return ArrayExtensions.notEmpty(this.seers);
  }

  get isYakeenPersonReady() {
    return !!this.newCitizen || !!this.newAlien;
  }

  get isSeerDeedAttachmentUploaded() {
    return true;
  }

  isNewOrEditSeerValid() {
    var seer = this.seerToCreate;
    return (
      !!seer.seerPerson.userName &&
      !!seer.seerPerson.fullName &&
      !!seer.createSeerInputDto.seerTypeId &&
      !!seer.createSeerInputDto.seenDeedId &&
      !!seer.seerPerson.phoneNumber &&
      !!seer.seerPerson.nationalityId &&
      !!seer.createSeerInputDto.educationLevelId
    );
  }

  fetchSifaEtibariTypeLookups() {
    if (!!this.sifaEtibariLookups) {
      return;
    }
    this.lookupfliter.lookUpName = "PrestigiousAttributeType";
    this.lookupfliter.filters = [];
    this.lookupssrv.getAllLookups(this.lookupfliter).subscribe(
      (data) => {
        this.sifaEtibariLookups = data.dto.items!;
        console.log(data);
        //this.loadAssetSize();

      });

    // this.getLookupValues(EnumLookuptypes.SifaEtibariType).subscribe((res: any) => {
    //   res.subscribe((res: LookupModel[]) => {
    //     this.sifaEtibariLookups = res;
    //     this.sifaEtibariLookupsReverseMap.rebuild(this.sifaEtibariLookups);

    //   });
    // });
  }

  fetchEducationLevelLookups() {
    if (this.educationLevelLookups.length > 0) {
      return;
    }
    this.lookupfliter.lookUpName = "EducationLevel";
    this.lookupfliter.filters = [];
    this.lookupssrv.getAllLookups(this.lookupfliter).subscribe(
      (data) => {
        this.educationLevelLookups = data.dto.items!;
        console.log(data);
        //this.loadAssetSize();

      });

    // this.getLookupValues(EnumLookuptypes.EducationLevel).subscribe((res: any) => {
    //   res.subscribe((res: EducationLevel[]) => {
    //     //this.educationLevelLookups = res;
    //     this.educationLevelList = [];
    //     this.educationLevelLookups = [];
    //     this.educationLevelList = res;
    //     this.educationLevelList.forEach(element => {
    //       this.educationLevelLookups.push(new LookupModel(element.id, element.name));
    //     });
    //     this.educationalLevelReverseMap.rebuild(this.educationLevelLookups);
    //   });
    // });
  }

  fetchRegionsLookups() {
    if (!!this.regionsLookups) {
      return;
    }
    this.lookupfliter.lookUpName = "Region";
    this.lookupfliter.filters = [];
    this.lookupssrv.getAllLookups(this.lookupfliter).subscribe(
      (data) => {
        this.regionsLookups = data.dto.items!;
        console.log(data);

      });
    // this.getLookupValuesFromServiceResponseType(EnumLookuptypes.RegionLookup).subscribe((res: any) => {
    //   res.subscribe((res: LookupModel[]) => {
    //     this.regionsLookups = res;
    //     this.regionLookupsReverseMap = new ReverseLookupMap(this.regionsLookups);
    //   });
    // });
  }

  fetchSeerLookup()
  {
    this.lookupfliter.lookUpName = "EndowmentPartiesType";
    this.lookupfliter.filters = [];
    this.lookupssrv.getAllLookups(this.lookupfliter).subscribe(
      (data) => {
        this.seerTypeLookup = data.dto.items!;
        console.log(data);

      });

  }

}
