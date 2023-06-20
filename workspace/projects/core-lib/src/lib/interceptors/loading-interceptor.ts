import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {finalize, Observable} from "rxjs";
import {LoadingService} from "../services/loading.service";
import {Injectable} from "@angular/core";

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  private _pendingNetworkCalls: number = 0;
  private _completedNetworkCalls: number = 0;

  constructor(private readonly _loadingService: LoadingService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this._pendingNetworkCalls++;
    this._loadingService.show();

    return next.handle(req).pipe(
      finalize(() => {
        this._completedNetworkCalls++;
        if (this._completedNetworkCalls === this._pendingNetworkCalls) {
          this._completedNetworkCalls = 0;
          this._pendingNetworkCalls = 0;
          this._loadingService.hide();
        }
      })
    );
  }
}
