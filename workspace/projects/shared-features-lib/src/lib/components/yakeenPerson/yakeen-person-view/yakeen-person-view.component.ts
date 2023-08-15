import {Component, Input, OnInit} from "@angular/core";
import {
  AlienInfoResponse,
  CitizenInfoResponse,
  IdType,
  InputLookUpDto,
  LookupApplicationServiceProxy,
  LookupExtraData,
  OutputApplicationUserDto
} from "../../../../../../public-portal/src/app/modules/shared/services/services-proxies/service-proxies";

@Component({
  selector: 'yakeen-person-view',
  templateUrl: './yakeen-person-view.component.html'
})
export class YakeenPersonViewComponent implements OnInit {
  constructor(public  lookupService: LookupApplicationServiceProxy) {
  }

  @Input() citizen: CitizenInfoResponse | undefined;
  @Input() alien: AlienInfoResponse | undefined;
  @Input() person: OutputApplicationUserDto;
  @Input() isCitizen: boolean;
  @Input() isHafeza:boolean;
  lookupfliter:InputLookUpDto=new InputLookUpDto();
  @Input() IdTypeLookup:any=[];
  _lookupExtraData:   LookupExtraData=new LookupExtraData();

  get selectedTypeName() {
    return this.IdTypeLookup[0]?.name;
  }
  get birthDate() {
    if(this.isCitizen){
      return this.citizen?.dateOfBirthH ;
    }
    else{
        return this.alien?.dateOfBirthG;
    }
  }

  ngOnInit(): void {}
}
