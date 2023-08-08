import { NgModule } from '@angular/core';


 
import { EndowmentAssetsEditComponent } from '../components/endowment-assets-edit/endowment-assets-edit.component';
import { EndowmentInfoEditComponent } from '../components/endowment-info-edit/endowment-info-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MultiSelectModule } from 'primeng/multiselect';
import { CommonModule } from '@angular/common';
import { EndowmentSharedAssetEditComponent } from '../components/endowment-asset-edit/endowment-asset-edit.component';//../components/endowment-asset-edit/endowment-asset-edit.component';
import { AnimalOrAgriculturalAssetComponent } from '../components/endowment-asset-edit/animal-or-agricultural-asset/animal-or-agricultural-asset.component';
import { BusinessEntityAssetComponent } from '../components/endowment-asset-edit/business-entity-asset/business-entity-asset.component';
import { FiscalAssetComponent } from '../components/endowment-asset-edit/fiscal-asset/fiscal-asset.component';
import { IntellectualPropertyAndTrademarkAssetComponent } from '../components/endowment-asset-edit/intellectual-property-and-trademark-asset/intellectual-property-and-trademark-asset.component';
import { MonetaryAssetComponent } from '../components/endowment-asset-edit/monetary-asset/monetary-asset.component';
import { MovableAssetComponent } from '../components/endowment-asset-edit/movable-asset/movable-asset.component';
import { ParticularBenefitAssetComponent } from '../components/endowment-asset-edit/particular-benefit-asset/particular-benefit-asset.component';
import { RealestateAssetComponent } from '../components/endowment-asset-edit/realestate-asset/realestate-asset.component';

import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { EndowmentApplicantEditComponent } from '../components/endowment-applicant-edit/endowment-applicant-edit.component';
import { CoreLibModule } from 'projects/core-lib/src/public-api';
import { SharecomponentModule } from 'projects/shared-features-lib/src/public-api';


 
 
 

@NgModule({
  declarations: [ 
    EndowmentApplicantEditComponent,
    EndowmentInfoEditComponent,
    EndowmentSharedAssetEditComponent,
    AnimalOrAgriculturalAssetComponent,
    BusinessEntityAssetComponent,
    FiscalAssetComponent,
    IntellectualPropertyAndTrademarkAssetComponent,
    MonetaryAssetComponent,
    MovableAssetComponent,
    ParticularBenefitAssetComponent,
    RealestateAssetComponent
  ],
  imports: [

    CommonModule,FormsModule,
    ReactiveFormsModule,
 CoreLibModule,SharecomponentModule,
MultiSelectModule,FileUploadModule,ToastModule, InputSwitchModule,
  ],
  exports: [
    EndowmentApplicantEditComponent,
    //EndowmentAssetsEditComponent,
    EndowmentInfoEditComponent,
    EndowmentSharedAssetEditComponent,
    // AnimalOrAgriculturalAssetComponent,
    // BusinessEntityAssetComponent,
    // FiscalAssetComponent,
    // IntellectualPropertyAndTrademarkAssetComponent,
    // MonetaryAssetComponent,
    // MovableAssetComponent,
    // ParticularBenefitAssetComponent,
    // RealestateAssetComponent

  ]
})
export class PublicPortalSharedModule { }
