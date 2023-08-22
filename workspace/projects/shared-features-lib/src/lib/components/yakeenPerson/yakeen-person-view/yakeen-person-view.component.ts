import {Component, Input, OnInit} from "@angular/core";
import {
  AlienInfoResponse,
  CitizenInfoResponse,
  IdType,
  InputApplicationUserDto,
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
  @Input() person: InputApplicationUserDto | undefined;
  @Input() isCitizen: boolean;
  @Input() isHafeza:boolean;
  lookupfliter:InputLookUpDto=new InputLookUpDto();
  @Input() IdTypeLookup:any=[];
  _lookupExtraData:   LookupExtraData=new LookupExtraData();

  idTypeLables = [
    'هوية وطنية',
    'إقامة',
    'حفيظة نفوس',
    'اخرى'
  ];

  get selectedTypeName() {
    if(this.isCitizen){
      return  this.idTypeLables[0] ;
    }
    else{
        return this.idTypeLables[1];
    }
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
