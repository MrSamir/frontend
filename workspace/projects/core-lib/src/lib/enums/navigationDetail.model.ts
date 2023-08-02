export class NavigationDetail {
  requestTypeId: number;
  userType: string;
  url: string;
  actionType: ActionTypes
}

export enum ActionTypes {
  Returned,
  Completed,
  Details,
  FileUpload,
  FileDownload,
  FileDelete,
  GoToLanding
}

export enum EndpointName {
  FileInformation = 1,
  FundraisingFile = 6
}
