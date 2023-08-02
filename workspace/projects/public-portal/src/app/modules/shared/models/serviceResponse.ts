 
import { DateTime } from "luxon";

export interface ServiceResponse<T> {
  data: T;
  isSuccess: boolean;
  errorData: Error[];
}
export interface ServiceResponseArray<T> {
  data: T[];
  isSuccess: boolean;
  errorData: Error[];
}


export class EducationLevel implements IEducationLevel {
  isAttachmentRequired!: boolean | undefined;
  name!: string | undefined;
  id!: number | undefined;
  createdAt!: DateTime | undefined;
  createdBy!: string | undefined;
  updatedAt!: DateTime | undefined;
  updatedBy!: string | undefined;

  constructor(data?: IEducationLevel) {
      if (data) {
          for (var property in data) {
              if (data.hasOwnProperty(property))
                  (<any>this)[property] = (<any>data)[property];
          }
      }
  }

  init(_data?: any) {
      if (_data) {
          this.isAttachmentRequired = _data["isAttachmentRequired"];
          this.name = _data["name"];
          this.id = _data["id"];
          this.createdAt = _data["createdAt"] ? DateTime.fromISO(_data["createdAt"].toString()) : <any>undefined;
          this.createdBy = _data["createdBy"];
          this.updatedAt = _data["updatedAt"] ? DateTime.fromISO(_data["updatedAt"].toString()) : <any>undefined;
          this.updatedBy = _data["updatedBy"];
      }
  }

  static fromJS(data: any): EducationLevel {
      data = typeof data === 'object' ? data : {};
      let result = new EducationLevel();
      result.init(data);
      return result;
  }

  toJSON(data?: any) {
      data = typeof data === 'object' ? data : {};
      data["isAttachmentRequired"] = this.isAttachmentRequired;
      data["name"] = this.name;
      data["id"] = this.id;
      data["createdAt"] = this.createdAt ? this.createdAt.toString() : <any>undefined;
      data["createdBy"] = this.createdBy;
      data["updatedAt"] = this.updatedAt ? this.updatedAt.toString() : <any>undefined;
      data["updatedBy"] = this.updatedBy;
      return data;
  }
}

export interface IEducationLevel {
  isAttachmentRequired: boolean | undefined;
  name: string | undefined;
  id: number | undefined;
  createdAt: DateTime | undefined;
  createdBy: string | undefined;
  updatedAt: DateTime | undefined;
  updatedBy: string | undefined;
}
