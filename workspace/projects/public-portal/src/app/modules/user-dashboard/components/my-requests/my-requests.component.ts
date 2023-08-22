import { ComponentBase } from 'projects/core-lib/src/lib/components/ComponentBase/ComponentBase.component';
import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import {  AccountProxy, RequestApplicationServiceProxy, RequestOutputDto } from '../../../shared/services/services-proxies/service-proxies';
import { PrimengTableHelper } from 'projects/core-lib/src/lib/helpers/PrimengTableHelper';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-my-requests',
  templateUrl: './my-requests.component.html',
  styleUrls: ['./my-requests.component.css']
})
export class MyRequestsComponent extends ComponentBase implements OnInit {
  primengTableHelper: PrimengTableHelper;

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
    this.primengTableHelper = new PrimengTableHelper();
  }


  loadMyRequests(event?: LazyLoadEvent) {
    this.primengTableHelper.showLoadingIndicator();
    this.requestApplicationServiceServiceProxy.getMyRequests("RequestNumber", event?.first || 0, event?.rows || this.primengTableHelper.defaultRecordsCountPerPage).subscribe(
      res => {
        this.primengTableHelper.records = res.dto.items as RequestOutputDto[];
        this.primengTableHelper.totalRecordsCount = res.dto.totalCount;

      }
    );
    this.primengTableHelper.hideLoadingIndicator();
  }



}
