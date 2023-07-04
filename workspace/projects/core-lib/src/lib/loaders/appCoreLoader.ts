import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { appCore } from '../Classes/appCore';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
})
export class appCoreLoader {
  constructor(private http: HttpClient) {

  }
  data :appCore = new appCore();
  load(configFilePath: string, appCoreModel?: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http.get(configFilePath).subscribe(
        response => {
          console.log('using server-side core data');
          this.data = Object.assign({}, appCoreModel || {}, response || {});
          resolve(this.data);
        },
        error => {
          console.log(`error loading config file: ${configFilePath}`);
          console.log(error);
          console.log('using default core data');
          this.data = Object.assign({}, appCoreModel || {});
          resolve(this.data);
        }
      );
    });
  }
  getLocalization() {
   return this.data.localization;
  }
  getSettings() {
    return this.data.settings;
   }
}

