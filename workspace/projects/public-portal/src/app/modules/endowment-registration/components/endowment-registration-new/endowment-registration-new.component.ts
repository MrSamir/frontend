import { Component, OnInit } from '@angular/core';
import { AspNetUser } from 'projects/public-portal/src/app/modules/shared/models/AspNetUser';

@Component({
  selector: 'app-endowment-registration-new',
  templateUrl: './endowment-registration-new.component.html'
})
export class EndowmentRegistrationNewComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.getLoggedInUserData();
  }

  
 _applicantData: AspNetUser = new AspNetUser();

  getLoggedInUserData(){

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
}
