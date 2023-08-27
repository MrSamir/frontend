import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from "@angular/router";
import { InboxTask } from '../models/InboxTask';
import { AssignTaskInfoModel } from '../models/assign-task-info.model';
 

const TASKS_KEY = "tasks";
const REQUESTS_KEY = "requests";

/**
 * Provides a base for authentication workflow.
 * The Credentials interface as well as login/logout methods should be replaced with proper implementation.
 */
@Injectable()
export class TaskManagementService {
  //public tasksObservable: BehaviorSubject<Array<TaskInfoModel>> = new BehaviorSubject<Array<TaskInfoModel>>([]);
  constructor(private router: Router, private http: HttpClient) {
  }

  getTasks(inboxTask : InboxTask) {
    return this.http.post<any>('/api/workflow/GetTaskList', inboxTask);
  }

  takeAction(assignmentInfo: AssignTaskInfoModel) {
    return this.http.post<any>('/api/workflow/TakeAction', assignmentInfo);
  }

  getTaskHistoryByRequestId(requestId : string) {
    return this.http.get<any>(`/api/workflow/GetTaskHistoryByRequestId/${requestId}`);
  }

  getTaskHistoryForApplicantByRequestId(requestId : string) {
    return this.http.get<any>(`/api/workflow/GetTaskHistoryForApplicantByRequestId/${requestId}`);
  }
  
 
}
