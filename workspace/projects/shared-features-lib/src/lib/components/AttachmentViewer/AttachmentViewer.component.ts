import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
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
  @Input() @Output() Attachements: AttachementItem[];
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
  constructor(injector:Injector , private sanitizer: DomSanitizer) {
    super( injector);
  }

  ngOnInit() {}

  deleteAttachment(event: AttachementItem) {
    
    this.message.showMessage(MessageTypeEnum.Dialog, {
      dialogType: DailogType.OkCancel,
      message: this.l('Common.DeleteFileConfirm', event.fileName),
      header: this.l('Common.DeleteMessageHeader'),
      OkLabel: this.l('Common.yes'),
      CancelLabel: this.l('Common.no'),
     OnOK:()=>{
       this.OnAttachementRemove.emit(event);
     }, OnCancel:()=>{}
    }) ;
  }
  
  DownLoadAttachment(event: AttachementItem) {
     const filecontet=this.ConvertToBlob(event);
     const file = new File([filecontet],event.fileName, {
       type: event.ContentType,
     });
     fileSaver.saveAs(file);
  }
   showFileViewer(item:AttachementItem)
   {
     const newWindow = window.open('', '_blank');
     const iframeContent = `
      <html>
        <head>
          <title>${item.fileName}</title>
        </head>
        <body>
          <iframe src=${this.convertToSafeUrl(item)} width="800" height="600"></iframe>
        </body>
      </html>
    `;
     newWindow?.document.write(iframeContent);
     newWindow?.document.close();
   }
   convertToSafeUrl(item :AttachementItem)
   {
          const fileContet=this.ConvertToBlob(item);
  return  this.sanitizer.bypassSecurityTrustResourceUrl(
      URL.createObjectURL(fileContet)
    );
   }
   ConvertToBlob(item:AttachementItem)
   {
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
      this.images = [event.fileData];
    } else {
      this.showFileViewer(event);
    }
  }
}
