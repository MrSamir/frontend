import { Component, Input, OnInit } from "@angular/core";

import {
  CitizenInfoResponse, InputLookUpDto, LookupApplicationServiceServiceProxy, LookupExtraData
} from "../../../../../../public-portal/src/app/modules/shared/services/services-proxies/service-proxies";
import {EnumValidation} from "../../IDNumberWithValidation/EnumValidation";

@Component({
  selector: 'yakeen-citizen-view',
  templateUrl: './yakeen-citizen-view.html'
})
export class YakeenCitizenViewComponent implements OnInit {
  @Input() citizenInfoResponse: CitizenInfoResponse | undefined;

  ngOnInit(): void {
    // check if NationlaityId has value AND no name, then this case require a manual mapping
    // this case happens when the input param [citizenInfoResponse] is being passed as input, not as a response from GetCitizenInfo() API.

  }
}
