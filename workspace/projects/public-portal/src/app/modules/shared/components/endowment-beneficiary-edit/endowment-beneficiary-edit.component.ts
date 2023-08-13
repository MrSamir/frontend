import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AddBeneficiaryInputDto, LookupApplicationServiceServiceProxy, OutputBeneficiaryDto } from '../../services/services-proxies/service-proxies';
import { ArrayExtensions } from 'projects/core-lib/src/lib/helpers/array-extensions';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-endowment-shared-beneficiary-edit',
  templateUrl: './endowment-beneficiary-edit.component.html',
  styleUrls: ['./endowment-beneficiary-edit.component.css']
})
export class EndowmentBeneficiaryEditComponent {

  @Output() OnAddingNewBeneficiary = new EventEmitter<AddBeneficiaryInputDto>();
  @Output() OnEditingExistingBeneficiary = new EventEmitter<AddBeneficiaryInputDto>();
  @Output() OnDeletingExistingBeneficiary = new EventEmitter<{
    BeneficiaryToDelete: OutputBeneficiaryDto;
    index: number;
  }>();
  @Output() OnCancelClick = new EventEmitter();
  @Input() BeneficiaryList: OutputBeneficiaryDto[] = [];
  @Input() viewOnly: boolean = false;

  constructor(private modalService: NgbModal,private lookupssrv:LookupApplicationServiceServiceProxy){}

  get hasBenifiaries() {
    return (
      // !!this.requestId &&
      // this.essentialInfoForBeneficiaryTab &&
      ArrayExtensions.notEmpty(
        this.BeneficiaryList
      )
    );
  }

}
