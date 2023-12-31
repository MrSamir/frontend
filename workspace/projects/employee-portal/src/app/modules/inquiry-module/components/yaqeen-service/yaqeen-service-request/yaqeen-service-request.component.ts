import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-yaqeen-service-request',
  templateUrl: './yaqeen-service-request.component.html',
  styleUrls: ['./yaqeen-service-request.component.css']
})
export class YaqeenServiceRequestComponent implements OnInit {

  @Output() showResult: EventEmitter<boolean> = new EventEmitter<boolean>();
  identityTypeFormGroup: FormGroup;
  citizen = true;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }


createForm(){

  this.identityTypeFormGroup = this.fb.group({
    identityType: ['citizen', Validators.required],
    identityNo: [,Validators.required] ,
    iqamaNo: [] ,
    dob:[] ,
    dobHijri: [,Validators.required] 
     

  });

}

  check() {

    if (this.identityTypeFormGroup.valid){
      this.showResult.emit(true);
    }

    else{
      this.showResult.emit(false);
    }
    
  }

  identityTypeChange() {

    const identityType = this.identityTypeFormGroup.controls['identityType'].value;
    this.citizen = identityType === 'citizen';
    // Clear validators based on the radio button selection
    if (this.citizen) {
      this.identityTypeFormGroup.controls['dob'].clearValidators();
      this.identityTypeFormGroup.controls['iqamaNo'].clearValidators();

      this.identityTypeFormGroup.controls['dobHijri'].setValidators(Validators.required);
      this.identityTypeFormGroup.controls['identityNo'].setValidators(Validators.required);
    } else {
      this.identityTypeFormGroup.controls['dob'].setValidators(Validators.required);
      this.identityTypeFormGroup.controls['iqamaNo'].setValidators(Validators.required);
      this.identityTypeFormGroup.controls['dobHijri'].clearValidators();
      this.identityTypeFormGroup.controls['identityNo'].clearValidators();
    }
  
    // Update the validation status
    this.identityTypeFormGroup.controls['dob'].updateValueAndValidity();
    this.identityTypeFormGroup.controls['dobHijri'].updateValueAndValidity();
    this.identityTypeFormGroup.controls['iqamaNo'].updateValueAndValidity();
    this.identityTypeFormGroup.controls['identityNo'].updateValueAndValidity();
  }
}
