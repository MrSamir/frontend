import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EnumValidation } from 'projects/core-lib/src/lib/enums/EnumValidation';
import { LookupModel } from '../../models/LookupModel';
import { EndowmentRegistrationServiceProxy, InputAssetDto, InputLookUpDto, InputOneAssetDto, LookupApplicationServiceProxy, LookupDto, LookupExtraData, OutputAssetDto } from '../../services/services-proxies/service-proxies';
import { MapModel } from '../map/map.model';
//import { ActivatedRoute } from '@angular/router';
import { RequestModel } from '../../models/RequestModel';


@Component({
  selector: 'app-endowment-shared-asset-edit',
  templateUrl: './endowment-asset-edit.component.html',
  styleUrls: ['./endowment-asset-edit.component.css']
})
export class EndowmentSharedAssetEditComponent implements OnInit {

 //#region variables

 @Input() viewOnly: boolean = false;

  @Input() IsNewAssetRequest: boolean = true;

  @Input() @Output() request: RequestModel;

  @Output() OnAddingNewAsset = new EventEmitter<InputAssetDto>();
  @Output() OnEditingExistingAsset = new EventEmitter<InputAssetDto>();
  @Output() OnDeletingExistingAsset = new EventEmitter<{
    assetToDelete: OutputAssetDto;
    index: number;
  }>();
  @Output() OnCancelClick = new EventEmitter();

  @Input() waqfId: string | undefined;
  @Input() requestId: string;
  @Input() Assets: OutputAssetDto[] = [];

  SelectedAssetToEdit: InputAssetDto;
  map: MapModel;

  newAsset: InputAssetDto|undefined;

  lookupfliter:InputLookUpDto=new InputLookUpDto();
  assetsSubTypeLookup:LookupDto[]=[];
  AssetTypeLookup: LookupDto[]=[];
  AssetSizeLookup: LookupDto[]=[];
  RegionLookup: LookupDto[]=[];
  CityLookup: LookupDto[]=[];
  AssetSubTypeLookup: LookupDto[]=[];
  OneRequestAsset: InputOneAssetDto;
  assetTypeMap: { [value: number]: string } = {};
  assetToEditIndex: number;
  isEditRequested: boolean = false;
  resolveLookup: any;
  assetSubTypes: LookupModel[];
  ePatternValidation: typeof EnumValidation = EnumValidation;
 
 //#endregion
  //assetSubTypes: LookupModel[];
  
    

  constructor (public formBuilder:FormBuilder,private modalService: NgbModal,
                private registerWaqfServiceProxy: EndowmentRegistrationServiceProxy,
                private lookupssrv:LookupApplicationServiceProxy,
               /*private activatedRoute: ActivatedRoute*/)
    {}

  ngOnInit(): void {
    //this.loadAssetType();
  
  }

  //#region Events 

  onEditBtnClicked() {
   this.OnEditingExistingAsset.emit(this.newAsset);
  }

  onCancelBtnClicked() {
    this.OnCancelClick.emit();
    this.modalService.dismissAll();
  }

  onAddBtnClicked() {

    this.OnAddingNewAsset.emit(this.newAsset);
  }
  

  async onAddNewAssetClicked(data:any) {

    if (this.requestId == undefined) {
      if (this.request == undefined || this.request.id == undefined)
        this.requestId ='';// this.activatedRoute.snapshot.params['requestId'];
      else {
        this.requestId = this.request.id;
      }
    }
    this.newAsset = new InputAssetDto();
    this.newAsset.requestId = this.requestId;
    // this.newAsset.isDirectlyBenefited = true;
    await this.loadAssetType();

    await this.loadAssetSize();
    this.isEditRequested = false;
    this.viewOnly = false;

     this.modalService.open(data, { size: 'lg' });
  }

  onViewTableCellClicked(content: any, AssetId: string, assetToEditIndex: number) {
    this.isEditRequested = true;
    const seerToView = this.Assets[assetToEditIndex];
    var SelectedAssetToView = new InputAssetDto();
    SelectedAssetToView.init(seerToView);
    this.newAsset = SelectedAssetToView;
    this.loadassetSubType();
     this.modalService.open(content, { size: 'lg' });
  }


  async onEditTableCellClicked(content: any, AssetId: string, assetToEditIndex: number) {
    this.isEditRequested = true;
    const seerToEdit = this.Assets[assetToEditIndex];
    var SelectedAssetToEdit = new InputAssetDto();
    SelectedAssetToEdit.init(seerToEdit);
    this.newAsset = SelectedAssetToEdit;
    this.loadassetSubTypeforEdit(
      this.Assets[assetToEditIndex].assetTypeId!,
      content
    );
  }

  onDeleteTableCellClicked(assetToDelete: any, index: number) {   // we change AssetDto to any , revert back after building backend
   this.OnDeletingExistingAsset.emit({ assetToDelete, index });
  }



  //#endregion
  
  //#region internal methods

  private loadAssetType() {

    this.lookupfliter.lookUpName = "AssetType";
    this.lookupfliter.filters = [];
    this.lookupssrv.getAllLookups(this.lookupfliter).subscribe(
      (data) => {
        this.AssetTypeLookup = data.dto.items!;
        console.log(data);
        this.loadAssetSize();
      
      });

  }

  private loadAssetSize() {
    this.lookupfliter.lookUpName = "AssetSize";
    this.lookupfliter.filters = [];
    this.lookupssrv.getAllLookups(this.lookupfliter).subscribe(
      (data) => {
        this.AssetSizeLookup = data.dto.items!;
        console.log(data);
        //this.loadassetSubType();
      });
  }

  public changeAssetType() {
    // this.newAsset.businessEntityAsset = undefined;
    // this.newAsset.realEstateAsset = undefined;
    // this.newAsset.fiscalAsset = undefined;
    // this.newAsset.movableAsset = undefined;
    // this.newAsset.monetaryAsset = undefined;
    // this.newAsset.particularBenefitAsset = undefined;
    // this.newAsset.intellectualPropertyAndTrademarkAsset = undefined;
    // this.newAsset.animalOrAgriculturalAsset = undefined;


    this.loadassetSubType();
  }

  isNewOrEditAssetValid() {
    return true;
  }

  loadassetSubTypeforEdit(assetTypeId:number,content: any)
  {
    this.lookupfliter.lookUpName = "AssetSubType";
    //this.lookupfliter.filters = [assetTypeId];
    this.lookupfliter.filters = [];
    this.lookupssrv.getAllLookups(this.lookupfliter).subscribe(
      (data) => {
        this.assetsSubTypeLookup = data.dto.items!;
        console.log(data);
      });
  }


  loadassetSubType()
  {
    this.lookupfliter.lookUpName = "AssetSubType";
    this.lookupfliter.filters = [];
    this.lookupssrv.getAllLookups(this.lookupfliter).subscribe(
      (data) => {
        this.assetsSubTypeLookup = data.dto.items!;
        console.log(data);
      });
  }

  //#endregion
  

}
