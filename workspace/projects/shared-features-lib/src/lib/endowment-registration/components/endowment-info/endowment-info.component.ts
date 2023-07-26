import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-endowment-info',
  templateUrl: './endowment-info.component.html' 
  // styleUrls: ['./endowment-info.component.css']
})
export class EndowmentInfoComponent implements OnInit {
  endowmentInfoForm: FormGroup;
 
  lookupService: any[]=[{"name":"عام","value":"1"},{"name":"خاص","value":"2"}];
  awjuhElsarfs: any[]=[{"name":"مساجد","value":"1"},{"name":"مباني","value":"2"}];
 
  constructor( public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.init_endowmentInfoForm();
  }

  private init_endowmentInfoForm() {
    this.endowmentInfoForm = this.formBuilder.group({
      endowmentName: ['', Validators.required],
      endowmentTypeId: ['', Validators.required],
      endowmentawjuhElSarfIds: ['', Validators.required],
      endowmentrevenue: ['', Validators.required],
      
      
    });
  }

  get form() {
    return this.endowmentInfoForm.controls;
  }

 


}
