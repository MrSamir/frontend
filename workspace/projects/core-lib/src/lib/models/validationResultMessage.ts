import { ValidationResultDetails } from "./validationResultDetails";

 export class ValidationResultMessage {
    constructor(public propertyName: string, public validationResultDetails: Array<ValidationResultDetails>) { }
}