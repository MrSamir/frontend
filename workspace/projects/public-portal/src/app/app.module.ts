import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';



import { CoreLibModule } from 'projects/core-lib/src/public-api';
import { ButtonModule } from 'primeng/button';
import { AppMessageService } from 'projects/core-lib/src/lib/services/app-message.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';


import { PublicPortalSharedModule } from './modules/shared/modules/public-portal-shared.module';
import { MultiSelectModule } from 'primeng/multiselect';
import { SharecomponentModule } from 'projects/shared-features-lib/src/lib/modules/sharecomponent.module';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { LoginComponent } from './login/login.component';
import { LandingComponent } from './layout/landing/landing.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EndowmentSharedAssetEditComponent } from './modules/shared/components/endowment-asset-edit/endowment-asset-edit.component';
import { AnimalOrAgriculturalAssetComponent } from './modules/shared/components/endowment-asset-edit/animal-or-agricultural-asset/animal-or-agricultural-asset.component';
import { BusinessEntityAssetComponent } from './modules/shared/components/endowment-asset-edit/business-entity-asset/business-entity-asset.component';
import { FiscalAssetComponent } from './modules/shared/components/endowment-asset-edit/fiscal-asset/fiscal-asset.component';
import { IntellectualPropertyAndTrademarkAssetComponent } from './modules/shared/components/endowment-asset-edit/intellectual-property-and-trademark-asset/intellectual-property-and-trademark-asset.component';
import { MonetaryAssetComponent } from './modules/shared/components/endowment-asset-edit/monetary-asset/monetary-asset.component';
import { MovableAssetComponent } from './modules/shared/components/endowment-asset-edit/movable-asset/movable-asset.component';
import { ParticularBenefitAssetComponent } from './modules/shared/components/endowment-asset-edit/particular-benefit-asset/particular-benefit-asset.component';
import { RealestateAssetComponent } from './modules/shared/components/endowment-asset-edit/realestate-asset/realestate-asset.component';


@NgModule({
  declarations: [
    AppComponent,


    HeaderComponent, FooterComponent, LoginComponent, LandingComponent, EndowmentSharedAssetEditComponent, AnimalOrAgriculturalAssetComponent, BusinessEntityAssetComponent, FiscalAssetComponent, IntellectualPropertyAndTrademarkAssetComponent, MonetaryAssetComponent, MovableAssetComponent, ParticularBenefitAssetComponent, RealestateAssetComponent
  ],
  imports: [

    MultiSelectModule,
    BrowserModule,
    SharecomponentModule,
    PublicPortalSharedModule,
    CommonModule,
    AppRoutingModule,
    ButtonModule,
    CoreLibModule,
    ButtonModule,
    MessagesModule,
    NgbModule
  ],
  providers: [
    MessageService,
    AppMessageService,
    ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
