import { Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { cibIntellijidea } from '@coreui/icons';
import { ComponentBase } from 'projects/core-lib/src/lib/components/ComponentBase/ComponentBase.component';

@Component({
  selector: 'app-endowment-registration-readonly',
  templateUrl: './endowment-registration-readonly.component.html',
  styleUrls: ['./endowment-registration-readonly.component.css'],
})
export class EndowmentRegistrationReadonlyComponent extends ComponentBase implements OnInit {
  requestId: string;
  constructor(injector: Injector, private activatedRoute: ActivatedRoute) {
    super(injector);
  }
  ngOnInit(): void {
    this.requestId = this.activatedRoute.snapshot.params['requestId'];
  }
}
