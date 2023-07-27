import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EnumValidation } from 'projects/core-lib/src/public-api';
 

@Component({
  selector: 'app-endowment-info-edit',
  templateUrl: './endowment-info-edit.component.html',
  styleUrls: ['./endowment-info-edit.component.css']
})
export class EndowmentInfoEditComponent implements OnInit {
  endowmentInfoForm: FormGroup;
  ePatternValidation = EnumValidation;
  lookupService: any[]=[{"name":"عام","value":"1"},{"name":"خاص","value":"2"}];
  awjuhElsarfs: any[]=[{"name":"مساجد","value":"1"},{"name":"مباني","value":"2"}];
  regions: any[]=[{"name":"مصر","value":"1"},{"name":"السعودية","value":"2"}];
  cityLookup: any[]=[{"name":"الرياض","value":"1"},{"name":"مكة","value":"2"}];
  constructor( public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.init_endowmentInfoForm();
  }

  private init_endowmentInfoForm() {
    this.endowmentInfoForm = this.formBuilder.group({
      endowmentName: ['', Validators.required],
      endowmentTypeId: ['', Validators.required],
      endowmentawjuhElSarfIds: ['', Validators.required],
      endowmentrevenue: ['', Validators.required,Validators.pattern(this.ePatternValidation.pattern_number)],
      endowmentacceptDonations: [''],
      endowmentacceptGiveaways: [''],
      regionId:[''],
      cityId:[''],
      condition:[''],
      deedNumber:['', Validators.required,Validators.pattern(this.ePatternValidation.pattern_arabic_number_forwardslash_char)],
      deedRegionId:['', Validators.required],
      deedCityId:['', Validators.required],
      
      
    });
  }

  get form() {
    return this.endowmentInfoForm.controls;
  }

 


}
