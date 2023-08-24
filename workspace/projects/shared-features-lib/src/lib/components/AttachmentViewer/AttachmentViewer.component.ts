import { Component, ElementRef, EventEmitter, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import * as fileSaver from 'file-saver';
import { ComponentBase } from 'projects/core-lib/src/lib/components/ComponentBase/ComponentBase.component';
import { MessageTypeEnum } from 'projects/core-lib/src/lib/enums/message-type';
import { DailogType, DialogModel } from 'projects/core-lib/src/lib/models/dialog';
export interface AttachementItem {
  id: string;
  fileData: string;
  fileName: string;
  ContentType: string;
}

@Component({
  selector: 'app-AttachmentViewer',
  templateUrl: './AttachmentViewer.component.html',
  styleUrls: ['./AttachmentViewer.component.css'],
})
export class AttachmentViewerComponent extends ComponentBase implements OnInit {
  @Input() Attachements: AttachementItem[];
  @Input() AttachmenetLabel: string = 'Viewer';
  @Input() ViewButtonLabel: string = 'View';
  @Input() DownloadButtonLabel: string = 'Download';
  @Input() DeleteButtonLabel: string = 'Deleted';
  @Input() IsSingleAttachement: boolean = true;
  @Input() ShowDownloadButton: boolean = true;
  @Input() showDeleteButton: boolean = true;
  @Output() OnAttachementRemove = new EventEmitter<AttachementItem>();
  imageViewerVisable: boolean = false;
  images: any[];
  safeurl: SafeResourceUrl;
  @ViewChild('fileViewer', { static: false })
  fileViewer: ElementRef<HTMLAnchorElement>;
  responsiveOptions: any[] = [
    {
      breakpoint: '1500px',
      numVisible: 5,
    },
    {
      breakpoint: '1024px',
      numVisible: 3,
    },
    {
      breakpoint: '768px',
      numVisible: 2,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
    },
  ];
  constructor(injector: Injector, private sanitizer: DomSanitizer) {
    super(injector);
  }

  ngOnInit() {
 
  }

  deleteAttachment(event: AttachementItem) {
    this.message.showMessage(MessageTypeEnum.Dialog, {
      dialogType: DailogType.OkCancel,
      message: this.l('Common.DeleteFileConfirm', event.fileName),
      header: this.l('Common.DeleteMessageHeader'),
      OkLabel: this.l('Common.yes'),
      CancelLabel: this.l('Common.no'),
      OnOK: () => {
        this.OnAttachementRemove.emit(event);
      },
      OnCancel: () => {},
    });
  }

  DownLoadAttachment(event: AttachementItem) {
    const filecontet = this.ConvertToBlob(event);
    const file = new File([filecontet], event.fileName, {
      type: event.ContentType,
    });
    fileSaver.saveAs(file);
  }
  showFileViewer(item: AttachementItem) {
    this.safeurl = this.convertToSafeUrl(item);
    
     this.loading.show()
  setTimeout(() => {
    this.loading.hide();
    this.fileViewer.nativeElement.click();
  }, 1000);

  
  }
  convertToSafeUrl(item: AttachementItem) {
    let fileContet=this.ConvertToBlob(item);
    let fileUrl=  window.URL.createObjectURL(fileContet);
    return this.sanitizer.bypassSecurityTrustResourceUrl(fileUrl);
  }
  ConvertToBlob(item: AttachementItem) {
    const byteCharacters = atob(item.fileData);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: item.ContentType });
  }
  ViewAttachment(event: AttachementItem) {
    
    if (event.ContentType.startsWith('image/')) {
        let url =this.convertToSafeUrl(event);
        this.loading.show();
         setTimeout(() => {
           this.loading.hide();
          this.images = [url];
          this.imageViewerVisable = true;
         }, 1000);
      
    } else {
      this.showFileViewer(event);
    }
  }
}
