import { AlienInfoResponse, InputApplicationUserDto, OutputApplicationUserDto } from "projects/public-portal/src/app/modules/shared/services/services-proxies/service-proxies";

const fromPerson = (person: OutputApplicationUserDto): any => {
  return {
    dateOfBirthG: person?.birthDate,
    //dateOfBirthHijri:person?.birthDateHijri,
    englishFirstName: person?.firstNameEn,
    englishLastName: person?.lastNameEn,
    englishSecondName: person?.secondNameEn,
    englishThirdName: person?.thirdNameEn,
    lastName: person?.lastNameAr,
    secondName: person?.secondNameAr,
    firstName: person?.firstNameAr,
    gender: person?.gender.toString(),
    thirdName: person?.thirdNameAr,
    iqamaExpiryDateG: person?.iqamaExpiryDateGregorian,
    iqamaIssueDateG: person?.iqamaIssueDateGregorian,
    iqamaIssuePlaceCode: person?.iqamaIssuePlaceCode != undefined ? parseInt(person?.iqamaIssuePlaceCode) : undefined,
    lifeStatus: person?.isAlive != undefined && person?.isAlive ? 0 : person?.isAlive != undefined && !person?.isAlive ? 1 : null,
    placeOfBirthCode: person?.placeOfBirthCode != undefined ? parseInt(person?.placeOfBirthCode) : undefined,
    logId: 1,
    iqamaVersionNumber: 1,
    awqafNatinaityId: person?.nationalityId ?? 0,
    nationalityNameAr: undefined,
    nationalityNameEn: undefined,
    placeOfBirthAr: undefined,
    placeOfBirthEn: undefined,
    nationalityCode: undefined,
    //noIdentityReason: person?.noIdentityReason,
    //idTypeId:person?.idTypeId
  };
}


const alientToPerson = (alien: AlienInfoResponse, personDto: InputApplicationUserDto) => {
  personDto.init(alien);
  personDto.fullName = personDto.fullName;
  personDto.birthDate = alien.dateOfBirthG;
  personDto.birthDateHijri = undefined;
  personDto.nationalityId = alien.awqafNatinaityId;
}
export const AlienUtilities = {
  fromPerson,
  alientToPerson
};
