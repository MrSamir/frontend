/* import { AbstractControl, FormBuilder, FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class AppFormControl extends FormControl {
  validationMessages: AppValidationMessage[];

  constructor(formState: any = {}, validationOptions: AppValidationOption[]) {
    super(
      formState,
      validationOptions.map((vopt) => vopt.validator)
    );
       // Add custom messages
    this.setValidationMessages(validationOptions);
  }

  private setValidationMessages(validationOptions: AppValidationOption[]) {
     this.validationMessages = validationOptions.map((vopt) => {
       return {
        errorName:vopt.validator.name,
         message: vopt.message,
         flag: vopt.flag,
       };
     });
  }
}

/* export class AppFormBuilder extends FormBuilder{
    constructor(){
        super();
    }
}
 


export interface AppValidationOption {
  validator: ValidatorFn;
  message: string | ((value: any) => string);
  flag: () => boolean;
}
export interface AppValidationMessage {
  errorName:string | ((value: any) => string);
  message: string | ((value: any) => string);
  flag: () => boolean;
}*/ 
