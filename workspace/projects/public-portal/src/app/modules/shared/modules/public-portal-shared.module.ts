import { NgModule } from '@angular/core';


import { EndowmentApplicantEditComponent } from '../components/endowment-applicant-edit/endowment-applicant-edit.component';
import { EndowmentAssetsEditComponent } from '../components/endowment-assets-edit/endowment-assets-edit.component';
import { EndowmentInfoEditComponent } from '../components/endowment-info-edit/endowment-info-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreLibModule } from 'projects/core-lib/src/public-api';
import { MultiSelectModule } from 'primeng/multiselect';
import { CommonModule } from '@angular/common';
import { EndowmentSharedAssetEditComponent } from '../components/endowment-asset-edit/endowment-asset-edit.component';
import { AnimalOrAgriculturalAssetComponent } from '../components/endowment-asset-edit/animal-or-agricultural-asset/animal-or-agricultural-asset.component';
import { BusinessEntityAssetComponent } from '../components/endowment-asset-edit/business-entity-asset/business-entity-asset.component';
import { FiscalAssetComponent } from '../components/endowment-asset-edit/fiscal-asset/fiscal-asset.component';
import { IntellectualPropertyAndTrademarkAssetComponent } from '../components/endowment-asset-edit/intellectual-property-and-trademark-asset/intellectual-property-and-trademark-asset.component';
import { MonetaryAssetComponent } from '../components/endowment-asset-edit/monetary-asset/monetary-asset.component';
import { MovableAssetComponent } from '../components/endowment-asset-edit/movable-asset/movable-asset.component';
import { ParticularBenefitAssetComponent } from '../components/endowment-asset-edit/particular-benefit-asset/particular-benefit-asset.component';
import { RealestateAssetComponent } from '../components/endowment-asset-edit/realestate-asset/realestate-asset.component';






@NgModule({
  declarations: [

    EndowmentApplicantEditComponent,
    EndowmentAssetsEditComponent,
    EndowmentInfoEditComponent,
    EndowmentSharedAssetEditComponent, AnimalOrAgriculturalAssetComponent, BusinessEntityAssetComponent, FiscalAssetComponent, IntellectualPropertyAndTrademarkAssetComponent,
     MonetaryAssetComponent, MovableAssetComponent, ParticularBenefitAssetComponent, RealestateAssetComponent

  ],
  imports: [

    CommonModule,
    ReactiveFormsModule,
    CoreLibModule,
    MultiSelectModule
  ],
  exports: [

    EndowmentApplicantEditComponent,
    EndowmentAssetsEditComponent,
    EndowmentInfoEditComponent,
    EndowmentSharedAssetEditComponent

  ]
})
export class PublicPortalSharedModule { }
