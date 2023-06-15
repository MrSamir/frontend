import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  get(name: string): string {
      return appCore.setting.get(name);
  }

  getBoolean(name: string): boolean {
      return appCore.setting.getBoolean(name);
  }

  getInt(name: string): number {
      return appCore.setting.getInt(name);
  }

}
