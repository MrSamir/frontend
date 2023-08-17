import { ValidationResultDetailsModel } from "./ValidationResultDetailsModel";

 export class ValidationResultMessageModel {
   propertyName: string;
   validationResultDetails: Array<ValidationResultDetailsModel>;
   constructor() {}
   static fromJS(data: any): ValidationResultMessageModel {
     data = typeof data === 'object' ? data : {};
     let result = new ValidationResultMessageModel();
     result.init(data);
     return result;
   }

   init(_data?: any) {
     if (_data) {
       this.propertyName = _data['propertyName'];
       if (Array.isArray(_data['validationResultDetails'])) {
         this.validationResultDetails = [] as any;
         for (let item of _data['validationResultDetails'])
           this.validationResultDetails!.push(
             ValidationResultDetailsModel.fromJS(item)
           );
       }
     }
   }
 }