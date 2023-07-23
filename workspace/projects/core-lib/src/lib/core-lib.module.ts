import { NgModule } from '@angular/core';
 
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpResponseInterceptor } from './interceptors/httpResponseInterceptor';
import { LoadingInterceptor } from './interceptors/loading-interceptor';
import { SpinnerComponent } from './components/spinner/spinner-component';
import { BreadcrumbComponent } from 'projects/shared-features-lib/src/public-api';




@NgModule({
  declarations: [
 
  
   
      SpinnerComponent
  ],
  imports: [
    
  ],
  exports: [
    
    SpinnerComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpResponseInterceptor,
      multi: true
    },
  ]
})
export class CoreLibModule { }
