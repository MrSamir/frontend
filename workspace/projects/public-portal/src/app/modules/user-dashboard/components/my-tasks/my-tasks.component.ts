import { Component, Injector, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';
import { ComponentBase } from 'projects/core-lib/src/lib/components/ComponentBase/ComponentBase.component';
import { AccountServiceProxy, RequestApplicationServiceServiceProxy, RequestOutputDto } from '../../../shared/services/services-proxies/service-proxies';
import { FormBuilder } from '@angular/forms';
import { PrimengTableHelper } from 'projects/core-lib/src/lib/helpers/PrimengTableHelper';

@Component({
  selector: 'app-my-tasks',
  templateUrl: './my-tasks.component.html',
  styleUrls: ['./my-tasks.component.css']
})
export class MyTasksComponent extends ComponentBase implements OnInit {
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
  }




  loadMyTasks(event?: LazyLoadEvent) {
    this.primengTableHelper.showLoadingIndicator();
    debugger
    this.requestApplicationServiceServiceProxy.getMyTasks("RequestNumber", event?.first || 0, event?.rows || this.primengTableHelper.defaultRecordsCountPerPage).subscribe(
      res => {
        debugger
        this.primengTableHelper.records = res.dto.items as RequestOutputDto[];
        this.primengTableHelper.totalRecordsCount = res.dto.totalCount;

      }
    );
    this.primengTableHelper.hideLoadingIndicator();
  }
}
