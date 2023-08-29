import { Component, Injector, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';
import { ComponentBase } from 'projects/core-lib/src/lib/components/ComponentBase/ComponentBase.component';
import { FormBuilder } from '@angular/forms';
import { PrimengTableHelper } from 'projects/core-lib/src/lib/helpers/PrimengTableHelper';
import { AccountProxy, RequestApplicationServiceProxy, RequestOutputDto } from '../../../shared/services/services-proxies/service-proxies';
import { ActionTypes, NavigationDetail } from 'projects/core-lib/src/lib/enums/navigationDetail.model';
import { ServiceRequestTypeEnum } from '../../../shared/models/ServiceRequestTypeEnum';
import { InboxTask } from '../../models/InboxTask';

@Component({
  selector: 'app-my-tasks',
  templateUrl: './my-tasks.component.html',
  styleUrls: ['./my-tasks.component.css']
})
export class MyTasksComponent extends ComponentBase implements OnInit {
  primengTableHelper: PrimengTableHelper;
  inboxTask: InboxTask = new InboxTask();
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




  loadMyTasks(event?: LazyLoadEvent) {
    this.primengTableHelper.showLoadingIndicator();
    this.requestApplicationServiceServiceProxy.getMyTasks("RequestNumber", event?.first || 0, event?.rows || this.primengTableHelper.defaultRecordsCountPerPage).subscribe(
      res => {
        this.primengTableHelper.records = res.dto.items as RequestOutputDto[];
        this.primengTableHelper.totalRecordsCount = res.dto.totalCount;

      }
    );
    this.primengTableHelper.hideLoadingIndicator();
  }




  CompleteRequestMissingData(serialNumber: string, step: string, currentRequestId: string) {
    debugger;

    let paramsValues: string[] = [];

    const reqTypeId = 1;// this.requestTypes.find(req => req.requestTypeNameAr === requestType).id;

    let actionType: ActionTypes = ActionTypes.Returned;// this.userType == UserTypeEnum.Employee? ActionTypes.Details:ActionTypes.Returned;

    paramsValues.push(currentRequestId);
    paramsValues.push(step);

    if (serialNumber != undefined && serialNumber != null && serialNumber != '') {
      paramsValues.push(serialNumber);
    }


    return this.redirectServiceAction(reqTypeId, actionType, paramsValues);

  }







  redirectServiceAction(reqTypeId, actionTypeVal: ActionTypes, paramsValues: string[]) {
    debugger;
    const url: string | undefined = this.requestTypeDetailsNavigations.find(c => c.requestTypeId === reqTypeId && c.actionType === actionTypeVal)?.url;

    return this.router.navigate([url, ...paramsValues]);

  }







  requestTypeDetailsNavigations: NavigationDetail[] =

    [

      {

        "requestTypeId": ServiceRequestTypeEnum.NewWaqf,

        "userType": "",

        "url": "/endowmentregistration/registrationform",

        "actionType": ActionTypes.Returned

      },



    ];











  LoadRequests(event?: LazyLoadEvent) {

    this.primengTableHelper.showLoadingIndicator();

    if (event != undefined) {
      this.inboxTask.pageNumber = event["page"] + 1;
      this.inboxTask.pageSize = event.rows;
    } else {
      this.inboxTask.pageSize = this.primengTableHelper.defaultRecordsCountPerPage;
    }


    // this.taskManagementService.getTasks(this.inboxTask).subscribe((res) => {


    //   //this.taskInfoList = res.data.worklistItems;
    //   this.primengTableHelper.totalRecordsCount = res.data.totalCount;


    //   this.primengTableHelper.records = res.data.worklistItems.sort((a,b)=>b.requestNumber.localeCompare(a.requestNumber));
    //   this.primengTableHelper.hideLoadingIndicator();


    // });
  }
}
