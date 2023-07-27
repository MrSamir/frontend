import {Component, Input, OnInit } from "@angular/core";
import {CitizenInfoResponse} from "@app/dto/yakeen/citizenInfoResponse";
import {AlienInfoResponse} from "@app/dto/yakeen/alienInfoResponse";
import {translations} from "@app/model/translations";
import {PersonDto} from "@app/services/services-proxies/service-proxies";
import { IdType } from "@app/dto/IdType";

@Component({
  selector: 'yakeen-person-view',
  templateUrl: './yakeen-person-view.component.html'
})
export class YakeenPersonViewComponent implements OnInit {
  constructor() {
  }

  @Input() citizen: CitizenInfoResponse;
  @Input() alien: AlienInfoResponse;
  @Input() person: PersonDto;
  @Input() isCitizen: boolean;
  @Input() isHafeza:boolean;

  idTypeLables = [
    'هوية وطنية',
    'إقامة',
    'حفيظة نفوس',
    'اخرى'
  ];

  get selectedTypeName() {
    if( !this.citizen && !this.alien ) {
      return this.idTypeLables[0];
    }

    if(this.alien ){
      if(this.alien.idTypeId===IdType.NIN_OR_IQAMA||this.alien.idTypeId===IdType.NONE_OF_THE_ABOVE)
         return this.alien.idTypeId===IdType.NIN_OR_IQAMA? this.idTypeLables[IdType.NIN_OR_IQAMA-1]:this.idTypeLables[IdType.NONE_OF_THE_ABOVE-1];
    }



    return this.idTypeLables[ this.isCitizen ? 0 : 1];
  }

  get dateLabel() {
    if(this.isCitizen){
      return translations.dateOfBirthHijri;
    }else{
      if(this.alien.idTypeId === IdType.IQAMA_ONLY){
        return  translations.dateOfBirthGregorian;
      }else {
        return translations.dateOfBirthHijri;
      }
    }
  }

  get birthDate() {
    if(this.isCitizen){
      return this.citizen.dateOfBirthH ;
    }
    else{
      if(this.alien.idTypeId === IdType.IQAMA_ONLY){
        return this.alien.dateOfBirthG;
      }else {
        return this.alien.dateOfBirthHijri;
      }
    }
  }

  ngOnInit(): void {}

  get translations() {
    return translations;
  }
}
