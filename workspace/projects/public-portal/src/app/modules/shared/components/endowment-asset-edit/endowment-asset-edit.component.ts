import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-endowment-shared-asset-edit',
  templateUrl: './endowment-asset-edit.component.html',
  styleUrls: ['./endowment-asset-edit.component.css']
})
export class EndowmentSharedAssetEditComponent implements OnInit {

 //#region variables

 @Input() Assets: any = undefined;   // AssetsDTO 
 @Input() requestId: string;
 @Input() waqfId: string | undefined;
//  @Output() OnAddingNewAsset = new EventEmitter<CreateOrEditAssetDto>();
//  @Output() OnEditingExistingAsset = new EventEmitter<CreateOrEditAssetDto>();
//  @Output() OnDeletingExistingAsset = new EventEmitter<{
//    assetToDelete: AssetDto;
//    index: number;
//  }>();
 @Output() OnCancelClick = new EventEmitter();
 
 //#endregion


  constructor (public formBuilder:FormBuilder,private modalService: NgbModal,){}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  //#region Events 

  onEditBtnClicked() {
   // this.OnEditingExistingAsset.emit(this.newAsset);
  }

  onCancelBtnClicked() {
    //this.OnCancelClick.emit();
    this.modalService.dismissAll();
  }

  onAddBtnClicked() {

    //this.OnAddingNewAsset.emit(this.newAsset);
  }
  

  async onAddNewAssetClicked(data:any) {

    // if (this.requestId == undefined) {
    //   if (this.request == undefined || this.request.id == undefined)
    //     this.requestId = this.activatedRoute.snapshot.params['requestId'];
    //   else {
    //     this.requestId = this.request.id;
    //   }
    // }
    // this.newAsset = new CreateOrEditAssetDto();
    // this.newAsset.requestId = this.requestId;
    // // this.newAsset.isDirectlyBenefited = true;
    // await this.loadAssetType();

    // await this.loadAssetSize();
    // this.isEditRequested = false;
    // this.viewOnly = false;

     this.modalService.open(data, { size: 'lg' });
  }

  onViewTableCellClicked(content: any, AssetId: string, assetToEditIndex: number) {
    // this.isEditRequested = true;
    // const seerToView = this.Assets[assetToEditIndex];
    // var SelectedAssetToView = new CreateOrEditAssetDto();
    // SelectedAssetToView.init(seerToView);
    // this.newAsset = SelectedAssetToView;
    // this.loadassetSubType();
     this.modalService.open(content, { size: 'lg' });
  }


  async onEditTableCellClicked(content: any, AssetId: string, assetToEditIndex: number) {
    // this.isEditRequested = true;
    // const seerToEdit = this.Assets[assetToEditIndex];
    // var SelectedAssetToEdit = new CreateOrEditAssetDto();
    // SelectedAssetToEdit.init(seerToEdit);
    // this.newAsset = SelectedAssetToEdit;
    // this.loadassetSubTypeforEdit(
    //   this.Assets[assetToEditIndex].assetTypeId,
    //   content
    // );
  }

  onDeleteTableCellClicked(assetToDelete: any, index: number) {   // we change AssetDto to any , revert back after building backend
   // this.OnDeletingExistingAsset.emit({ assetToDelete, index });
  }



  //#endregion
  
  //#region internal methods

  private loadAssetType() {
    // this.lookupService.getLookupValues(EnumLookuptypes.AssetTypeLookup).subscribe((res: any) => {
    //   res.subscribe(async (res: any[]) => {
    //     this.AssetTypeLookup = res as LookupModel[];
    //     for (const lookupModel of this.AssetTypeLookup) {
    //       this.assetTypeMap[lookupModel.value] = lookupModel.name;

    //     }

    //       this.loadassetSubType();
    //     });
    //   });
  }
  private loadAssetSize() {
    // this.lookupService
    //   .getLookupValues(EnumLookuptypes.AssetSizeLookup)
    //   .subscribe((res: any) => {
    //     res.subscribe((res: any[]) => {
    //       this.AssetSizeLookup = res;
    //     });
    //   });
  }

  private changeAssetType() {
    // this.newAsset.businessEntityAsset = undefined;
    // this.newAsset.realEstateAsset = undefined;
    // this.newAsset.fiscalAsset = undefined;
    // this.newAsset.movableAsset = undefined;
    // this.newAsset.monetaryAsset = undefined;
    // this.newAsset.particularBenefitAsset = undefined;
    // this.newAsset.intellectualPropertyAndTrademarkAsset = undefined;
    // this.newAsset.animalOrAgriculturalAsset = undefined;


    // this.loadassetSubType();
  }

  isNewOrEditAssetValid() {
    return true;
  }

  loadassetSubTypeforEdit(assetTypeId:number,content: any)
  {
    // this.lookupService.getAssetSubTypeByAssetTypeId(assetTypeId).subscribe((result)=>{
    //   result.subscribe((assetsSubTypes: LookupModel[])=>{
    //     this.assetSubTypes=assetsSubTypes;
    //     this.modalService.open(content,{ size:'lg' });
    //   });
    // });
  }


  loadassetSubType()
  {
    // this.lookupService.getAssetSubTypeByAssetTypeId(this.newAsset?.assetTypeId).subscribe((result)=>{
    //   result.subscribe((assetsSubTypes: LookupModel[])=>{
    //     this.assetSubTypes=assetsSubTypes;
    //   });
    // });
  }

  //#endregion
  

}
