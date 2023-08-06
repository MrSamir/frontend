export class FileInputDto {
    FileName?: string;
    FileContent?: Blob;
    ServiceTypeId?: number;
    FileTypeId?: number;
    File?: File;
  }

  interface FileExtraData {
    key: string;
    value: string;
  }
  
  // FileParameter interface
  interface FileParameter {
    data: Blob | File;
    fileName: string;
  }
  
  