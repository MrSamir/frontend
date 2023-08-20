import { DateTime } from "luxon";
import { AlienInfoResponse, CitizenInfoResponse, InputApplicationUserDto, OutputApplicationUserDto } from "projects/public-portal/src/app/modules/shared/services/services-proxies/service-proxies";
import { DateConvertTo } from "../components/ng-bootstrap-hijri-gregorian-datepicker/Pipes/dateConverter/date-converter.pipe";
import { convertToParamMap } from "@angular/router";
import * as moment from "moment";

export interface BeneficiaryOutKsa {
    firstNameAr: string;
    secondNameAr: string;
    thirdNameAr: string;
    lastNameAr: string;
  gender: string;
  userName: string;
  phoneNumber?: string;
  nationalityId: number;
  birthDate: string;
  idTypeId:number;
  phoneNumberConfirmed:boolean;
}


export const AwqafGenderToPlatformMap = {
  'M': 0,
  'F': 1
}

export function getPlatformGenderFromAwqaf(gender: string) {
  return AwqafGenderToPlatformMap[gender];
}

const fromPerson = (person: OutputApplicationUserDto): BeneficiaryOutKsa => {
  return {
    firstNameAr: person.firstNameAr!,
    secondNameAr: person.secondNameAr!,
    thirdNameAr: person.thirdNameAr!,
    lastNameAr: person.lastNameAr!,
    nationalityId: person.nationalityId!,
    birthDate: person.birthDate?.toString()!,
    gender: person.gender.toString(),
    userName: person.userName!,
    idTypeId: person.idTypeId!,
    phoneNumberConfirmed: person.phoneNumberConfirmed!,
    phoneNumber: person.phoneNumber
  };
}

const toPerson = (beneficiaryOutKsa: BeneficiaryOutKsa, personDto: InputApplicationUserDto) => {
  personDto.init(beneficiaryOutKsa);
  personDto.fullName = `${personDto.firstNameAr} ${personDto.secondNameAr} ${personDto.thirdNameAr} ${personDto.lastNameAr}`;
  personDto.birthDate =DateTime.now() ; //moment.(beneficiaryOutKsa.birthDate);
  personDto.nationalityId = beneficiaryOutKsa.nationalityId;
  personDto.birthDateHijri = undefined;
}

export const BeneficiaryUtilities = {
  fromPerson,
  toPerson
};
