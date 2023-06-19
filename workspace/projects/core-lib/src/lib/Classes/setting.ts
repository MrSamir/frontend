import { settingScopes } from "./settingScopes";

export class setting {
  constructor() {
  }
  values: { [name: string]: string; } | undefined;

  settingScopes: settingScopes | undefined;

}
