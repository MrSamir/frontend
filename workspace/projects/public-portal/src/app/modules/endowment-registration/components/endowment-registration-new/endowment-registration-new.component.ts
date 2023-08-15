import { Component, OnInit, ViewChild } from '@angular/core';
import { AspNetUser } from 'projects/public-portal/src/app/modules/shared/models/AspNetUser';

import { EndowmentRegistrationServiceProxy } from '../../../shared/services/services-proxies/service-proxies';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-endowment-registration-new',
  templateUrl: './endowment-registration-new.component.html',
})
export class EndowmentRegistrationNewComponent implements OnInit {
  isEditMode = false;
  requestId: string;
  phaseId:number;
  constructor(
    private _serviceProxyEndowmentRegistraion: EndowmentRegistrationServiceProxy,
    private activeroute: ActivatedRoute
  ) {}
  

  ngOnInit() {
    this.checkisEditMode();
  }
  checkisEditMode() {
    this.requestId = this.activeroute.snapshot.params['requestId'];
    this.phaseId = parseInt(this.activeroute.snapshot.params['phaseId']);
    if(this.requestId!=undefined)
    this.isEditMode=true
  }

  

  InitiateRequest() {
    /*     if (this._applicantEditComponent.applicantForm.valid && this._applicantEditComponent.attorneyForm.valid) {
      console.log(this._applicantEditComponent.applicantForm.value);



  





    }
    else {

      console.log(this._applicantEditComponent.applicantForm.value)}

      this._serviceProxyEndowmentRegistraion.initiateEndowmentRegistrationRequest(this._applicantEditComponent.applicantform['isApplicantAsAgent'].value,this._applicantEditComponent.applicantForm.value).subscribe({

        next:(response)=>{

console.log(response);
        },
        error:(error)=>{

          console.log(error);

        },
        
        
           
        
          
        
        
          })
 */
  }
}
