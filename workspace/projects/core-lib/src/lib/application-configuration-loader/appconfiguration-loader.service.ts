import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AppconfigurationLoaderService {

  data: any = {};

  constructor(private http: HttpClient) {}

  load(configFilePath:string, settingModel?: any): Promise<any> {
    return new Promise<any>(resolve => {
      this.http.get(configFilePath).subscribe(
        response => {
          console.log('using server-side configuration');
          this.data = Object.assign({}, settingModel || {}, response || {});
          resolve(this.data);
        },
        () => {
          console.log('using default configuration');
          this.data = Object.assign({}, settingModel || {});
          resolve(this.data);
        }
      );
    });
  }

}

