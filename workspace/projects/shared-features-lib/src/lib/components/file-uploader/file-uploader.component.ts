import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OutputFileDto } from 'projects/public-portal/src/app/modules/shared/services/services-proxies/service-proxies';

@Component({
  selector: 'lib-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.css']
})
export class FileUploaderComponent implements OnInit {
  @Input() maxFileSizeInMB: number = 5;
  @Input() allowedFileTypes: string = '.pdf,.doc,.docx,.txt';

  @Input() showCancelButton: boolean = true;
  @Input() showUploadButton: boolean = true;

  @Input() showUploadProgressBar: boolean = true;

  @Input() showErrorMessage: boolean = true;
  @Input() alllowMultipleFiles: boolean = true;
  @Input() serviceTypeId =0;
  
  @Input() showDownloadButton: boolean = true;

  @Output() _chooseFilesEvent = new EventEmitter<any>();
  @Output() _downloadFilesEvent = new EventEmitter<any>();
  @Output() _UploadFilesEvent = new EventEmitter<any>();

  @Output() _removeFilesEvent = new EventEmitter<any>();


  @Input() uploadedFiles :OutputFileDto[];

  constructor() { }

  ngOnInit() {
  }
  onFileSelect(event: any) {
    
    // Do something with the selected file, e.g., emit an event, upload to the server, etc.
 
 
    this._chooseFilesEvent.emit(event);
  }

  onFileUpload(event: any) {
    
    // Do something with the selected file, e.g., emit an event, upload to the server, etc.
 
 
    this._UploadFilesEvent.emit(event);
  }

  downloadFile(event: any) {
    // Do something with the selected file, e.g., emit an event, upload to the server, etc.
   
    this._downloadFilesEvent.emit(event);

  }

  removeFile(event: any) {
     

    this._removeFilesEvent.emit(event);
  }

 

}
