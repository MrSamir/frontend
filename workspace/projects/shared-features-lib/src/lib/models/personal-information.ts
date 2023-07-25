import { DateTime } from "luxon";

export class PersonalInformation  {
    idNumber!: string | undefined;
    fullName!: string | undefined;
    birthDateGregorian!: DateTime | undefined;
    hijriBirthDate!: string | undefined;
    gender!: Gender | undefined;
    idTypeId!: number | undefined;
   
    email!: string | undefined;
    regionId!: number | undefined;
 
    cityId!: number | undefined;
   
    mobileNumber!: string | undefined;
    isEmailVerified!: boolean | undefined;
    isMobileNumberVerified!: boolean | undefined;
    educationLevelId!: number | undefined;
  
    validatedByYaqeen!: boolean | undefined;
    ownerId!: string | undefined;
    seerId!: string | undefined;
    agentId!: string | undefined;
    beneficiaryId!: string | undefined;
    firstNameEnglish!: string | undefined;
    secondNameEnglish!: string | undefined;
    thirdNameEnglish!: string | undefined;
    lastNameEnglish!: string | undefined;
    firstName!: string | undefined;
    secondName!: string | undefined;
    thirdName!: string | undefined;
    lastName!: string | undefined;
    idExpiryDate!: string | undefined;
    idIssueDate!: string | undefined;
    idIssuePlace!: string | undefined;
    placeOfBirth!: string | undefined;
    iqamaExpiryDateGregorian!: DateTime | undefined;
    iqamaIssueDateGregorian!: DateTime | undefined;
    iqamaIssuePlaceCode!: number | undefined;
    placeOfBirthCode!: number | undefined;
    lifeStatus!: number | undefined;
    nationalityId!: number | undefined;
    
    appUserId!: string | undefined;
 
    noIdentityReason!: string | undefined;
    id!: string | undefined;
    createdAt!: DateTime | undefined;
    createdBy!: string | undefined;
    updatedAt!: DateTime | undefined;
    updatedBy!: string | undefined;


}

export enum Gender {
    Male = "Male",
    Female = "Female",
}