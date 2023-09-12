import * as ServiceProxy from './services-proxies/service-proxies';
import { NgModule, Optional, SkipSelf } from '@angular/core';

@NgModule({
  imports: [
    /*DccCommonsNgServicesModule*/
  ],
  declarations: [],
  providers: [
    ServiceProxy.FileLibraryApplicationServiceProxy,
    ServiceProxy.EndowmentRegistrationApplicationServiceProxy,
    ServiceProxy.LookupApplicationServiceProxy,
    ServiceProxy.ApplicationUserServiceProxy,
    ServiceProxy.YaqeenApplicationServiceProxy,
    ServiceProxy.RequestApplicationServiceProxy,
    ServiceProxy.EndowmentApplicationServiceProxy,
    ServiceProxy.FileLibraryApplicationServiceProxy,
    ServiceProxy.EndowmentRegistrationApplicationServiceProxy,
    ServiceProxy.LookupApplicationServiceProxy,
    ServiceProxy.ApplicationUserServiceProxy,
    ServiceProxy.FileLibraryApplicationServiceProxy,
    ServiceProxy.EndowmentRegistrationApplicationServiceProxy,
    ServiceProxy.AccountProxy,
    ServiceProxy.YaqeenApplicationServiceProxy,
    ServiceProxy.MojIntegrationApplicationServiceProxy,
    ServiceProxy.MojDataMigrationApplicationServicesProxy
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
