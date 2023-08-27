
export class AssignTaskInfoModel {
 serialNumber: string;
 actionName:string;
 impersonateUserName:string;
 dataFields: DataField;

 displayName:string;
 requestNumber: string;
 internalNote: string;
 externalNote: string;
 rejectionReason: string;
 rejectionReasonValue: string;
 uIOnly: boolean;
 requestStatus: string;
 actionDisplayName:string;
 requestId: string;
}

export class DataField {
  officerUserName: string;
  //officerUserManagerName:string;
  reviewerUserName: string;
  //reviewerUserManagerName :string;
  auditorUserName: string;
  //auditorUserManagerName :string;
  assignedGroupName: string;
  taskAssignedToUser: string;
  certifierUserName: string;
}

