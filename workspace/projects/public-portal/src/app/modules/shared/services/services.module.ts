import * as ServiceProxy from './services-proxies/service-proxies';
import { NgModule, Optional, SkipSelf } from '@angular/core';
 


@NgModule({
  imports: [
    /*DccCommonsNgServicesModule*/
  ],
  declarations: [],
  providers: [
    ServiceProxy.FileLibraryApplicationServiceServiceProxy,
    ServiceProxy.EndowmentRegistrationServiceServiceProxy,
    ServiceProxy.LookupApplicationServiceServiceProxy,
    ServiceProxy.AccountServiceProxy,
    ServiceProxy.RequestApplicationServiceServiceProxy
  ],
})
export class ServicesProxyModule {
  constructor(@Optional() @SkipSelf() parentModule: ServicesProxyModule) {
    // Import guard
    if (parentModule) {
      throw new Error(
        `${parentModule} has already been loaded. Import Services module in the AppModule only.`
      );
    }
  }
}
