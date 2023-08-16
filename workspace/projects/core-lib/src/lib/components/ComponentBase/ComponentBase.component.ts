import { Component, Injectable, Injector, OnInit } from '@angular/core';
import { AppMessageService } from '../../services/message/app-message.service';
import { LoadingService } from '../../services/loading.service';
import { LocalizationService } from '../../services/localization/localization.service';
import { UtilsService } from '../../services/Utils/Utils.Service';
import { AppConfigSubjectService } from '../../services/appConfigSubjectService';
import { EnumValidation } from '../../enums/EnumValidation';

export enum ComponentState
{
  New=1,
  Edit=2
  
}
export abstract class ComponentBase  {
  localization: LocalizationService;
  loading: LoadingService;
  message: AppMessageService;
  Util:UtilsService;
  config:AppConfigSubjectService
  constructor(injector: Injector) {
    this.localization = injector.get<LocalizationService>(LocalizationService);
    this.loading = injector.get<LoadingService>(LoadingService);
    this.message = injector.get<AppMessageService>(AppMessageService);
    this.Util = injector.get<UtilsService>(UtilsService);
    this.config=injector.get <AppConfigSubjectService> (AppConfigSubjectService );
  }
  

  l(key: string, ...args: any[]): string {
    return this.localization.localize(key,args);
  }
  showLoding() {
    this.loading.show();
  }
  hideLoding() {
    if(this.loading.isLoading)
    this.loading.hide();
  }
  get EnumValidation()
  {
    return EnumValidation;
  }
  
}
