import {Component, Input, OnInit} from '@angular/core';
import {WizardComponent} from "angular-archwizard";

@Component({
  selector: 'app-endowment-beneficiaries-list',
  templateUrl: './endowment-beneficiaries-list.component.html',
  styleUrls: ['./endowment-beneficiaries-list.component.css']
})
export class EndowmentBeneficiariesListComponent implements OnInit {
  @Input() waqfId: string;
  @Input() public requestId: string;
  @Input() viewOnly: boolean = false;
  @Input() public wizard: WizardComponent;
  constructor() { }

  ngOnInit() {
  }
  onBackBtnClicked() {
    this.wizard.goToPreviousStep();
  }

}
