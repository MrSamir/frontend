export class appCore {

  localization:localization | undefined;
  settings: setting | undefined;

}

  class languageInfo {

    name: string | undefined;
    isRightToLeft: boolean | undefined;

  }
  class localizationSource {

    name: string | undefined;
    type: string | undefined;

  }

  export class localization {

    languages: languageInfo[] | undefined;

    currentLanguage: languageInfo | undefined;

    sources: localizationSource[] | undefined;

    defaultSourceName: string | undefined;

    values: { [key: string]: { [key: string]: string; }; } | undefined;

  }

enum settingScopes {

      Application = 1,

      Tenant = 2,

      User = 4
    }
  export class setting {

    values: { [name: string]: string; } | undefined;

    settingScopes : settingScopes | undefined;

  }


  // export class message {

  //    info(message: string, title?: string, options?: any): any;

  //    success(message: string, title?: string, options?: any): any;

  //    warn(message: string, title?: string, options?: any): any;

  //    error(message: string, title?: string, options?: any): any;

  //    confirm(message: string, title?: string, callback?: (isConfirmed: boolean, isCancelled?: boolean) => void, options?: any): any;
  // }

