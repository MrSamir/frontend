import { Injectable } from '@angular/core';
import { AttachmentUpload, downloadFileInformation, fileOutput } from './file-uploader.model';
import { ServiceResponse, ServiceResponseArray } from '../../models/serviceResponse';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FileUploadEndpoingEnum } from './file-uploader.enum';
import { FileServiceServiceProxy } from '../../services/services-proxies/service-proxies';

@Injectable({
  providedIn: 'root'
})
export class FileUploaderService {


  constructor(private http: HttpClient, private FileService: FileServiceServiceProxy, private _requestTypeNavigation: RequestTypeNavigationService) { }


  //This will be used for the new services (each new service has a {ServiceName}FileController)
  //TODO Services not using FileService has to bee added to FileUploadEndpoingEnum
  getServiceRequestTypeNameById(id: number): string {
    const serviceRequestTypeNames = Object.keys(FileUploadEndpoingEnum).filter(key => isNaN(Number(key)));
    const serviceName = serviceRequestTypeNames.find(name => FileUploadEndpoingEnum[name] === id);
    return serviceName || 'FileService';
  }

  download(attachmentId: string, requestTypeId: number): Observable<ServiceResponse<downloadFileInformation>> {






    const endpointName = this._requestTypeNavigation.requestTypeDetailsNavigations.find(
      c => c.userType === null && c.actionType === ActionTypes.FileDownload && c.requestTypeId == requestTypeId
    );






    var urlTemplate = "/api/{endPointName}/GetFileById/" + attachmentId
    var requestTypeControllerName = this.getServiceRequestTypeNameById(requestTypeId);
    const url = `${urlTemplate.replace('{endPointName}', requestTypeControllerName)}`;

    //  return this.http.get<ServiceResponse<downloadFileInformation>>(`/api/SharepointFileService/GetShareFileById/${attachmentId}`);

    if (!requestTypeControllerName) {
      throw new Error(`Navigation detail not found for endpoint name.`);
    }
    return this.http.get<ServiceResponse<downloadFileInformation>>(url);




  }



  delete(attachmentId: string, requestTypeId: number ): Observable<ServiceResponse<boolean>> {


    const seerEndPointName = this._requestTypeNavigation.requestTypeDetailsNavigations.find(
      c => c.userType === null && c.actionType === ActionTypes.FileDelete && c.requestTypeId == requestTypeId
    );

    //Old Services
    if (seerEndPointName) {
      return this.FileService.deleteFile(attachmentId);
    }



    var urlTemplate = "/api/{endPointName}/DeleteFile/" + attachmentId
    var requestTypeControllerName = this.getServiceRequestTypeNameById(requestTypeId)
    const url = `${urlTemplate.replace('{endPointName}', requestTypeControllerName)}`;

    if (!requestTypeControllerName) {
      throw new Error(`Navigation detail not found for endpoint name.`);
    }
    return this.http.get<ServiceResponse<boolean>>(url);

  }

  uploadSingleFile(attachmentUpload: AttachmentUpload, serviceTypeId: number): Observable<ServiceResponse<fileOutput>> {
    let formData: FormData = new FormData();
    formData.append("file", attachmentUpload.file, attachmentUpload.file.name);
    // const formObjectBlob = new Blob([JSON.stringify(attachmentUpload.attachment)], { type: "application/json" });
    // formData.append("attachment", formObjectBlob);
    formData.append("serviceTypeId", attachmentUpload.serviceTypeId.toString());
    attachmentUpload.fileTypeId !== undefined ? formData.append("fileTypeId", attachmentUpload.fileTypeId.toString()) : null;

    const url = this._requestTypeNavigation.requestTypeDetailsNavigations.find(c => c.requestTypeId.toString() === formData.get("serviceTypeId").toString() && c.userType === null && c.actionType === ActionTypes.FileUpload);

    //Old Services
    if (url) {
      return this.http.post<ServiceResponse<fileOutput>>(url.url, formData);
    }

    else {
      //New Services
      var urlTemplate = "/api/{endPointName}/BrowseUploadFile"
      var endPointName = this.getServiceRequestTypeNameById(serviceTypeId)
      if (!endPointName) {
        throw new Error(`Navigation detail not found for endpoint name.`);
      }
      const url = `${urlTemplate.replace('{endPointName}', endPointName)}`;

      return this.http.post<ServiceResponse<fileOutput>>(url, formData);

    }
  }



  async uploadMultipleFile(attachmentUpload: AttachmentUpload[], serviceTypeId: number ): Promise<Observable<ServiceResponseArray<fileOutput>>> {
    let formData: FormData = new FormData();
    for (let file of attachmentUpload) {
      formData.append("file", file.file, file.file.name);
      formData.append("serviceTypeId", file.serviceTypeId.toString());
      formData.append("fileTypeId", file.fileTypeId.toString());
    }


    var urlTemplate = "/api/{endPointName}/BrowseUploadMultipleFiles"
    var endPointName = this.getServiceRequestTypeNameById(serviceTypeId)
    if (!endPointName) {
      throw new Error(`Navigation detail not found for endpoint name.`);
    }


    const url = `${urlTemplate.replace('{endPointName}', endPointName)}`;

    const response = await this.http.post<ServiceResponseArray<fileOutput>>(url, formData).toPromise();
    return of(response);
  }
}
