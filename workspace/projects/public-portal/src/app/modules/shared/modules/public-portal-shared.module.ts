import { NgModule } from '@angular/core';
import { EndowmentAssetsEditComponent } from '../components/endowment-assets-edit/endowment-assets-edit.component';
import { EndowmentInfoEditComponent } from '../components/endowment-info-edit/endowment-info-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreLibModule } from 'projects/core-lib/src/public-api';
import { MultiSelectModule } from 'primeng/multiselect';
import { CommonModule } from '@angular/common';
import { EndowmentSharedAssetEditComponent } from '../components/endowment-asset-edit/endowment-asset-edit.component'; //../components/endowment-asset-edit/endowment-asset-edit.component';
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
import { SharecomponentModule } from 'projects/shared-features-lib/src/public-api';
import { InputSwitchModule } from 'primeng/inputswitch';
import { EndowmentApplicantCreateOrEditComponent } from '../components/endowment-applicant-CreateOrEdit/endowment-applicant-CreateOrEdit.component';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DropdownModule } from 'primeng/dropdown';
import { PanelModule } from 'primeng/panel';
import { StepsModule } from 'primeng/steps';
import { EndowmentSeerEditComponent } from '../components/endowment-seer-edit/endowment-seer-edit.component';
import { TableModule } from 'primeng/table';
import { SvgIconModule } from "../../../../../../shared-features-lib/src/lib/modules/svg-icon.module";
import { EndowmentBeneficiaryEditComponent } from '../components/endowment-beneficiary-edit/endowment-beneficiary-edit.component';
import { EndowmentInfoReadonlyComponent } from '../components/endowment-info-readonly/endowment-info-readonly.component';
import { EndowmentApplicantReadonlyComponent } from '../components/endowment-applicant-readonly/endowment-applicant-readonly.component';
import { MapModule } from '../components/map/map.module';
import { AgmCoreModule, AgmMap, AgmMarker } from '@agm/core';
import { AppComponent } from '../../../app.component';


@NgModule({
  declarations: [
    EndowmentInfoEditComponent,
    EndowmentSharedAssetEditComponent,
    AnimalOrAgriculturalAssetComponent,
    BusinessEntityAssetComponent,
    FiscalAssetComponent,
    IntellectualPropertyAndTrademarkAssetComponent,
    MonetaryAssetComponent,
    MovableAssetComponent,
    ParticularBenefitAssetComponent,
    RealestateAssetComponent,
    EndowmentApplicantCreateOrEditComponent,
    EndowmentAssetsEditComponent,
    EndowmentSeerEditComponent,
    EndowmentBeneficiaryEditComponent, EndowmentInfoReadonlyComponent,
    EndowmentApplicantReadonlyComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharecomponentModule,
    MultiSelectModule,
    FileUploadModule,
    ToastModule,
    CheckboxModule,
    RadioButtonModule,
    InputSwitchModule,
    SelectButtonModule,
    DropdownModule,
    PanelModule,
    StepsModule,
    CoreLibModule,
    TableModule,
    SvgIconModule,
    MapModule,
  ],
  exports: [
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
    EndowmentApplicantCreateOrEditComponent,
    EndowmentAssetsEditComponent,
    EndowmentInfoEditComponent,
    EndowmentSeerEditComponent,
    EndowmentBeneficiaryEditComponent, EndowmentInfoReadonlyComponent,
    EndowmentApplicantReadonlyComponent,
    EndowmentInfoReadonlyComponent
  ],
})
export class PublicPortalSharedModule { }
