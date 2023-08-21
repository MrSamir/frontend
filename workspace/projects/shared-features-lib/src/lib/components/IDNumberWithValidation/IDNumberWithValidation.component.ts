import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-IDNumberWithValidation',
  templateUrl: './IDNumberWithValidation.component.html',
  styleUrls: ['./IDNumberWithValidation.component.css']
})
export class IDNumberWithValidationComponent   {

  @Input()IsSaudi:boolean=true;
  IsIqama:boolean=false;
   IDNumberForm:FormGroup;
  constructor() {
    this.IDNumberForm = new FormGroup({
      userName: new FormControl('', [
        Validators.required,
        Validators.maxLength(10),
        Validators.pattern('^1[0-9]{9}$')
      ]),
      iqamaId: new FormControl('', [
        Validators.required,
        Validators.maxLength(10),
        Validators.pattern('^2[0-9]{9}$')
      ]),
    });
  }
getSelectedTypeName()
{
  if (this.IsSaudi) {
this.IsIqama=false;
    return 'هوية وطنية'
  }
  else{
    this.IsSaudi=false;
this.IsIqama=true;

    return 'إقامة'
  }
}




onSubmit() {
  // Handle form submission
}

}
