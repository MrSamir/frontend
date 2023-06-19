import { ValidationResultMessage } from "./validationResultMessage";

export class ApiResponse {
    constructor(public isSuccess: boolean, public message: string, public validationResultMessage:ValidationResultMessage) { }
}