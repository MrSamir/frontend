// Define the TypeScript model for AspNetUsers
export class  AspNetUser {
    Id: string;
    UserType: number;
    IdNumber: string;
    FullName: string;
    BirthDateGregorian: Date;
    HijriBirthDate: string;
    Gender: number;
    IdTypeId: number;
    RegionId: number;
    CityId: number;
    MobileNumber: string;
    Email: string;
    FirstNameEn: string;
    ThirdNameEn: string;
    SecondNameEn: string;
    LastNameEn: string;
    FirstNameAr: string;
    SecondNameAr: string;
    ThirdNameAr: string;
    LastNameAr: string;
    IdExpiryDate: string;
    IdIssueDate: string;
    IdIssuePlace: string;
    PlaceOfBirth: string;
    IqamaExpiryDateGregorian: Date;
    IqamaIssueDateGregorian: Date;
    IqamaIssuePlaceCode: number;
    PlaceOfBirthCode: number;
    NationalityId: number;
    NationalityName: string;
    NoIdentityReason: number;
    ValidatedByYaqeen: boolean;
    IsAlive: boolean;
  }
  