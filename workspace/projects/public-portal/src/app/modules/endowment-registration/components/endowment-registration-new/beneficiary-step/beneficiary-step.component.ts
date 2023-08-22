import { Component, Input, OnInit } from '@angular/core';
import { AddBeneficiaryInputDto, ApiException, ApiResponseOfPagedResultDtoOfOutputBeneficiaryDto, EndowmentRegistrationServiceProxy, OutputBeneficiaryDto, RemoveBeneficiaryInputDto } from '../../../../shared/services/services-proxies/service-proxies';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-beneficiary-step',
  templateUrl: './beneficiary-step.component.html',
  styleUrls: ['./beneficiary-step.component.css']
})
export class BeneficiaryStepComponent implements OnInit{

  @Input() public requestId: string;
  BeneficiaryList: OutputBeneficiaryDto[] = [];
  OneRequestSeer: RemoveBeneficiaryInputDto;
  constructor(private registerWaqfService:EndowmentRegistrationServiceProxy,private modalService: NgbModal){}


  ngOnInit(): void {
    //throw new Error('Method not implemented.');
  }

  OnAddingNewBeneficiary(newAwqafBeneficiary: AddBeneficiaryInputDto)
  {
    this.registerWaqfService.addBeneficiary(
      newAwqafBeneficiary
    ).subscribe(
      (data) => {
        if (data) {
          let resSeerData = data;
          if (resSeerData.isSuccess) {
            //showSuccess('تم إنشاء الاصل بنجاح', () => {
              // console.log('res here: ', resSeerData);
              // this.newSeer.id = resSeerData.data.toString();
              // let obj = {Seer: resSeerData.data}
              //this.modalService.dismissAll();
              //this.getAllBeneficiaries();
            //});
          }
        }
      },
      (err: ApiException) => {
        handleServiceProxyError(err);
      }
    );
  }

  OnEditingExistingBeneficiary(updtedAwqafSeer: AddBeneficiaryInputDto)
  {

  }

  OnDeletingExistingBeneficiary(event: { BeneficiaryToDelete: OutputBeneficiaryDto; index: number })
  {

  }

  getAllBeneficiaries() {
    this.registerWaqfService.getBeneficiariesInformationByReqId(this.requestId).subscribe(
      (res:ApiResponseOfPagedResultDtoOfOutputBeneficiaryDto) =>
       console.log(),
      (err: ApiException) => handleServiceProxyError(err)
    );
  }

}
function handleServiceProxyError(err: ApiException): void {
  throw new Error('Function not implemented.');
}

