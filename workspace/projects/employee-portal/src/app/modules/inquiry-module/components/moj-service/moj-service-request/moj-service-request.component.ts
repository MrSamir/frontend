import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-moj-service-request',
  templateUrl: './moj-service-request.component.html',
  styleUrls: ['./moj-service-request.component.css']
})
export class MojServiceRequestComponent implements OnInit {
  attorneyInquiryFormGroup: FormGroup;
  @Output() showResult: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }
  check() {
    debugger;
    if (this.attorneyInquiryFormGroup.valid) {
      this.showResult.emit(true);
    }

    else {
      this.showResult.emit(false);
    }

  }




  createForm() {

    this.attorneyInquiryFormGroup = this.fb.group({

      attorneyNo: [, Validators.required],
      attorneyIdentityNo: [, Validators.required],



    });

  }

}
