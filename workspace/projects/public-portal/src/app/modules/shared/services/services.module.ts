import * as ServiceProxy from './services-proxies/service-proxies';
import { NgModule, Optional, SkipSelf } from '@angular/core';



@NgModule({
  imports: [
    /*DccCommonsNgServicesModule*/
  ],
  declarations: [],
  providers: [
    ServiceProxy.FileLibraryApplicationServiceProxy,
    ServiceProxy.EndowmentRegistrationServiceProxy,
    ServiceProxy.LookupApplicationServiceProxy,
    ServiceProxy.AccountProxy,
    ServiceProxy.ApplicationUserServiceProxy,
    ServiceProxy.FileLibraryApplicationServiceProxy,
    ServiceProxy.EndowmentRegistrationServiceProxy,
    ServiceProxy.AccountProxy,
    ServiceProxy.YaqeenApplicationServiceProxy,
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
