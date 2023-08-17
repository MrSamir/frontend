import { Injectable } from '@angular/core';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { throwError as observableThrowError, Observable, of } from 'rxjs';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpInterceptor,
  HttpStatusCode,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { ApiResponseModel} from '../models/ApiResponseModel';
import { AppMessageService } from '../services/message/app-message.service';
import { MessageTypeEnum } from '../enums/message-type';
import { MessageSeverity } from '../enums/message-severity';
import { UtilsService } from '../../public-api';
import { AppConfigSubjectService } from '../services/appConfigSubjectService';
import { MessageModel } from '../models/MessageModel';

@Injectable()
export class HttpResponseInterceptor implements HttpInterceptor {
  constructor(
    private appMessageService: AppMessageService,
    private utilservice: UtilsService,
    private appconifgsubject: AppConfigSubjectService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let errorMessage: string | undefined;
    var modifiedRequest = this.AddreqiuredHeaders(request);
    return next.handle(modifiedRequest).pipe(
      tap({
        next: (event) => {
          if (event instanceof HttpResponse) {
            if (event.status == HttpStatusCode.Unauthorized) {
              errorMessage = 'Unauthorized access!';
            } else if (!event.body?.isSuccess) {
              errorMessage = event.body?.message;
            }
            if (errorMessage) {
            }
          }
          return event;
        },
        error: (error: HttpErrorResponse) => {
          
          if (error.status === HttpStatusCode.Unauthorized) {
            errorMessage = 'Unauthorized access!';
          } else if (error.status === HttpStatusCode.NotFound) {
            errorMessage = 'Not Found';
          }
          if (error.status == HttpStatusCode.BadRequest) {
            this.utilservice
              .blobToText(error.error)
              .pipe(
                mergeMap((_responseText: string) => {
                  if (_responseText != '' && _responseText != undefined) {
                    return of(JSON.parse(_responseText));
                  } else return '';
                })
              )
              .subscribe((response: any) => {
                  let apiResponse =ApiResponseModel.fromJS(response);
                if (apiResponse.message) {
                  errorMessage = apiResponse.message;
                  if (
                    apiResponse.validationResultMessages != undefined &&
                    apiResponse.validationResultMessages.length > 0
                  )
                    apiResponse.validationResultMessages.forEach(
                      (verror, index) => {
                        verror.validationResultDetails.forEach((vdetail) => {
                          errorMessage = errorMessage
                            ?.concat(
                                vdetail.errorMessage
                            )
                        });
                      }
                    );
                } else {
                  errorMessage = response;
                }
                if (errorMessage) {
                  var message = new MessageModel();
                  message.closable = true;
                  message.detail = errorMessage;
                  message.severity = MessageSeverity.Warning;
                  message.summary = '';
                  this.appMessageService.showMessage(
                    MessageTypeEnum.toast,
                    message
                  );
                }
              });

            return;
          }
          if (errorMessage) {
            var message = new MessageModel();
            message.closable = true;
            message.detail = errorMessage;
            message.severity = MessageSeverity.Error;
            message.summary = 'Authntication Error';
            this.appMessageService.showMessage(
              MessageTypeEnum.message,
              message
            );
          }
        },
      })
    );
  }
  protected AddreqiuredHeaders(request: HttpRequest<any>) {
    var appConfig = this.appconifgsubject.getAppConfig();
    var token = this.utilservice.getCookieValue(appConfig.tokenCookieName);
    var currentLanguae = this.utilservice.getCookieValue(
      appConfig.langCookieName
    );

    var modifiedHeaders = new HttpHeaders();
    modifiedHeaders = request.headers
      .set('Pragma', 'no-cache')
      .set('Cache-Control', 'no-cache')
      .set('Expires', 'Sat, 01 Jan 2000 00:00:00 GMT')
      .set('X-Requested-With', 'XMLHttpRequest');
    if (token) {
      modifiedHeaders = modifiedHeaders.set('Authorization', `Bearer ${token}`);
    }
    if (currentLanguae) {
      modifiedHeaders = modifiedHeaders.set('Accept-Language', currentLanguae);
    }
    return request.clone({
      headers: modifiedHeaders,
    });
  }
  protected handleErrorResponse(error: any) {}
}

/*

*/
