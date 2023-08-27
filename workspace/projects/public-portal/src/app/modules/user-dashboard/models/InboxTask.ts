
export class InboxTask {
    recordFetchType: string;
    userName:string;
    userType:string;
    roleList:string[];
    pageSize:number | undefined;
    pageNumber:number;
    dataFields: any = {};
     isAssignedToManager: boolean = false;
   }