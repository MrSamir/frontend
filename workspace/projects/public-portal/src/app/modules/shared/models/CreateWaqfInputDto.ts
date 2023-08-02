export class CreateWaqfInputDto implements ICreateWaqfInputDto {
    waqfName!: string;
    waqfTypeId!: number;
    awjuhElSarfIds!: number[];
    regionId!: number;
    cityId!: number;
    longitude!: number;
    latitude!: number;
    condition!: string | undefined;
    deedNumber!: string;
    deedDate!: string;
    deedRegionId!: number;
    deedCityId!: number;
    waqfInitialDate!: string;
    deedAttachmentId!: string;
    issuanceCourtId!: number;
    revenue!: number;
    acceptDonations!: boolean;
    acceptGiveaways!: boolean;
    requestId!: string;
    isDeedAttachmentChanged!: boolean | undefined;

    constructor(data?: ICreateWaqfInputDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
        if (!data) {
            this.awjuhElSarfIds = [];
        }
    }

    init(_data?: any) {
        if (_data) {
            this.waqfName = _data["waqfName"];
            this.waqfTypeId = _data["waqfTypeId"];
            if (Array.isArray(_data["awjuhElSarfIds"])) {
                this.awjuhElSarfIds = [] as any;
                for (let item of _data["awjuhElSarfIds"])
                    this.awjuhElSarfIds!.push(item);
            }
            this.regionId = _data["regionId"];
            this.cityId = _data["cityId"];
            this.longitude = _data["longitude"];
            this.latitude = _data["latitude"];
            this.condition = _data["condition"];
            this.deedNumber = _data["deedNumber"];
            this.deedDate = _data["deedDate"];
            this.deedRegionId = _data["deedRegionId"];
            this.deedCityId = _data["deedCityId"];
            this.waqfInitialDate = _data["waqfInitialDate"];
            this.deedAttachmentId = _data["deedAttachmentId"];
            this.issuanceCourtId = _data["issuanceCourtId"];
            this.revenue = _data["revenue"];
            this.acceptDonations = _data["acceptDonations"];
            this.acceptGiveaways = _data["acceptGiveaways"];
            this.requestId = _data["requestId"];
            this.isDeedAttachmentChanged = _data["isDeedAttachmentChanged"];
        }
    }

    static fromJS(data: any): CreateWaqfInputDto {
        data = typeof data === 'object' ? data : {};
        let result = new CreateWaqfInputDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["waqfName"] = this.waqfName;
        data["waqfTypeId"] = this.waqfTypeId;
        if (Array.isArray(this.awjuhElSarfIds)) {
            data["awjuhElSarfIds"] = [];
            for (let item of this.awjuhElSarfIds)
                data["awjuhElSarfIds"].push(item);
        }
        data["regionId"] = this.regionId;
        data["cityId"] = this.cityId;
        data["longitude"] = this.longitude;
        data["latitude"] = this.latitude;
        data["condition"] = this.condition;
        data["deedNumber"] = this.deedNumber;
        data["deedDate"] = this.deedDate;
        data["deedRegionId"] = this.deedRegionId;
        data["deedCityId"] = this.deedCityId;
        data["waqfInitialDate"] = this.waqfInitialDate;
        data["deedAttachmentId"] = this.deedAttachmentId;
        data["issuanceCourtId"] = this.issuanceCourtId;
        data["revenue"] = this.revenue;
        data["acceptDonations"] = this.acceptDonations;
        data["acceptGiveaways"] = this.acceptGiveaways;
        data["requestId"] = this.requestId;
        data["isDeedAttachmentChanged"] = this.isDeedAttachmentChanged;
        return data;
    }
}



export interface ICreateWaqfInputDto {
    waqfName: string;
    waqfTypeId: number;
    awjuhElSarfIds: number[];
    regionId: number;
    cityId: number;
    longitude: number;
    latitude: number;
    condition: string | undefined;
    deedNumber: string;
    deedDate: string;
    deedRegionId: number;
    deedCityId: number;
    waqfInitialDate: string;
    deedAttachmentId: string;
    issuanceCourtId: number;
    revenue: number;
    acceptDonations: boolean;
    acceptGiveaways: boolean;
    requestId: string;
    isDeedAttachmentChanged: boolean | undefined;
}
