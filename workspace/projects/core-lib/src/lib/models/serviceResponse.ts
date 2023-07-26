export interface ServiceResponse<T> {
    data: T;
    isSuccess: boolean;
    errorData: Error[];
  }
  export interface ServiceResponseArray<T> {
    data: T[];
    isSuccess: boolean;
    errorData: Error[];
  }