import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'lib-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.css']
})
export class FileUploaderComponent implements OnInit {
  @Input() maxFileSizeInMB: number = 5;
  @Input() allowedFileTypes: string = '.pdf,.doc,.docx,.txt';

  @Input() showCancelButton:boolean =true;
  @Input() showUploadButton:boolean =true;

  @Input() showUploadProgressBar:boolean =true;

  @Input() showErrorMessage:boolean =true;
  @Input() alllowMultipleFiles :boolean=true;
 
@Input() showDownloadButton:boolean =true;

  @Output() _uploadedFilesEvent = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }
  onFileSelect(event: any) {
    const file = event.files[0];
    // Do something with the selected file, e.g., emit an event, upload to the server, etc.
console.log(file);
this._uploadedFilesEvent.emit(event);
  }

  

downloadFile(file: any) {
  // Do something with the selected file, e.g., emit an event, upload to the server, etc.
  console.log(file);
}

removeFile(file: any) {
  // Do something with the selected file, e.g., emit an event, upload to the server, etc.
  console.log(file);
}


  // async uploadMultipleFiles() {

  //   if (ArrayExtensions.isEmpty(this._newfiles)) {
  //     return;
  //   }
  //   (await this.fileService.uploadMultipleFile(this._newfiles, this.serviceTypeId)).subscribe(
  //     (res: ServiceResponseArray<fileOutput>) => {
  //       showSuccess(translations.uploadSuccess);
  //       // this.objects = [];

  //       res.data.forEach((file, index) => {


  //         if (this.allowMultipleFiles) {


  //           this.objects.push(file);

  //         }
  //         else {
  //           this.objects[index][this.keys[index]] = res.data[index].id;
  //         }
  //       })
  //     },
  //     err => {
  //       handleError<fileOutput>(err.error)
  //     }
  //   );

}
