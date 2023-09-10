import { Component, Injectable, Injector, OnInit } from '@angular/core';
import { AppMessageService } from '../../services/message/app-message.service';
import { LoadingService } from '../../services/loading.service';
import { LocalizationService } from '../../services/localization/localization.service';
import { UtilsService } from '../../services/Utils/Utils.Service';
import { AppConfigSubjectService } from '../../services/appConfigSubjectService';
import { EnumValidation } from '../../enums/EnumValidation';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

export enum ComponentState {
  New = 1,
  Edit = 2

}
export abstract class ComponentBase {
  localization: LocalizationService;
  loading: LoadingService;
  message: AppMessageService;
  Util: UtilsService;
  config: AppConfigSubjectService
  router: Router;
  _location: Location;
  constructor(injector: Injector) {
    this.localization = injector.get<LocalizationService>(LocalizationService);
    this.loading = injector.get<LoadingService>(LoadingService);
    this.message = injector.get<AppMessageService>(AppMessageService);
    this.Util = injector.get<UtilsService>(UtilsService);
    this.config = injector.get<AppConfigSubjectService>(AppConfigSubjectService);
    this.router = injector.get<Router>(Router);
    this._location = injector.get<Location>(Location);
  }


  l(key: string, ...args: any[]): string {
    return this.localization.localize(key, args);
  }
  showLoding() {
    this.loading.show();
  }
  hideLoding() {
    if (this.loading.isLoading)
      this.loading.hide();
  }
  get EnumValidation() {
    return EnumValidation;
  }
  validateForm(form: NgForm) {
    if (form.valid == false) {
      for (var control in form.controls)
        if (form.controls[control].invalid) {
          form.controls[control].markAsTouched();
          form.controls[control].updateValueAndValidity();
          form.controls[control].markAsPristine();
        }

    }

    return form.valid;
  }
  goBack(url?: string, params?: string[]) {

    if (url != undefined && url != null && url != '' && params?.length == 0) {
      this.router.navigate([url]);
    }
    else if (url != undefined && url != null && url != '' && params?.length != 0) {
      this.router.navigate([url, ...params!]);
    }
    else {
      this._location.back()
    }
  }

}
