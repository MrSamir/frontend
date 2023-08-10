import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn} from "@angular/forms";

export class CustomValidators {
  public static patternValidator(nameRe: string, validationErrors: ValidationErrors): ValidatorFn {
    return CustomValidators.patternValidatorRegEx(new RegExp(nameRe), validationErrors);
  }

  public static patternValidatorRegEx(nameRe: RegExp, validationErrors: ValidationErrors): ValidatorFn {
    return (control: AbstractControl) : ValidationErrors | null => {
      if( !control.value  ) {
        return null;
      }
      let isMatch = nameRe.test(control.value);
      return isMatch ? null : validationErrors;
    }
  }

  public static matchValidator(controlName: string, matchingControlName: string, validationErrors: ValidationErrors): ValidatorFn {
    // @ts-ignore
    return (form: FormGroup): ValidationErrors | null => {
      const control = form.controls[controlName];
      const matchingControl  = form.controls[matchingControlName];
      if( control.value !== matchingControl.value) {
        return validationErrors;
      }
      return null;
    }
  }

  public static RangeValidatortest(controlName: string, matchingControlName: string, validationErrors: ValidationErrors): ValidatorFn {
    // @ts-ignore
    return (form: FormGroup): ValidationErrors | null => {
      const control = form.controls[controlName];
      const matchingControl  = form.controls[matchingControlName];
      if( control.value !== matchingControl.value) {
        return validationErrors;
      }
      return null;
    }
  }
  public static RangeValidator(min: number, max: number): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
        if ((c.value || c.value === 0) && (isNaN(c.value) || c.value < min || c.value > max)) {
            return { range: true };
        }
        return null;
    };
}

  // private dateRangeValidator: ValidatorFn = (): {
  //   [key: string]: any;
  // } | null => {
  //   let invalid = false;
  //   const from = this.fg && this.fg.get("from").value;
  //   const to = this.fg && this.fg.get("to").value;
  //   if (from && to) {
  //     invalid = new Date(from).valueOf() > new Date(to).valueOf();
  //   }
  //   return invalid ? { invalidRange: { from, to } } : null;
  // };


}
