import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ComponentBase } from 'projects/core-lib/src/lib/components/ComponentBase/ComponentBase.component';
import { AccountProxy, RequestApplicationServiceProxy } from '../../../shared/services/services-proxies/service-proxies';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent extends ComponentBase implements OnInit {


  constructor(
    _injecter: Injector,
    private accountServiceProxy: AccountProxy,
    private formBuilder: FormBuilder,
    private requestApplicationServiceServiceProxy: RequestApplicationServiceProxy,
    private activatedRoute: ActivatedRoute

  ) {
    super(_injecter);
  }
  ngOnInit(): void {

    this.paramActive = this.activatedRoute.snapshot.params['activeTab'];
    if (this.paramActive != undefined) this.active = parseInt(this.paramActive);
    //throw new Error('Method not implemented.');
  }

  paramActive;
  active = 1;

}
