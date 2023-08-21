import { AlienInfoResponse, CitizenInfoResponse, InputApplicationUserDto, OutputApplicationUserDto } from "projects/public-portal/src/app/modules/shared/services/services-proxies/service-proxies";

const fromPerson = (person: OutputApplicationUserDto): any => {
  return {
    dateOfBirthH: person?.birthDateHijri,
    //dateOfBirthHijri:person?.birthDateHijri,
    englishFirstName: person?.firstNameEn,
    englishLastName: person?.lastNameEn,
    englishSecondName: person?.secondNameEn,
    englishThirdName: person?.thirdNameEn,
    familyName: person?.lastNameAr,
    fatherName: person?.secondNameAr,
    firstName: person?.firstNameAr,
    gender: person?.gender?.toString(),
    grandFatherName: person?.thirdNameAr,
    idExpiryDate: person?.idExpiryDate,
    idIssueDate: person?.idIssueDate,
    idIssuePlace: person?.idIssuePlace,
    placeOfBirth: person?.placeOfBirth,
    lifeStatus: person?.isAlive != undefined && person?.isAlive ? 0 : person?.isAlive != undefined && !person?.isAlive ? 1 : null,
    logId: 1,
    idVersionNumber: 1,
    nationalityId: person?.nationalityId

  };
}

const citizenToPerson = (citizen: CitizenInfoResponse, personDto: InputApplicationUserDto) => {
  personDto.init(citizen);
  personDto.fullName = personDto.fullName;
  personDto.birthDateHijri = citizen.dateOfBirthH;
  personDto.birthDate = undefined;
}

export const CitizenUtilities = {
  fromPerson,
  citizenToPerson
};
