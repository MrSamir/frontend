import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreLibModule } from 'projects/core-lib/src/public-api';
import { EndowmentSeersListComponent } from '../components/endowment-seers-list/endowment-seers-list.component';
import { EndowmentBeneficiariesListComponent } from '../components/endowment-beneficiaries-list/endowment-beneficiaries-list.component';
import { EndowmentEndowersListComponent } from '../components/endowment-endowers-list/endowment-endowers-list.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { SharecomponentModule } from "../../modules/sharecomponent.module";
import { TableModule } from 'primeng/table';
import { SvgIconModule } from '../../modules/svg-icon.module';
import { Dropdown, DropdownModule } from 'primeng/dropdown';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CoreLibModule,
    MultiSelectModule,
    SharecomponentModule,
    FormsModule,
    TableModule,
    SvgIconModule,
    DropdownModule
  ],
  exports: [
    CommonModule,


    EndowmentEndowersListComponent,
    EndowmentBeneficiariesListComponent,
    EndowmentSeersListComponent




  ],
  declarations: [

    EndowmentEndowersListComponent,

    EndowmentSeersListComponent,
    EndowmentBeneficiariesListComponent,



  ]
})
export class EndowmentRegistrationSharedModule { }
