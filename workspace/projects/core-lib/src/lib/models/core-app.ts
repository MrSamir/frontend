export class CoreApp {
  private class ILanguageInfo {

    name: string;

    displayName: string;

    icon: string;

    isDefault: boolean;

    isDisabled: boolean;

    isRightToLeft: boolean;

}

interface ILocalizationSource {

    name: string;

    type: string;

}

let languages: ILanguageInfo[];

let currentLanguage: ILanguageInfo;

let sources: ILocalizationSource[];

let defaultSourceName: string;

let values: { [key: string]: { [key: string]: string } };

let localizeWeb: (key: string) => string;

function localize(key: string, sourceName: string): string;

function getSource(sourceName: string): (...key: string[]) => string;

function isCurrentCulture(name: string): boolean;

}
