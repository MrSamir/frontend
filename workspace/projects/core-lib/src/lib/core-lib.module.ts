import { NgModule } from '@angular/core';
 
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpResponseInterceptor } from './interceptors/httpResponseInterceptor';
import { LoadingInterceptor } from './interceptors/loading-interceptor';
import { SpinnerComponent } from './components/spinner/spinner-component';



@NgModule({
  declarations: [
 
  
    
      SpinnerComponent
  ],
  imports: [
    SpinnerComponent
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
