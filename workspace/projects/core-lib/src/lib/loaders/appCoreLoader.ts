//import {TranslateLoader} from '@ngx-translate/core';

import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { appCore } from '../Interfaces/appCore';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class CustomLoaderModule {
  constructor(private http: HttpClient) {

  }

  data :appCore = new appCore();
  load(configFilePath:string, appCoreModel?: any): Promise<any> {
    return new Promise<any>(resolve => {
      this.http.get(configFilePath).subscribe(
        response => {
          console.log('using server-side core data');
          this.data = Object.assign({}, appCoreModel || {}, response || {});
          resolve(this.data);
        },
        () => {
          console.log('using default core data');
          this.data = Object.assign({}, appCoreModel || {});
          resolve(this.data);
        }
      );
    });
  }
  getLocalization(langCountry: string) {
   return this.data.localization;
  }
  getSettings() {
    return this.data.settings;
   }
  //  getMessages() {
  //   return this.data.message;
  //  }

}

