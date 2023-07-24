import { Component, OnInit } from '@angular/core';
import { LocalizationService } from '../services/localization/localization.service';

@Component({
  selector: 'lib-loacalization-base',
  templateUrl: './loacalization-base.component.html',
  styleUrls: ['./loacalization-base.component.css']
})
export class LoacalizationBaseComponent implements OnInit {

  constructor(private service: LocalizationService) { }

  ngOnInit() {
  }

  setLang(lang: string) {
    this.service.use(lang);
  }
}
