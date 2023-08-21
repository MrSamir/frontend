 export class ValidationResultDetailsModel {
     errorCode: string;
      errorMessage: string;
   constructor() {}

   init(_data?: any) {
     if (_data) {
       this.errorCode = _data['errorCode'];
       this.errorMessage = _data['errorMessage'];
     }
   }

   static fromJS(data: any): ValidationResultDetailsModel {
     data = typeof data === 'object' ? data : {};
     let result = new ValidationResultDetailsModel();
     result.init(data);
     return result;
   }
 }