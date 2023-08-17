import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { ComponentBase } from 'projects/core-lib/src/lib/components/ComponentBase/ComponentBase.component';
import { OutputFileDto } from 'projects/public-portal/src/app/modules/shared/services/services-proxies/service-proxies';

@Component({
  selector: 'lib-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.css'],
})
export class FileUploaderComponent extends ComponentBase implements OnInit {
  @Input() name: string;
  @Input() fileLabel: string = 'Attachement';
  @Input() showDisclaimer: Boolean = true;
  @Input() ExtraDisclaimer: string[]=[];
  @Input() maxFileSizeInMB: number = 5;
  @Input() allowedFileTypes: string = '.pdf,.doc,.docx,.txt,.png';
  @Input() showUploadProgressBar: boolean = true;
  @Input() showErrorMessage: boolean = true;
  @Input() MultipleFiles: boolean = false;
  @Input() showDownloadButton: boolean = true;
  @Input() ChooseLabel: string = 'Choose';
  @Input() uploadLabel: string = 'Upload';
  CancelLabel:string
  @Output() OnSelectFile = new EventEmitter<any>();
  @Output() OnUploadFile = new EventEmitter<any>();
  fileSizeIntext: string;
  invalidFileSizeMessageSummary: string;
  invalidFileSizeMessageDetail: string;
  invalidFileTypeMessageSummary: string;
  invalidFileTypeMessageDetail: string;
  invalidFileLimitMessageSummary: string;
  invalidFileLimitMessageDetail: string;
  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    
    this.name=this.name+"[]"
    this.fileSizeIntext = this.Util.formatBytes(
      this.maxFileSizeInMB * 1024 * 1024
    );
    this.invalidFileSizeMessageDetail = this.l('Common.FileSizeNotAllowed');
    this.invalidFileSizeMessageSummary = this.l(
      'Common.invalidFileSizeMessageSummary'
    );
    this.invalidFileTypeMessageSummary = this.l(
      'Common.invalidFileTypeMessageSummary'
    );
    this.invalidFileTypeMessageDetail = this.l(
      'Common.invalidFileTypeMessageDetail'
    );
    this.invalidFileLimitMessageSummary = this.l(
      'Common.invalidFileLimitMessageSummary'
    );
    this.invalidFileLimitMessageDetail = this.l(
      'Common.invalidFileLimitMessageDetail'
    );
    this.CancelLabel = this.l('Common.cancel');
    this.ChooseLabel = this.l('Common.Choose', this.fileLabel);
    this.uploadLabel = this.l('Common.Upload');
  }
  onFileSelect(event) {
    // Do something with the selected file, e.g., emit an event, upload to the server, etc.
      
    this.OnSelectFile.emit(event);
  }

  onFileUpload(event) {
    // Do something with the selected file, e.g., emit an event, upload to the server, etc.
    
    this.OnUploadFile.emit(event);
  }
}
