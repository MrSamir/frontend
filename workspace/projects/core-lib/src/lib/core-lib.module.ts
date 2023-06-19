import { NgModule } from '@angular/core';
import { CoreLibComponent } from './core-lib.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpResponseInterceptor } from './services/httpResponseInterceptor';
import { ToastMessageModel } from './models/toast-message';
import { DialogModel } from './models/dialog';



@NgModule({
  declarations: [

  ],
  imports: [
  ],
  exports: [
    
  ],
  providers: [    
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpResponseInterceptor,
      multi: true
    },
  ]
})
export class CoreLibModule { }
