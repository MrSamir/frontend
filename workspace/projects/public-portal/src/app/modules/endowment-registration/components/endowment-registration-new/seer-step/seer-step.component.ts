import { Component, Input, OnInit } from '@angular/core';
import { AddSeerInputDto, AddSeerOutputDto, ApiException, ApiResponse, EndowmentRegistrationServiceServiceProxy, OutputSeerDto, RemoveSeerInputDto } from '../../../../shared/services/services-proxies/service-proxies';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-seer-step',
  templateUrl: './seer-step.component.html',
  styleUrls: ['./seer-step.component.css']
})
export class SeerStepComponent  implements OnInit {

  @Input() public requestId: string;
  seers: OutputSeerDto[] = [];
  OneRequestSeer: RemoveSeerInputDto;
  constructor(private registerWaqfService:EndowmentRegistrationServiceServiceProxy,private modalService: NgbModal){}

  ngOnInit(): void {
    //throw new Error('Method not implemented.');
  }

    // Passed new Seer from Common Seers Component in order to add it through calling API from Parent component
    OnAddingNewSeer(newAwqafSeer: AddSeerInputDto) {
      //this.setIsAttachmentChanged(newAwqafSeer);
      this.registerWaqfService.addSeer(
        newAwqafSeer
      ).subscribe(
        (data) => {
          if (data) {
            let resSeerData = data;
            if (resSeerData.isSuccess) {
              showSuccess('تم إنشاء الاصل بنجاح', () => {
                // console.log('res here: ', resSeerData);
                // this.newSeer.id = resSeerData.data.toString();
                // let obj = {Seer: resSeerData.data}
                this.modalService.dismissAll();
                this.getAllSeers();
              });
            }
          }
        },
        (err: ApiException) => {
          handleServiceProxyError(err);
        }
      );
    }
  
    // Passed Seer from Common Seers Component in order to delete it through calling API from Parent component
    OnDeletingExistingSeer(event: { SeerToDelete: OutputSeerDto; index: number }) {
      this.onDeleteTableCellClicked(event.SeerToDelete, event.index);
    }
  
    OnEditingExistingSeer(CurrentSeer: AddSeerInputDto) {
      CurrentSeer.requestId = this.requestId; //set request ID
      //this.setIsAttachmentChanged();
      this.registerWaqfService.editSeer(
        CurrentSeer
      ).subscribe(
        (data) => {
          let resp = data as ApiResponse;
          if (resp.isSuccess) {
            showSuccess('تم تعديل الاصل بنجاح', () => {
              this.modalService.dismissAll();
              this.getAllSeers();
            });
          }
        },
        (err: ApiException) => {
          handleServiceProxyError(err);
        }
      );
  
      this.modalService.dismissAll();
    }

    onDeleteTableCellClicked(seerToDelete: OutputSeerDto, index: number) {
      Swal.fire({
        title: 'تأكيد حذف أصل الوقف ؟',
        icon: 'question',
        confirmButtonText: 'متابعة',
        width: 600,
        padding: '3em',
        confirmButtonColor: '#D6BD81',
      }).then((result) => {
        if (result.isConfirmed) {
          this.OneRequestSeer = new RemoveSeerInputDto();
          this.OneRequestSeer.seerId = seerToDelete.seerId!;
          this.OneRequestSeer.requestId = this.requestId;
  
          this.registerWaqfService.removeSeer(
            this.OneRequestSeer
          ).subscribe((result) => {
            if (result.isSuccess) {
              this.getAllSeers();
              // showSuccess('تم حذف الاصل بنجاح',()=> {
              //   this.modalService.dismissAll();
              // });
              // showSuccess('تم حذف الاصل بنجاح', () => {
              //   this.modalService.dismissAll();
              // });
            } //else showError('تم حدوث خطأ');
          });
        }
      });
    }

    getAllSeers() {
      this.registerWaqfService.getSeersInformationByReqId(this.requestId).subscribe(
        (res:OutputSeerDto[]) =>
          (this.seers = res),
        (err: ApiException) => handleServiceProxyError(err)
      );
    }

}
function handleServiceProxyError(err: ApiException): void {
  throw new Error('Function not implemented.');
}

