import { Component, OnInit, ViewChild } from '@angular/core';
import { AspNetUser } from 'projects/public-portal/src/app/modules/shared/models/AspNetUser';
import { ApplicationUserServiceServiceProxy, EndowmentRegistrationServiceServiceProxy } from '../../../shared/services/services-proxies/service-proxies';
import { EndowmentApplicantEditComponent } from '../../../shared/components/endowment-applicant-edit/endowment-applicant-edit.component';

@Component({
  selector: 'app-endowment-registration-new',
  templateUrl: './endowment-registration-new.component.html'
})
export class EndowmentRegistrationNewComponent implements OnInit {

  constructor(private _serviceProxyApplicationUser:ApplicationUserServiceServiceProxy,private _serviceProxyEndowmentRegistraion:EndowmentRegistrationServiceServiceProxy) { }
  @ViewChild(EndowmentApplicantEditComponent, { static: false }) _applicantEditComponent!: EndowmentApplicantEditComponent;



  ngOnInit() {
    this.getLoggedInUserData();
  }

  
 _applicantData: AspNetUser = new AspNetUser();

  getLoggedInUserData(){


// this._serviceProxy.getByUserName()


    this._applicantData.FirstNameAr="محمد"
    this._applicantData.SecondNameAr="سمير"
    this._applicantData.ThirdNameAr="محمد"
    this._applicantData.LastNameAr="محمد"
    this._applicantData.IdNumber="2088755802"
    this._applicantData.BirthDateGregorian=new Date(Date.parse("01/08/1984"));


    this._applicantData.NationalityName="مصري"


    this._applicantData.IsAlive=true;
    this._applicantData.MobileNumber="2088755802"
    this._applicantData.Email="m.eldesouky.c@awqaf.gov.sa"
    this._applicantData.Gender=0;
    
  }

  InitiateRequest(){

    debugger
    if (this._applicantEditComponent.applicantForm.valid && this._applicantEditComponent.attorneyForm.valid) {
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


    }





  

}
