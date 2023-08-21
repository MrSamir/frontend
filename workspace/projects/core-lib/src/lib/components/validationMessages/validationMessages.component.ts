import {
    Component,
  Injector,
  Input,
  OnInit,
  Renderer2,

} from '@angular/core';
import { ComponentBase } from '../ComponentBase/ComponentBase.component';
import {
  AbstractControl,
  FormControl,
  NgModel,
} from '@angular/forms';
import { AppValidationMessageModel } from '../../models/AppValidationMessageModel';
@Component({
  selector: 'app-validationMessages',
  templateUrl: './validationMessages.component.html',
  styleUrls: ['./validationMessages.component.css'],
})
export class ValidationMessagesComponent
  extends ComponentBase
  implements OnInit
{
  @Input() control:
    | FormControl<any>
    | AbstractControl<any, any>
    | NgModel
    | undefined;
  @Input() validationMessages: AppValidationMessageModel[] = [];
  @Input() relatedControlName: string;
  element: HTMLElement;
  messages: string[] = [];
  formcontrol: FormControl;
  constructor(
    injector: Injector,
    private renderer: Renderer2
  ) {
    super(injector);
  }

  ngOnInit() {
      this.element = document.getElementsByName(this.relatedControlName)[0];
      this.control?.valueChanges?.subscribe(() => {
        this.validateNgmodel();
      });
      this.control?.statusChanges?.subscribe((state) => {
        
        if ( this.control?.invalid) {
            this.element.classList.add('ng-invalid');
        }
      });
      this.element.addEventListener('focus', () => {
        if (this.control?.invalid) {
        
        }
      });
  }

  validateNgmodel() {
    this.messages = [];
    if (this.control?.untouched == false) {
      this.validationMessages.forEach((rule) => {
        
        if (this.isElementHasError(this.control!, rule!.ruleName)) {
          this.messages.push(rule.ruleMessage);
        }
      });
      if (this.control.valid && this.messages.length == 0)
        this.element.classList.remove('is-invalid');
      else if (this.control.invalid) this.element.classList.add('is-invalid');
    }
  }
  isElementHasError(
    control: NgModel | AbstractControl,
    errorName: string
  ): boolean {
    return control?.invalid && control.errors![errorName]!;
  }
}
