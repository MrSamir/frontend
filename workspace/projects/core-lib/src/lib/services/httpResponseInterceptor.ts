import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, tap } from "rxjs/operators";
import { throwError as observableThrowError, Observable } from 'rxjs';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpInterceptor,
  HttpStatusCode
} from '@angular/common/http';
import { ApiResponse } from '../models/apiResponse';
import { AppMessageService } from './app-message.service';



@Injectable()
export class HttpResponseInterceptor implements HttpInterceptor {

  constructor(private appMessageService: AppMessageService){}
  
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<ApiResponse>> {
    return next.handle(request).pipe(
      tap({
        next: (event) => {
          if (event instanceof HttpResponse) {
            this.appMessageService.showMessage('msg1','Hello, world!', 'success', 'Success Message');
         
            if (event.status == HttpStatusCode.Unauthorized) {
              this.appMessageService.showMessage('Unauthorized error','Unauthorized access!')
             // alert('Unauthorized access!')
            }
            else if (!event.body?.isSuccess) {
              alert(event.body?.message)
            }
          }
          return event;
        },
        error: (error) => {
          if (error.status === HttpStatusCode.Unauthorized) {
            alert('Unauthorized access!')
          }
          else if (error.status === HttpStatusCode.NotFound) {
            alert('Page Not Found!')
          }
        }
      }));
  }
}