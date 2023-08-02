import { Component, Input, OnInit } from "@angular/core";
import { AlienInfoResponse } from "@app/dto/yakeen/alienInfoResponse";
import { translations } from "@app/model/translations";
import {lifeStatusMap} from "@app/model/users/personalInformation.model";
import {NationalityHelperService} from "@app/services/lookup/NationalityHelper.service";

@Component({
  selector: 'yakeen-alien-view',
  templateUrl: './yakeen-alien-view.html'
})
export class YakeenAlienView implements OnInit {
  @Input() alienInfo: AlienInfoResponse;
  constructor(private nationalityHelperService:NationalityHelperService) {
  }

  ngOnInit(): void {
    // check if NationlaityId has value AND no name, then this case require a manual mapping
    // this case happens when the input param [alienInfo] is being passed as input, not as a response from GetCitizenInfo() API.
    if(this.alienInfo.awqafNatinaityId && !this.alienInfo.nationalityNameAr){
      var natInfo = this.nationalityHelperService.getNationality(this.alienInfo.awqafNatinaityId);
      this.alienInfo.nationalityNameAr = natInfo ? natInfo.name : '';
    }



  }

  yakeenGender = {
    'M': 'ذكر',
    'F': 'أنثى',
    '0': 'ذكر',
    '1': 'أنثى'
  }

  get lifeStatus() {
    switch (this.alienInfo.lifeStatus) {
      case lifeStatusMap.Alive:
        return  translations.alive;
      case lifeStatusMap.Dead:
        return translations.dead;
      default:
        return translations.unknownLifeStatus
    }
  }

  get translations() {
    return translations;
  }

  get gender() {
    return this.yakeenGender[this.alienInfo.gender];
  }
}
