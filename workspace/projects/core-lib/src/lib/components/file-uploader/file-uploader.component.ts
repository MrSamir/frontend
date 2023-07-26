import { Component, Input, OnInit } from '@angular/core';
import { areyousure, handleError, showError, showSuccess } from '../../services/alert/alert.service';
import { FileUploaderService } from './file-uploader.service';
import { ArrayExtensions } from '../../helpers/array-extensions';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { AttachmentUpload, downloadFileInformation, fileOutput } from './file-uploader.model';
import { ServiceResponse, ServiceResponseArray } from '../../models/serviceResponse';
import * as fileSaver from 'file-saver';
@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.css']
})
export class FileUploaderComponent implements OnInit {

  _files: AttachmentUpload[] = [];
  _newfiles: AttachmentUpload[] = [];

  @Input() allowedExtensions: Array<string>;

  @Input() maxFileSizeAllowedMB: number = 2.0;

  @Input() showDownloadButton: boolean = true;
  @Input() showOpenInNewtabButton: boolean = true;


  @Input() deleteFromUIOnly: boolean = true;


  @Input() showDeleteButton: boolean;

  @Input() allowMultipleFiles: boolean = false;
  @Input() required: boolean = true;

  @Input() objects: object[];
  @Input() showDropZone: boolean;

  @Input() keys: string[] = [];
  fileIds: string[] = [];

  // @Input() keys: string[] = [];

  @Input() fileDisplayName: string;
  @Input() endPointName: string;

  @Input() serviceTypeId: number;
  @Input() fileTypeId: number;
  @Input() showFileDrop: boolean = true;

  isFileDeleted: boolean = false;

  isOver = false;
  touched = false;

  constructor(private fileService: FileUploaderService) { }

  ngOnInit() {


  }

  get isInvalid() {


    return this.touched && this.invalidFildIds && this.required;

  }

  get invalidFildIds() {
    try {
      return (ArrayExtensions.isEmpty(this.objects) || !this.objects[0][this.keys[0]]);
    }
    catch (error) {
      return false;
    }

  }

  droppedOld(files: NgxFileDropEntry[]) {


    this.isOver = false;
    if (this._files.length == this.objects.length) {
      return;
    }
    for (let file of files) {
      const attachmentUpload = this.getAttachmentUpload(file);




      attachmentUpload.serviceTypeId = this.serviceTypeId;


      if (attachmentUpload.extensionError) {

        const fileNameExtension = attachmentUpload.fileName.substring(attachmentUpload.fileName.lastIndexOf('.')).toLowerCase();
        //ToDo
        // showError(translations.fileTypeDisallowed.replace('%', fileNameExtension));
        showError("FileTypeNotAllowed");
        break;
      }

      if (attachmentUpload.sizeError) {
        // showError(translations.maxFileSizeExceeded.replace('%', this.maxFileSizeAllowedMB.toString()));
        //ToDo
        showError("File Size Error");
        break;
      }
      if (!this.fileExists(attachmentUpload.fileName)) {
        this.touched = true;
        this._files.push(attachmentUpload);
      }
    }

    if (this.allowMultipleFiles) {
      this.uploadMultipleFiles();
    }
    else {
      this.uploadFiles();
    }

  }

  dropped(files: NgxFileDropEntry[]) {
    this._newfiles = [];

    this.isOver = false;
    // if (this._files.length == this.objects.length) {
    //   return;
    // }
    for (let file of files) {
      const attachmentUpload = this.getAttachmentUpload(file);




      attachmentUpload.serviceTypeId = this.serviceTypeId;
      attachmentUpload.fileTypeId = this.fileTypeId;

      if (attachmentUpload.extensionError) {
        const fileNameExtension = attachmentUpload.fileName.substring(attachmentUpload.fileName.lastIndexOf('.')).toLowerCase();

        const allowedExtensionsMessage = `${this.allowedExtensions.join(', ')}`;
        

        // showError(translations.fileTypeDisallowed.replace('%', '[' + allowedExtensionsMessage.replace(/\./g, '').toUpperCase() + ']'));
        showError("File Type Error");
        
        break;
      }

      if (attachmentUpload.sizeError) {
        //ToDo
        // showError(translations.maxFileSizeExceeded.replace('%', this.maxFileSizeAllowedMB.toString()));
        showError("File Size Error");
        break;
      }
      if (!this.fileExists(attachmentUpload.fileName)) {
        this.touched = true;
        this._files.push(attachmentUpload);
        this._newfiles.push(attachmentUpload);
      }
    }

    if (this.allowMultipleFiles) {
      this.uploadMultipleFiles();
    }
    else {
      this.uploadFiles();
    }

  }


  fileOver(event: any) {
    this.isOver = true;
  }

  fileLeave(event: any) {
    this.isOver = false;
  }

  deleteFile(index: number) {
    areyousure(() => {
      this._files.splice(index, 1);
      this.isFileDeleted = true;

      if (this.deleteFromUIOnly) {



        if (this.allowMultipleFiles) {
          this.objects.splice(index, 1)
        }
        else {
          this.objects[index][this.keys[0]] = undefined;
        }



      }

      else {
        this.fileService.delete(this.objects[index][this.keys[0]], this.serviceTypeId).subscribe((response) => {
          // this.isFileDeleted = true;


          if (this.allowMultipleFiles) {
            this.objects.splice(index, 1)
          }
          else {
            this.objects[index][this.keys[0]] = undefined;
          }
          return response;

        })
      }

    });
  }

  downloadFile(index: number) {


    if (!!this.objects[index][this.keys[0]]) {

      if (this.isFileDeleted) {
      }
      this.fileService.download(this.objects[index][this.keys[0]], this.serviceTypeId).subscribe(
        (response: ServiceResponse<downloadFileInformation>) => {
          //convering base64 to blobpart
          const b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
            const byteCharacters = atob(b64Data);
            const byteArrays = [];
            for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
              const slice = byteCharacters.slice(offset, offset + sliceSize);
              const byteNumbers = new Array(slice.length);
              for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
              }
              const byteArray = new Uint8Array(byteNumbers);
              byteArrays.push(byteArray);
            }

            const blob = new Blob(byteArrays, { type: contentType });
            return blob;
          }
          const blob = b64toBlob(response.data.fileContent, response.data.contentType)
          const file = new File([blob], this.objects[index][this.keys[0]], { type: response.data.contentType });
          fileSaver.saveAs(file);
        });
    }
  }



  openFileInNewTab(index: number) {
    if (!!this.objects[index][this.keys[0]]) {
      this.fileService.download(this.objects[index][this.keys[0]], this.serviceTypeId).subscribe(
        (response: ServiceResponse<downloadFileInformation>) => {
          //convering base64 to blobpart
          const b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
            const byteCharacters = atob(b64Data);
            const byteArrays = [];
            for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
              const slice = byteCharacters.slice(offset, offset + sliceSize);
              const byteNumbers = new Array(slice.length);
              for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
              }
              const byteArray = new Uint8Array(byteNumbers);
              byteArrays.push(byteArray);
            }

            const blob = new Blob(byteArrays, { type: contentType });
            return blob;
          }
          const blob = b64toBlob(response.data.fileContent, response.data.contentType)
          const file = new File([blob], this.objects[index][this.keys[0]], { type: response.data.contentType });
          const fileURL = URL.createObjectURL(file);
          window.open(fileURL, '_blank');
        });
    }
  }


  getAttachmentUpload(inputFile: NgxFileDropEntry): AttachmentUpload {
    let attachmentUpload: AttachmentUpload = new AttachmentUpload();
    const fileEntry = inputFile.fileEntry as FileSystemFileEntry;
    attachmentUpload.fileName = inputFile.relativePath;
    fileEntry.file((file: File) => {
      attachmentUpload.file = file;
      attachmentUpload.extensionError = this.hasFileExtensionError(attachmentUpload.fileName);
      attachmentUpload.sizeError = this.hasFileSizeError(attachmentUpload.file.size);
    });
    return attachmentUpload;
  }
  // getfundraisingAttachmentUpload(inputFile: NgxFileDropEntry): AttachmentUpload {
  //   let attachmentUpload: AttachmentUpload = new AttachmentUpload();
  //   const fileEntry = inputFile.fileEntry as FileSystemFileEntry;
  //   attachmentUpload.fileName = inputFile.relativePath;
  //   fileEntry.file((file: File) => {
  //     attachmentUpload.file = file;
  //     attachmentUpload.extensionError = this.hasFileExtensionError(attachmentUpload.fileName);
  //     attachmentUpload.sizeError = this.hasFileSizeError(attachmentUpload.file.size);
  //   });
  //   return attachmentUpload;
  // }

  hasFileSizeError(fileSize: number): boolean {
    const fileSizeMb = fileSize / (1024.0 * 1024.0);
    return fileSizeMb >= this.maxFileSizeAllowedMB;
  }

  hasFileExtensionError(fileName: string): boolean {
    const fileNameExtension = fileName.substring(fileName.lastIndexOf('.')).toLowerCase();
    return this.allowedExtensions.indexOf(fileNameExtension) < 0;
  }

  fileExists(fileName: string): boolean {
    return this._files.findIndex(f => f.fileName == fileName) > -1;
  }


  uploadFiles() {

    if (ArrayExtensions.isEmpty(this._files)) {
      return;
    }


    this._files.forEach((file, index) => {

     

      this.fileService.uploadSingleFile(file, this.serviceTypeId).subscribe(
        (res: ServiceResponse<fileOutput>) => {
          //ToDo 
          // showSuccess(translations.uploadSuccess);
          showSuccess("Uploaded Successfully...!!!");
          this.objects[index][this.keys[index]] = res.data.id;


        },
        err => {
          console.log('uploadFiles(err): ', err);
          err.error.errorData[0].message = "حدث خطأ! برجاء إعادة تحميل المرفق";
          handleError<fileOutput>(err.error)
        }
      );
    });


  }


  async uploadMultipleFiles() {

    if (ArrayExtensions.isEmpty(this._newfiles)) {
      return;
    }
    (await this.fileService.uploadMultipleFile(this._newfiles, this.serviceTypeId)).subscribe(
      (res: ServiceResponseArray<fileOutput>) => {
        //ToDo 
       
        showSuccess("Uploaded Successfully..!!");
        // this.objects = [];

        res.data.forEach((file, index) => {


          if (this.allowMultipleFiles) {


            this.objects.push(file);

          }
          else {
            this.objects[index][this.keys[index]] = res.data[index].id;
          }
        })
      },
      err => {
        handleError<fileOutput>(err.error)
      }
    );



  }
}
