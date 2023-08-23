import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ComponentBase } from 'projects/core-lib/src/lib/components/ComponentBase/ComponentBase.component';
import { PrimengTableHelper } from 'projects/core-lib/src/lib/helpers/PrimengTableHelper';
import { AccountProxy, EndowmentOutputDto, InputLookUpDto, LookupApplicationServiceProxy, LookupDto, RequestApplicationServiceProxy, RequestOutputDto } from '../../../shared/services/services-proxies/service-proxies';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-my-awqafs',
  templateUrl: './my-awqafs.component.html',
  styleUrls: ['./my-awqafs.component.css']
})
export class MyAwqafsComponent extends ComponentBase implements OnInit {

  endowmentStatusLookup: LookupDto[] = [];
  lookupfliter: InputLookUpDto = new InputLookUpDto();
  primengTableHelper: PrimengTableHelper;

  constructor(
    _injecter: Injector,
    private router: Router,
    private accountServiceProxy: AccountProxy,
    private formBuilder: FormBuilder,
    private requestApplicationServiceServiceProxy: RequestApplicationServiceProxy,
    private lookupssrv: LookupApplicationServiceProxy
  ) {
    super(_injecter);
    this.loadEndowmentStatus();
  }

  private loadEndowmentStatus() {
    this.lookupfliter.lookUpName = "EndowmentStatus";
    this.lookupfliter.filters = [];
    this.lookupssrv.getAllLookups(this.lookupfliter).subscribe(
      (data) => {
        this.endowmentStatusLookup = data.dto.items!;


        console.log(data);

      });
  }

  ngOnInit(): void {
    this.primengTableHelper = new PrimengTableHelper();
  }

  loadMyEndowments(event?: LazyLoadEvent) {
    this.primengTableHelper.showLoadingIndicator();
    this.requestApplicationServiceServiceProxy.getMyEndowments("RequestNumber", event?.first || 0, event?.rows || this.primengTableHelper.defaultRecordsCountPerPage).subscribe(
      res => {
        this.primengTableHelper.records = res.dto.items as EndowmentOutputDto[];
        console.log(res.dto.items);
        this.primengTableHelper.totalRecordsCount = res.dto.totalCount;

      }
    );
    this.primengTableHelper.hideLoadingIndicator();
  }

  getSatus(statusId) {
    return this.endowmentStatusLookup.filter(c => c.id == 1)[0].name;
  }

}
