import { ComponentBase } from 'projects/core-lib/src/lib/components/ComponentBase/ComponentBase.component';
import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountProxy, RequestApplicationServiceProxy, RequestOutputDto } from '../../../shared/services/services-proxies/service-proxies';
import { PrimengTableHelper } from 'projects/core-lib/src/lib/helpers/PrimengTableHelper';
import { LazyLoadEvent } from 'primeng/api';
 
import { ActionTypes, NavigationDetail } from 'projects/core-lib/src/lib/enums/navigationDetail.model';
import { ServiceRequestTypeEnum } from '../../../shared/models/ServiceRequestTypeEnum';

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
        console.log(res);
        
        this.primengTableHelper.records = res.dto.items as RequestOutputDto[];
        this.primengTableHelper.totalRecordsCount = res.dto.totalCount;

      }
    );
    this.primengTableHelper.hideLoadingIndicator();
  }

  


  // CompleteRequestMissingData(serialNumber: string, step: string, currentRequestId: string) {

  //   let paramsValues: string[] = [];

  //   const reqTypeId = 1;// this.requestTypes.find(req => req.requestTypeNameAr === requestType).id;

 
  //   paramsValues.push(currentRequestId);
  //   // paramsValues.push(step);

  //   if (serialNumber != undefined && serialNumber != null && serialNumber != '') {
  //     paramsValues.push(serialNumber);
  //   }

  //   const url: string = '/endowmentregistration/registrationform'

  //   return this.router.navigate([url, ...paramsValues]);
 

  // }

  redirectServiceAction(reqTypeId, actionTypeVal: ActionTypes, paramsValues: string[]) {
    const url: string | undefined = this.requestTypeDetailsNavigations.find(c => c.requestTypeId === reqTypeId && c.actionType === actionTypeVal)?.url;

    return this.router.navigate([url, ...paramsValues]);

  }

  CompleteRequestMissingData(serialNumber: string, step: string, currentRequestId: string) {

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

  ShowRequestData(currentRequestId: string) {

    let paramsValues: string[] = [];

    const reqTypeId = 1;// this.requestTypes.find(req => req.requestTypeNameAr === requestType).id;


    paramsValues.push(currentRequestId);

    return this.redirectServiceDetails(reqTypeId, paramsValues);

  }







  redirectServiceDetails(reqTypeId, paramsValues: string[]) {
    const url: string = '/endowmentregistration/details'

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


}
