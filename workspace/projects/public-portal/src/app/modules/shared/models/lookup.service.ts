import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";

 
import { LookupModel, LookupwithHintModel } from './LookupModel';
import { EnumLookuptypes } from './EnumLookuptypes';
import { EducationLevel, ServiceResponse } from './serviceResponse';
import { insideKsaIds, outsideKsaIds } from './IdType';

@Injectable({
  providedIn: 'root'
})
export class LookupService {
  lookupList: LookupModel[] | undefined;
  lookupwithhintList: LookupwithHintModel[] | undefined;
  insideKSAIdTypeLookups: LookupModel[] = [];
  outsideKSAIdTypeLookups: LookupModel[] = [];

  constructor(private http: HttpClient) {
  }

  getLookupValues(lookupName: string) {
    return this.http.get<any>(`/api/${lookupName}/GetAll`).pipe(
      map((data: any) => {
        this.lookupList = data;
        return of(this.lookupList);
      })
    )
  }
  getLookupValuesFromServiceResponseType(lookupName: string) {
    return this.http.get<any>(`/api/${lookupName}/GetAllAsServiceResponse`).pipe(
      map((data: ServiceResponse<LookupModel[]>) => {
        this.lookupList = data.data;
        return of(this.lookupList);
      })
    )
  }
  getLookupWithHintValues(lookupName: string) {
    return this.http.get<any>(`/api/${lookupName}/GetAll`).pipe(
      map((data: any) => {
        this.lookupwithhintList = data;
        return of(this.lookupwithhintList);
      })
    )
  }
  private applicantTypesLookup: LookupModel[] = undefined;
  public applicantTypesLookupsReverseMap: ReverseLookupMap = new ReverseLookupMap([]);

  private issuanceCourtLookup: LookupModel[] = undefined;
  public issuanceCourtReverseLookups: ReverseLookupMap = new ReverseLookupMap([]);

  private ownerTypeLookups: LookupwithHintModel[] = undefined;
  public ownerTypeLookupsReverseMap: ReverseLookupMap = new ReverseLookupMap([]);

  private seerTypeLookups: LookupwithHintModel[] = undefined;
  public seerTypeLookupsReverseMap: ReverseLookupMap = new ReverseLookupMap([]);

  private idTypeLookups: LookupModel[] = undefined;

  private nationalityLookups: LookupModel[] = undefined;
  private bankLookups: LookupModel[] = undefined;

  public nationalityLookupsReverseMap: ReverseLookupMap = new ReverseLookupMap([]);
  public bankLookupsReverseMap: ReverseLookupMap = new ReverseLookupMap([]);

  public idTypeLookupsReverseMap: ReverseLookupMap = new ReverseLookupMap([]);
  public sifaEtibariLookupsReverseMap: ReverseLookupMap = new ReverseLookupMap([]);
  public awjuhElsarfReverseMap: ReverseLookupMap = new ReverseLookupMap([]);
  public regionLookupsReverseMap: ReverseLookupMap = new ReverseLookupMap([]);
  public cityLookupsReverseMap: ReverseLookupMap = new ReverseLookupMap([]);

  public educationalLevelReverseMap: ReverseLookupMap = new ReverseLookupMap([]);
  public experienceYearReverseMap: ReverseLookupMap = new ReverseLookupMap([]);
  public blackListReasonReverseMap: ReverseLookupMap = new ReverseLookupMap([]);

  private assetSizeLookups: LookupModel[] = undefined;
  private sifaEtibariLookups: LookupModel[] = undefined;
  private educationLevelLookups: LookupModel[] = [];
  private blackListReasonLookups: LookupModel[] = undefined;
  private experienceYearLookups: LookupModel[] = undefined;
  private regionsLookups: LookupModel[] = undefined;
  private citiesLookups: LookupModel[] = undefined;
  private AssetSubType: LookupModel[] = undefined;
  private educationLevelList: EducationLevel[] = [];

  private waqfTypesLookups: LookupwithHintModel[] = undefined;
  public waqfTypesReverseLookups: ReverseLookupMap = new ReverseLookupMap([]);

  private OwnershipTransferReasonsLookups: LookupModel[] = undefined;
  public OwnershipTransferReasonsResverseLookups: ReverseLookupMap = new ReverseLookupMap([]);
  private awjuhElSarfLookups: LookupModel[] = undefined;
  public awjuhElSarfReverseLookups: ReverseLookupMap = new ReverseLookupMap([]);

  public get OwnershipTransferReasons() {
    return this.OwnershipTransferReasonsLookups;
  }
  public get awjuhElsarfs() {
    return this.awjuhElSarfLookups;
  }

  public get waqfTypes() {
    return this.waqfTypesLookups;
  }

  public get issuanceCourts() {
    return this.issuanceCourtLookup;
  }

  public get ownerTypes() {
    return this.ownerTypeLookups;
  }

  public get applicantTypes() {
    return this.applicantTypesLookup;
  }

  public get seerTypes() {
    return this.seerTypeLookups;
  }

  public get idTypes() {
    return this.idTypeLookups;
  }

  public get nationalities() {
    return this.nationalityLookups;
  }

  public get banks() {
    return this.bankLookups;
  }

  public idTypeName(idTypeValue: number) {
    return this.idTypeLookupsReverseMap[idTypeValue];
  }

  public get assetSizes() {
    return this.assetSizeLookups;
  }

  public get sifaEtibariType() {
    return this.sifaEtibariLookups;
  }

  public get educationLevels() {
    return this.educationLevelLookups;
  }
  public get blackListReasons() {
    return this.blackListReasonLookups;
  }

  public get experienceYears() {
    return this.experienceYearLookups;
  }

  public get regions() {
    return this.regionsLookups;
  }
  public get cities() {
    return this.citiesLookups;
  }

  fecthOwnershipTransferReasonsLookups() {
    if (!!this.OwnershipTransferReasonsLookups) {
      return;
    }

    this.getLookupValues(EnumLookuptypes.OwnershipTransferReasons).subscribe(
      (res: any) => {
        res.subscribe((res: LookupModel[]) => {
          this.OwnershipTransferReasonsLookups = res;
          this.OwnershipTransferReasonsResverseLookups = new ReverseLookupMap(this.OwnershipTransferReasonsLookups);
        }
        )
      }
    );
  }

  fetchAwjuhElsarfLookups() {
    if (!!this.awjuhElSarfLookups) {
      return;
    }
    this.getLookupValues(EnumLookuptypes.AwjuhElSarfLookup).subscribe((res: any) => {
      res.subscribe((res: LookupModel[]) => {
        this.awjuhElSarfLookups = res;
        this.awjuhElSarfReverseLookups = new ReverseLookupMap(this.awjuhElSarfLookups);
      });
    });
  }

  fetchApplicantTypes() {
    if (!!this.applicantTypesLookup) {
      return;
    }
    this.getLookupValues(EnumLookuptypes.ApplicantType).subscribe((res: any) => {
      res.subscribe((res: LookupModel[]) => {
        this.applicantTypesLookup = res;
        this.applicantTypesLookupsReverseMap.rebuild(this.applicantTypesLookup);
      });
    });
  }

  fetchOwnerTypeLookups() {

    if (!!this.ownerTypeLookups) {
      return;
    }
    this.getLookupWithHintValues(EnumLookuptypes.OwnerType).subscribe((res: any) => {
      res.subscribe((res: LookupwithHintModel[]) => {
        this.ownerTypeLookups = res;
        this.ownerTypeLookupsReverseMap.rebuild(this.ownerTypeLookups);
      });
    });
  }

  fetchSeerTypeLookups() {
    if (!!this.seerTypeLookups) {
      return;
    }
    this.getLookupWithHintValues(EnumLookuptypes.SeerType).subscribe((res: any) => {
      res.subscribe((res: LookupwithHintModel[]) => {
        this.seerTypeLookups = res;
        this.seerTypeLookupsReverseMap.rebuild(this.seerTypeLookups);
      });
    });
  }

  fetchSifaEtibariTypeLookups() {
    if (!!this.sifaEtibariLookups) {
      return;
    }
    this.getLookupValues(EnumLookuptypes.SifaEtibariType).subscribe((res: any) => {
      res.subscribe((res: LookupModel[]) => {
        this.sifaEtibariLookups = res;
        this.sifaEtibariLookupsReverseMap.rebuild(this.sifaEtibariLookups);

      });
    });
  }

  fetchIssuanceCourtLookups() {
    if (!!this.issuanceCourtLookup) {
      return;
    }
    this.getLookupValues(EnumLookuptypes.IssuanceCourtLookup).subscribe((res: any) => {
      res.subscribe((res: LookupModel[]) => {
        this.issuanceCourtLookup = res;
        this.issuanceCourtReverseLookups = new ReverseLookupMap(this.issuanceCourtLookup);
      });
    });
  }

  fetchtIdTypeLookups(onDone: () => void = undefined) {
    if (!!this.idTypeLookups) {
      if (!!onDone) {
        onDone();
      }
      return;
    }
    this.getLookupValues(EnumLookuptypes.IdTypeLookup).subscribe((res: any) => {
      res.subscribe((res: LookupModel[]) => {
        this.idTypeLookups = res;
        this.idTypeLookupsReverseMap = new ReverseLookupMap(this.idTypeLookups);
        this.bakeIdTypesLookups();
        if (!!onDone) {
          onDone();
        }
      });
    });
  }

  bakeIdTypesLookups() {
    this.insideKSAIdTypeLookups = this.idTypes.filter(idTypeItem => insideKsaIds.includes(idTypeItem.value));
    this.outsideKSAIdTypeLookups = this.idTypes.filter(idTypeItem => outsideKsaIds.includes(idTypeItem.value));
  }

  fetchtNationalityLookups(onDone: () => void) {
    if (!!this.nationalityLookups) {
      onDone();
      return;
    }
    this.getLookupValues(EnumLookuptypes.NationalityLookup).subscribe((res: any) => {
      res.subscribe((res: LookupModel[]) => {
        this.nationalityLookups = res;
        this.nationalityLookupsReverseMap = new ReverseLookupMap(this.nationalityLookups);
        onDone();
      });
    });
  }


  fetchtBankLookups() {
    if (!!this.bankLookups) {
      return;
    }
    this.getLookupValues(EnumLookuptypes.BankLookup).subscribe((res: any) => {
      res.subscribe((res: LookupModel[]) => {
        this.bankLookups = res;
        this.bankLookupsReverseMap = new ReverseLookupMap(this.bankLookups);
      });
    });
  }

  fetchWaqfTypeLookups() {
    if (!!this.waqfTypesLookups) {
      return;
    }
    this.getLookupValues(EnumLookuptypes.WaqfTypeLookup).subscribe((res: any) => {
      res.subscribe((res: LookupwithHintModel[]) => {
        this.waqfTypesLookups = res;
        this.waqfTypesReverseLookups = new ReverseLookupMap(this.waqfTypesLookups);
      });
    });
  }

  getCityByRegionID(regionId: number): Observable<LookupModel[]> {

    // return this.http.get<LookupModel[]>(`/api/CityLookup/GetAllByRegionId?regionId=${regionId}`);

   return  this.http.get<ServiceResponse<LookupModel[]>>(`/api/CityLookup/GetAllByRegionId?regionId=${regionId}`)
      .pipe(
        map((data: ServiceResponse<LookupModel[]>) => {
          this.lookupList = data.data;
         return this.lookupList;
        })
    );
  }

  fetchAssetSize() {
    if (!!this.assetSizeLookups) {
      return;
    }
    this.getLookupValues(EnumLookuptypes.AssetSizeLookup).subscribe((res: any) => {
      res.subscribe((res: LookupModel[]) => {
        this.assetSizeLookups = res;
      });
    });
  }

  fetchEducationLevelLookups() {
    if (this.educationLevelLookups.length > 0) {
      return;
    }
    this.getLookupValues(EnumLookuptypes.EducationLevel).subscribe((res: any) => {
      res.subscribe((res: EducationLevel[]) => {
        //this.educationLevelLookups = res;
        this.educationLevelList = [];
        this.educationLevelLookups = [];
        this.educationLevelList = res;
        this.educationLevelList.forEach(element => {
          this.educationLevelLookups.push(new LookupModel(element.id, element.name));
        });
        this.educationalLevelReverseMap.rebuild(this.educationLevelLookups);
      });
    });
  }
  fetchBlackListReasonLookups() {
    if (!!this.blackListReasonLookups) {
      return;
    }
    this.getLookupValues(EnumLookuptypes.BlackListReason).subscribe((res: any) => {
      res.subscribe((res: LookupModel[]) => {
        this.blackListReasonLookups = res;
        this.blackListReasonReverseMap.rebuild(this.blackListReasonLookups);
      });
    });
  }

  fetchExperienceYearLookups() {
    if (!!this.experienceYearLookups) {
      return;
    }
    this.getLookupValues(EnumLookuptypes.ExperienceYear).subscribe((res: any) => {
      res.subscribe((res: LookupModel[]) => {
        this.experienceYearLookups = res;
        this.experienceYearReverseMap.rebuild(this.experienceYearLookups);
      });
    });
  }


  fetchRegionsLookups() {
    if (!!this.regionsLookups) {
      return;
    }
    this.getLookupValuesFromServiceResponseType(EnumLookuptypes.RegionLookup).subscribe((res: any) => {
      res.subscribe((res: LookupModel[]) => {
        this.regionsLookups = res;
        this.regionLookupsReverseMap = new ReverseLookupMap(this.regionsLookups);
      });
    });
  }

  fetchCitiesLookups() {
    if (!!this.cities) {
      return;
    }
    this.getLookupValuesFromServiceResponseType(EnumLookuptypes.CityLookup).subscribe((res: any) => {
      res.subscribe((res: LookupModel[]) => {
        this.citiesLookups = res;
        this.cityLookupsReverseMap = new ReverseLookupMap(this.citiesLookups);
      });
    });
  }
  getAssetSubTypeByAssetTypeId(assetTypeId: number) {
    return this.http.get<LookupModel[]>('/api/AssetSubTypeLookup/GetByAssetTypeId?AssetTypeId=' + assetTypeId).pipe(
      map((data: LookupModel[]) => {

        this.lookupList = data;
        return of(this.lookupList);

      })
    );
  }
}

export class ReverseLookupMap {
  private reverseMap: { [value: number]: string } = {};

  public nameOf(id: number): string {
    return this.reverseMap[id];
  }

  public nameOfStr(id: string): string {
    return this.nameOf(parseInt(id));
  }

  private reverse() {
    for (const lookupItem of this.items) {
      this.reverseMap[lookupItem.value] = lookupItem.name;
    }
  }

  public rebuild(lookups: LookupModel[]) {
    this.items = lookups;
    this.reverse();
  }

  constructor(private items: LookupModel[]) {
    this.reverse();
  }
}
