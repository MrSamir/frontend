import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
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
    private router: Router,
    private accountServiceProxy: AccountProxy,
    private formBuilder: FormBuilder,
    private requestApplicationServiceServiceProxy: RequestApplicationServiceProxy
  ) {
    super(_injecter);
  }
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
  }


  active = 1;

}
