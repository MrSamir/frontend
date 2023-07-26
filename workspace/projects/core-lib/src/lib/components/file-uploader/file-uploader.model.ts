import { ServiceResponse } from "../../models/serviceResponse";

export class AttachmentUpload {
    //Used for single record
    attachment: Attachment = new Attachment();
    //Used for multiply record
    attachments: Array<Attachment> = new Array<Attachment>();
    file: File;
    fileName: string;
    sizeError: boolean = false;
    extensionError: boolean = false;
    uploadingError: boolean = false;
    isUploaded: boolean = false;
    serviceTypeId: number;
    fileTypeId: number;
  }

  
export class Attachment {
    contentType: string
    fileName: string
    filePath: string
    id: string
  
    serviceResponse: ServiceResponse<Attachment>
  }
  
  export interface fileOutput {
    id: string;
    fileName: string;
    contentType: string;
    filePath: string;
  }
  export interface downloadFileInformation {
    fileName: string;
    fileContent: object;
    contentType: string;
  }
  