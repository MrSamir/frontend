import { Component, Input, OnInit } from "@angular/core";
// import { translations } from "@app/model/translations";
// import {lifeStatusMap} from "@app/model/users/personalInformation.model";
// import {NationalityHelperService} from "@app/services/lookup/NationalityHelper.service";
import {
  AlienInfoResponse, InputLookUpDto, LookupApplicationServiceProxy, LookupExtraData
} from "../../../../../../public-portal/src/app/modules/shared/services/services-proxies/service-proxies";
import { EnumValidation } from "../../IDNumberWithValidation/EnumValidation";
import { cibUber } from "@coreui/icons";

@Component({
  selector: 'yakeen-alien-view',
  templateUrl: './yakeen-alien-view.html'
})
export class YakeenAlienViewComponent implements OnInit {
  @Input() alienInfo: AlienInfoResponse | undefined;
  ePatternValidation: typeof EnumValidation = EnumValidation;
  lookupfliter: InputLookUpDto = new InputLookUpDto();
  NationalityLookup: any = [];
  _lookupExtraData: LookupExtraData = new LookupExtraData();
  constructor(public lookupService: LookupApplicationServiceProxy) {
  }

  ngOnInit(): void {
    // check if NationlaityId has value AND no name, then this case require a manual mapping
    // this case happens when the input param [alienInfo] is being passed as input, not as a response from GetCitizenInfo() API.
    debugger;
    if (this.alienInfo?.awqafNatinaityId != undefined && this.alienInfo.nationalityNameAr == undefined) {
      this.LoadNationalities(this.alienInfo.awqafNatinaityId);

    }



  }
  LoadNationalities(Id: number) {
    this._lookupExtraData.dataName = "Id"
    this._lookupExtraData.dataValue = Id.toString();
    this.lookupfliter.lookUpName = "Nationality";
    this.lookupfliter.filters = [this._lookupExtraData];
    this.lookupService.getAllLookups(this.lookupfliter).subscribe(
      (data) => {
        this.NationalityLookup = data.dto.items;
        if (this.NationalityLookup != undefined && this.alienInfo) {
          var natInfo = this.NationalityLookup.filter(item => item.id === this.alienInfo?.awqafNatinaityId)[0];
          this.alienInfo.nationalityNameAr = natInfo ? natInfo?.name : '';
        }
        console.log(data);
      }
    );

  }
}
