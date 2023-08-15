
import {
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export function isElementMissed(form: FormGroup, elementName: string): boolean {
  let element = form.controls[elementName];
  return element.touched && element.errors!['required']!;
}

export function isEmailNotValidFormat(form: FormGroup, elementName: string) {
  let element = form.controls[elementName];
  return element.touched && element.errors?.['email'];
}

export function isElementTooShort(form: FormGroup, elementName: string) {
  let element = form.controls[elementName];
  return element.touched && element.errors?.['minlength'];
}

export function isElementTooLong(form: FormGroup, elementName: string) {
  let element = form.controls[elementName];
  return element.touched && element.errors?.['maxlength'];
}

export function isElementInvalid(form: FormGroup, elementName: string) {
  let element = form.controls[elementName];
  return !!element && element.touched && element.invalid;
}

export function isElementTouched(form: FormGroup, elementName: string) {
  let element = form.controls[elementName];
  return !!element && element.touched;
}

export function isElementBlank(form: FormGroup, elementName: string) {
  let element = form.controls[elementName];
  return (
    !!element &&
    (element.value === '' ||
      element.value === undefined ||
      element.value === null)
  );
}

export function Rangvalidator(
  controlName: string,
  From: number,
  To: number,
  elementName: string
): boolean {
  // @ts-ignore
  const control = form.controls[controlName] as FormControl;

  if (control.value < From && control.value > To) {
    return control.touched && control.errors?.['required'];
  }
  return false;
}
