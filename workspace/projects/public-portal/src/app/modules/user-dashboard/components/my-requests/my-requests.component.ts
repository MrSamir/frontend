import { ComponentBase } from 'projects/core-lib/src/lib/components/ComponentBase/ComponentBase.component';
import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountServiceProxy, RequestApplicationServiceServiceProxy, RequestOutputDto } from '../../../shared/services/services-proxies/service-proxies';
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
    private accountServiceProxy: AccountServiceProxy,
    private formBuilder: FormBuilder,
    private requestApplicationServiceServiceProxy: RequestApplicationServiceServiceProxy
  ) {
    super(_injecter);
  }

  ngOnInit(): void {
    this.primengTableHelper = new PrimengTableHelper();
    this.loadMyRequests();
  }


  loadMyRequests(event?: LazyLoadEvent) {
  
    this.primengTableHelper.showLoadingIndicator();
    let skip = 0;
    let number = this.primengTableHelper.defaultRecordsCountPerPage;
    if (event != undefined) {
      debugger
      skip = event.first as number * event.rows;
      number = event.rows;
    }
    
    this.requestApplicationServiceServiceProxy.getMyRequests("RequestNumber", skip, number).subscribe(
      res => {
        debugger
        this.primengTableHelper.records = res.dto.items as RequestOutputDto[];
        this.primengTableHelper.totalRecordsCount = res.dto.totalCount;
        
      }
    );
    this.primengTableHelper.hideLoadingIndicator();
  }



}
