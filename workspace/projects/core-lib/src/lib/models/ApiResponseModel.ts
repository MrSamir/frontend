import { ValidationResultMessageModel } from "./ValidationResultMessageModel";
export class ApiResponseModel {
  isSuccess: boolean;
  dto: any | undefined;
  message: string | undefined;
  validationResultMessages: ValidationResultMessageModel[] | undefined;
  static fromJS(data: any): ApiResponseModel {
    data = typeof data === 'object' ? data : {};
    let result = new ApiResponseModel();
    result.init(data);
    return result;
  }
  init(_data?: any) {
    if (_data) {
      this.isSuccess = _data['isSuccess'];
      this.dto = _data['dto'];
      this.message = _data['message'];
      if (Array.isArray(_data['validationResultMessages'])) {
        this.validationResultMessages = [] as any;
        for (let item of _data['validationResultMessages'])
          this.validationResultMessages!.push(
            ValidationResultMessageModel.fromJS(item)
          );
      }
    }
  }
}