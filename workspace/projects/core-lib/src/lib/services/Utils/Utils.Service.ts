
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  //#region ObjectMapper
  /* fillObject<T, U>(source: object, target:Object): U {
    for (const key in Object.keys(target)) {
      if (source[key]) {
        target[key] = source[key];
      }
    }
    return target as U;
  } */
  //#endregion

   blobToText(blob: any): Observable<string> {
    return new Observable<string>((observer: any) => {
        if (!blob) {
            observer.next("");
            observer.complete();
        } else {
            let reader = new FileReader();
            reader.onload = event => {
                observer.next((event.target as any).result);
                observer.complete();
            };
            reader.readAsText(blob);
        }
    });
  }
  //#region  Cookies
  formatBytes(bytes, decimals = 2) {
    if (!+bytes) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = [
      'Bytes',
      'KB',
      'MB',
      'GB',
      'TB',
      'PB',
      'EB',
      'ZB',
      'YB',
    ];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  }

  getCookieValue(key: string): string {
    var equalities = document.cookie.split('; ');
    for (var i = 0; i < equalities.length; i++) {
      if (!equalities[i]) {
        continue;
      }

      var splitted = equalities[i].split('=');
      if (splitted.length != 2) {
        continue;
      }

      if (decodeURIComponent(splitted[0]) === key) {
        return decodeURIComponent(splitted[1] || '');
      }
    }

    return '';
  }

  setCookieValue(
    key: string,
    value: string,
    expireDate?: Date,
    path?: string,
    domain?,
    attributes?
  ): void {
    var cookieValue = encodeURIComponent(key) + '=';

    if (value) {
      cookieValue = cookieValue + encodeURIComponent(value);
    }

    if (expireDate) {
      cookieValue = cookieValue + '; expires=' + expireDate.toUTCString();
    }

    if (path) {
      cookieValue = cookieValue + '; path=' + path;
    }

    if (domain) {
      cookieValue = cookieValue + '; domain=' + domain;
    }

    for (var name in attributes) {
      if (!attributes[name]) {
        continue;
      }

      cookieValue += '; ' + name;
      if (attributes[name] === true) {
        continue;
      }

      cookieValue += '=' + attributes[name].split(';')[0];
    }
    this.deleteCookie(key, path);
    document.cookie = cookieValue;
  }

  deleteCookie(key: string, path?: string): void {
    var cookieValue = encodeURIComponent(key) + '=';

    cookieValue =
      cookieValue +
      '; expires=' +
      new Date(new Date().getTime() - 86400000).toUTCString();

    if (path) {
      cookieValue = cookieValue + '; path=' + path;
    }

    document.cookie = cookieValue;
  }
  //#endregion
  //#region  Strings
  replaceAll(str, search, replacement) {
    var fix = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return str.replace(new RegExp(fix, 'g'), replacement);
  }
  formatString(str,args?:any) {
    if (args.length < 1) {
      return '';
    }
    for (var i = 0; i < args.length; i++) {
      var placeHolder = '{{' + (i) + '}}';
      str = this.replaceAll(str, placeHolder, args[i]);
    }

    return str;
  }
  toPascalCase(str) {
    if (!str || !str.length) {
      return str;
    }

    if (str.length === 1) {
      return str.charAt(0).toUpperCase();
    }

    return str.charAt(0).toUpperCase() + str.substr(1);
  }
  toCamelCase(str) {
    if (!str || !str.length) {
      return str;
    }

    if (str.length === 1) {
      return str.charAt(0).toLowerCase();
    }

    return str.charAt(0).toLowerCase() + str.substr(1);
  }
  truncateString(str, maxLength) {
    if (!str || !str.length || str.length <= maxLength) {
      return str;
    }

    return str.substr(0, maxLength);
  }

  truncateStringWithPostfix(str, maxLength, postfix) {
    postfix = postfix || '...';

    if (!str || !str.length || str.length <= maxLength) {
      return str;
    }

    if (maxLength <= postfix.length) {
      return postfix.substr(0, maxLength);
    }

    return str.substr(0, maxLength - postfix.length) + postfix;
  }
  buildQueryString(parameterInfos, includeQuestionMark) {
    if (includeQuestionMark === undefined) {
      includeQuestionMark = true;
    }

    var qs = '';

    function addSeperator() {
      if (!qs.length) {
        if (includeQuestionMark) {
          qs = qs + '?';
        }
      } else {
        qs = qs + '&';
      }
    }

    for (var i = 0; i < parameterInfos.length; ++i) {
      var parameterInfo = parameterInfos[i];
      if (parameterInfo.value === undefined) {
        continue;
      }

      if (parameterInfo.value === null) {
        parameterInfo.value = '';
      }

      addSeperator();

      if (
        parameterInfo.value.toJSON &&
        typeof parameterInfo.value.toJSON === 'function'
      ) {
        qs =
          qs +
          parameterInfo.name +
          '=' +
          encodeURIComponent(parameterInfo.value.toJSON());
      } else if (
        Array.isArray(parameterInfo.value) &&
        parameterInfo.value.length
      ) {
        for (var j = 0; j < parameterInfo.value.length; j++) {
          if (j > 0) {
            addSeperator();
          }

          qs =
            qs +
            parameterInfo.name +
            '[' +
            j +
            ']=' +
            encodeURIComponent(parameterInfo.value[j]);
        }
      } else {
        qs =
          qs +
          parameterInfo.name +
          '=' +
          encodeURIComponent(parameterInfo.value);
      }
    }

    return qs;
  }
  //#endregion
  //#region logs
  debug(logObject?: any): void {
    console.debug(`AppCoreDebug: ${logObject}`);
  }
  info(logObject?: any): void {
    console.info(`AppCoreInfo:${logObject}`);
  }
  warn(logObject?: any): void {
    console.warn(`AppCoreWarn:${logObject}`);
  }
  error(logObject?: any): void {
    console.error(`AppCoreErorr :${logObject}`);
  }
  fatal(logObject?: any): void {
    console.error(`AppCoreFatal :${logObject}`);
  }
  //#endregion
}
