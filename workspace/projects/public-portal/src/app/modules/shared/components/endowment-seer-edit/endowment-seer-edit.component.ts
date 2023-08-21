import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ArrayExtensions } from 'projects/core-lib/src/lib/helpers/array-extensions';
import {
  AddSeerInputDto,
  AlienInfoResponse, ApiResponseOfOutputFileDto,
  CitizenInfoResponse,
  CreateSeerInputDto,
  EditSeerInputDto, FileLibraryApplicationServiceProxy,
  InputApplicationUserDto, InputFileDto,
  InputLookUpDto,
  LookupApplicationServiceProxy,
  LookupDto,
  OutputApplicationUserDto,
  OutputFileDto,
  OutputSeerDto
} from '../../services/services-proxies/service-proxies';
import { EnumValidation } from 'projects/core-lib/src/public-api';
import { CitizenUtilities } from 'projects/shared-features-lib/src/lib/Models/CitizenInfo';
import { AlienUtilities } from 'projects/shared-features-lib/src/lib/Models/alienInfo';
import { ComponentBase } from 'projects/core-lib/src/lib/components/ComponentBase/ComponentBase.component';
import { CrudOperation } from 'projects/core-lib/src/lib/enums/CrudOperation';
import { HintModel } from "../../../../../../../core-lib/src/lib/components/hint/hint.component";
import {
  AttachementItem
} from "../../../../../../../shared-features-lib/src/lib/components/AttachmentViewer/AttachmentViewer.component";
import { MessageTypeEnum } from "../../../../../../../core-lib/src/lib/enums/message-type";
import { MessageSeverity } from "../../../../../../../core-lib/src/lib/enums/message-severity";

@Component({
  selector: 'app-endowment-shared-seer-edit',
  templateUrl: './endowment-seer-edit.component.html',
  styleUrls: ['./endowment-seer-edit.component.css']
})
export class EndowmentSeerEditComponent extends ComponentBase implements OnInit {

  @Input() viewOnly: boolean = false;
  @Output() OnAddingNewSeer = new EventEmitter<AddSeerInputDto>();
  @Output() OnEditingExistingSeer = new EventEmitter<AddSeerInputDto>();
  @Output() OnDeletingExistingSeer = new EventEmitter<OutputSeerDto>();
  @Output() OnCancelClick = new EventEmitter();
  @Input() seers: OutputSeerDto[] = [];

  lookupfliter: InputLookUpDto = new InputLookUpDto();
  regionsLookups: LookupDto[] = [];
  sifaEtibariLookups: LookupDto[] = [];
  seerTypeLookup: LookupDto[] = [];
  educationLevelLookups: LookupDto[] = [];
  ePatternValidation: typeof EnumValidation = EnumValidation;
  seerToCreate: AddSeerInputDto;
  seerToEditIndex: number;
  isEditRequested: boolean = false;
  citizenToView: CitizenInfoResponse | undefined;
  alienToView: AlienInfoResponse | undefined;
  oldSeedDeedAttachmentId: string;
  newCitizen: CitizenInfoResponse | undefined;
  newAlien: AlienInfoResponse | undefined;
  newPerson: InputApplicationUserDto | undefined; // When we finish yakeen validation we ask the system for the person if found through his IdNumber, if yes, then mobile/email will be readonly
  isCitizen: boolean;
  isAddRequested: boolean;
  requestId: string;
  activeCrudOperation: CrudOperation = CrudOperation.Create;
  seerTypeHint: HintModel;
  seerDeedFile: File;
  uploadedFiles: OutputFileDto[] = [];
  seerDeadAttachemt: AttachementItem;
  FileUploadentityName = 'EndowmentAttachment';
  lookupInput: InputLookUpDto = new InputLookUpDto();


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



  constructor(private modalService: NgbModal, private lookupssrv: LookupApplicationServiceProxy, injector: Injector, private _serviceProxyFileLibrary: FileLibraryApplicationServiceProxy) {
    super(injector);
  }

  ngOnInit(): void {
    this.requestId = 'F462D0C3-F7D2-48C6-803C-AC965E6C85D2';
    this.LoadLookups('EndowmentPartiesType', (lookups) => {
      this.seerTypeLookup = lookups;
    });
    this.LoadLookups('PrestigiousAttributeType', (lookups) => {
      this.sifaEtibariLookups = lookups;
    });
    this.LoadLookups('EducationLevel', (lookups) => {
      this.educationLevelLookups = lookups;
    });
    this.LoadLookups('Region', (lookups) => {
      this.regionsLookups = lookups;
    });
  }

  viewSeer(content: any, index: number) {
    this.editSeer(content, index);
    this.isEditRequested = false; //To hide add/edit buttons
  }

  editSeer(content: any, index: number) {
    this.activeCrudOperation = CrudOperation.Update;
    this.reset();
    this.isEditRequested = true;
    this.seerToEditIndex = index;
    const seerToEdit = this.seers[this.seerToEditIndex];
    this.seerToCreate.createSeerInputDto.init(seerToEdit);
    this.seerToCreate.seerPerson.init(seerToEdit.seerPerson);
    //this.setOldAttachmentIds();

    this.citizenToView = undefined;
    this.newCitizen = undefined;
    this.alienToView = undefined;
    this.newAlien = undefined;

    this.yakeenPersonUtilities[seerToEdit.seerPerson.idTypeId!](seerToEdit.seerPerson);

    this.newPerson = new InputApplicationUserDto();
    this.newPerson.init(seerToEdit.seerPerson);

    this.isCitizen = seerToEdit.seerPerson.idTypeId == 1;
    this.modalService.open(content, { size: 'lg' });
  }

  reset() {
    this.newCitizen = undefined;
    this.newAlien = undefined;
    this.citizenToView = undefined;
    this.alienToView = undefined;
    this.newPerson = undefined;
    //this.isEditRequested = false;

    this.seerToCreate = new AddSeerInputDto();
    this.seerToCreate.seerPerson = new OutputApplicationUserDto();
    this.seerToCreate.createSeerInputDto = new CreateSeerInputDto();
    this.isAddRequested = true;
    this.seerToCreate.requestId = this.requestId;
  }

  deleteSeer(index: number) {
    const seerToDelete = this.seers[index];
    // if (seerToDelete.seerId == this.mainApplicantPerson.applicantPersonId) {
    //   return;
    // }
    this.OnDeletingExistingSeer.emit(seerToDelete);
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
    this.newPerson = event.person;
    this.seerToCreate.seerPerson = new InputApplicationUserDto()
    this.seerToCreate.seerPerson.init(this.newPerson);
    this.seerToCreate.createSeerInputDto.seerId = this.newPerson.id;
    this.seerToCreate.seerPerson.phoneNumber = this.newPerson.phoneNumber;
    this.seerToCreate.seerPerson.email = this.newPerson.email;

  }


  loadSeerTypeHint() {
    this.seerTypeHint = {
      hintBody: this.l(
        'EndowmentModule.EndowmentRgistrationService.EndowmmentPartyTypeHints'
      ),
      hintHeader: this.l(
        'EndowmentModule.EndowmentRgistrationService.SeerType'
      ),
    };
  }
  selectSeerType(event: any) {
    const Seerype = this.sifaEtibariLookups.filter(
      (ept, index) => ept.id == event.value
    )[0];
    if (Seerype == undefined) {
      this.loadSeerTypeHint();
    } else {
      this.seerTypeHint = {
        hintHeader: Seerype?.name || '',
        hintBody: Seerype?.hint || '',
      };
    }
  }
  seerDeedFileSelect(event: any) {
    this.seerDeedFile = event.files[0];
  }

  SeerDeedFileUpload(event: any) {
    this.UploadFile(event.files[0], (response) => {
      this.seerDeadAttachemt = {
        id: response.id,
        fileName: response.fileName!,
        fileData: response.fileData!,
        ContentType: response.contentType!,
      };
      this.seerDeedFile = null!;
      this.seerToCreate.createSeerInputDto.seedDeedAttachmentId = response.id;
    });
  }
  SeerDeedremoveFile(event: AttachementItem) {
    this.removeFile(event, (result) => {
      this.seerToCreate.createSeerInputDto.seedDeedAttachmentId = undefined!;
      this.seerDeadAttachemt = undefined!;
    });
  }

  UploadFile(file: File, callback: (response: OutputFileDto) => void) {
    this._serviceProxyFileLibrary
      .uploadFile(
        this.FileUploadentityName,
        { data: file, fileName: file.name },
        []
      )
      .subscribe(
        (response: ApiResponseOfOutputFileDto) => {
          // Handle the successful response here

          if (response.isSuccess) {
            this.message.showMessage(MessageTypeEnum.toast, {
              closable: true,
              enableService: true,
              summary: this.l('Common.Upload'),
              detail: this.l('Common.SuccesUploadMessge'),
              severity: MessageSeverity.Success,
            });
            callback(response.dto);
          } else {
            this.message.showMessage(MessageTypeEnum.toast, {
              closable: true,
              enableService: true,
              summary: this.l('Common.Upload'),
              detail: response.message!,
              severity: MessageSeverity.Error,
            });
          }
          // Optionally, perform additional actions with the response data
        },
        (error: any) => {
          // Handle the error response here
          this.message.showMessage(MessageTypeEnum.toast, {
            closable: true,
            enableService: true,
            summary: this.l('Common.Upload'),
            detail: this.l('Common.ErrorInFileUpload'),
            severity: MessageSeverity.Error,
          });
          this.Util.error(error);
          // Optionally, perform error handling
        }
      );
  }
  removeFile(
    event: AttachementItem,
    callback: (item: AttachementItem) => void
  ) {
    const input = new InputFileDto();
    input.entityName = this.FileUploadentityName;
    input.id = event.id;
    input.filters = [];
    this._serviceProxyFileLibrary.deleteFile(input).subscribe((result) => {
      if (result.isSuccess) {
        this.message.showMessage(MessageTypeEnum.toast, {
          closable: true,
          enableService: true,
          summary: '',
          detail: result.message!,
          severity: MessageSeverity.Success,
        });
        callback(event);
      } else {
        this.message.showMessage(MessageTypeEnum.toast, {
          closable: true,
          enableService: true,
          summary: '',
          detail: result.message!,
          severity: MessageSeverity.Error,
        });
      }
    });
  }
  getFileById(id, callback: (fileDto) => void) {
    this._serviceProxyFileLibrary
      .downloadFileById(this.FileUploadentityName, id)
      .subscribe((result) => {
        if (result.isSuccess) {
          callback(result.dto);
        }
      });
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
    this.activeCrudOperation = CrudOperation.Create;
    this.modalService.open(content, { size: 'lg' });
  }

  addToSeerList() {
    this.OnAddingNewSeer.emit(this.seerToCreate);
  }

  onEditBtnClicked() {
    let input = new EditSeerInputDto();
    input.createSeerInputDto = new CreateSeerInputDto();
    input.createSeerInputDto.init(this.seers[this.seerToEditIndex]),
      input.requestId = this.requestId,
      input.seerPerson = new InputApplicationUserDto();
    input.seerPerson.init(this.seerToCreate.seerPerson);
    input.createSeerInputDto = new CreateSeerInputDto();
    input.createSeerInputDto.init(this.seerToCreate.createSeerInputDto),
      // input.seerInputDto.isSeedDeedAttachmentChanged =
      //   input.seerInputDto != undefined &&
      //   this.oldSeedDeedAttachmentId != input.seerInputDto.seedDeedAttachmentId;
      this.OnEditingExistingSeer.emit(input);
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

  LoadLookups(LookupName: string, callback: (Lookups: LookupDto[]) => void) {
    this.lookupInput.lookUpName = LookupName;
    this.lookupInput.filters = [];
    this.lookupssrv.getAllLookups(this.lookupInput).subscribe((result) => {
      callback(result.dto.items!);
    });
  }



  get isUpdateMode() {
    return this.activeCrudOperation === CrudOperation.Update;
  }

  get isCreateMode() {
    return this.activeCrudOperation === CrudOperation.Create;
  }

}
