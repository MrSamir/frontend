import {Component, Input, OnInit} from "@angular/core";
import {
  AlienInfoResponse,
  CitizenInfoResponse,
  IdType,
  InputLookUpDto,
  LookupApplicationServiceServiceProxy,
  LookupExtraData,
  OutputApplicationUserDto
} from "../../../../../../public-portal/src/app/modules/shared/services/services-proxies/service-proxies";

@Component({
  selector: 'yakeen-person-view',
  templateUrl: './yakeen-person-view.component.html'
})
export class YakeenPersonViewComponent implements OnInit {
  constructor(public  lookupService: LookupApplicationServiceServiceProxy) {
  }

  @Input() citizen: CitizenInfoResponse;
  @Input() alien: AlienInfoResponse;
  @Input() person: OutputApplicationUserDto;
  @Input() isCitizen: boolean;
  @Input() isHafeza:boolean;
  lookupfliter:InputLookUpDto=new InputLookUpDto();
  IdTypeLookup:any=[];
  _lookupExtraData:   LookupExtraData=new LookupExtraData();

  // idTypeLables = [
  //   'هوية وطنية',
  //   'إقامة',
  //   'حفيظة نفوس',
  //   'اخرى'
  // ];
  //
  get selectedTypeName() {
    this.LoadIdTypes(this.person.idTypeId || 0);
    return this.IdTypeLookup[0].name;
  }

  // get dateLabel() {
  //   if(this.isCitizen){
  //     return translations.dateOfBirthHijri;
  //   }else{
  //     if(this.alien.idTypeId === IdType.IQAMA_ONLY){
  //       return  translations.dateOfBirthGregorian;
  //     }else {
  //       return translations.dateOfBirthHijri;
  //     }
  //   }
  // }

  LoadIdTypes(Id: number)
  {
    this._lookupExtraData.dataName="Id"
    this._lookupExtraData.dataValue=Id.toString();
    this.lookupfliter.lookUpName="IdTypes";
    this.lookupfliter.filters=[this._lookupExtraData];
    this.lookupService.getAllLookups(this.lookupfliter).subscribe(
      (data) => {
        this.IdTypeLookup=data.dto.items;
        console.log(data);
      }
    );

  }
  get birthDate() {
    if(this.isCitizen){
      return this.citizen.dateOfBirthH ;
    }
    else{
        return this.alien.dateOfBirthG;
    }
  }

  ngOnInit(): void {}
}
