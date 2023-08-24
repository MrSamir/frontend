import { Component, Injector, Input, OnInit } from '@angular/core';
import { AccountProxy, AddBeneficiaryInputDto, ApiException, ApiResponseOfPagedResultDtoOfOutputBeneficiaryDto, EndowmentRegistrationServiceProxy, OutputBeneficiaryDto, RemoveBeneficiaryInputDto } from '../../../../shared/services/services-proxies/service-proxies';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ComponentBase } from 'projects/core-lib/src/lib/components/ComponentBase/ComponentBase.component';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-beneficiary-step',
  templateUrl: './beneficiary-step.component.html',
  styleUrls: ['./beneficiary-step.component.css']
})
export class BeneficiaryStepComponent extends ComponentBase implements OnInit {
  updated: boolean = false;
  @Input() public requestId: string;
  BeneficiaryList: OutputBeneficiaryDto[] = [];
  OneRequestSeer: RemoveBeneficiaryInputDto;
  constructor(
    private modalService: NgbModal,
    _injecter: Injector,
    private router: Router,
    private accountServiceProxy: AccountProxy,
    private formBuilder: FormBuilder,
    private endowmentRegistrationServiceProxy: EndowmentRegistrationServiceProxy,
    private activatedRoute: ActivatedRoute
  ) {

    super(_injecter);
  }
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
  }

 

  OnEditingExistingBeneficiary(updtedAwqafSeer: AddBeneficiaryInputDto) {

  }

  OnAddingNewBeneficiary(event: any) {
    this.updated = event;
  }



  OnEditingExistingSeer(event: any) {

  }

  OnDeletingExistingAsset(event: any) {

  }

}
function handleServiceProxyError(err: ApiException): void {
  throw new Error('Function not implemented.');
}

