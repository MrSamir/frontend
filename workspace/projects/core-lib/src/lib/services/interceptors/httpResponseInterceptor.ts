import { Injectable } from '@angular/core';
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
import { ApiResponse } from '../../models/apiResponse';
import { AppMessageService } from '../app-message.service';
import { MessageTypeEnum } from '../../enums/message-type';
import { MessageSeverity } from '../../enums/message-severity';



@Injectable()
export class HttpResponseInterceptor implements HttpInterceptor {

  constructor(private appMessageService: AppMessageService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<ApiResponse>> {
    let errorMessage: string | undefined;
    return next.handle(request).pipe(
      tap({
        next: (event) => {
          if (event instanceof HttpResponse) {

            if (event.status == HttpStatusCode.Unauthorized) {
              errorMessage = 'Unauthorized access!';

            }
            else if (!event.body?.isSuccess) {
              errorMessage = event.body?.message;
            }

            if (errorMessage)
              this.appMessageService.showMessage(MessageTypeEnum.toast, { key: 'tl1', message: errorMessage, severity: MessageSeverity.Error, summary: 'Error' });

          }

          return event;
        },
        error: (error) => {
          if (error.status === HttpStatusCode.Unauthorized) {
            errorMessage = 'Unauthorized access!';
          }
          else if (error.status === HttpStatusCode.NotFound) {
            errorMessage = 'Not Found';
          }


          if (errorMessage)
            this.appMessageService.showMessage(MessageTypeEnum.toast, { key: 'tl1', message: errorMessage, severity: MessageSeverity.Error, summary: 'Error' });
        }
      }));
  }
}


