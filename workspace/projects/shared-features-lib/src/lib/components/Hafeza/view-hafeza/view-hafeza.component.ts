import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import {DateFormatterService} from "../../ng-bootstrap-hijri-gregorian-datepicker/date-formatter.service";

@Component({
  selector: 'app-view-hafeza',
  templateUrl: './view-hafeza.component.html',
  styleUrls: ['./view-hafeza.component.css']
})
export class ViewHafezaComponent implements OnInit {
  get minDate(): NgbDateStruct {
    return this._minDate;
  }

  set minDate(value: NgbDateStruct) {
    this._minDate = value;
  }
  private _minDate: NgbDateStruct ;
  maxDate: NgbDateStruct ;
  selectedDate:NgbDateStruct = { year: 1399, month: 2, day: 2 };
  constructor(
    private dateHelper: DateFormatterService,
  ) {

  }

  ngOnInit(): void {
    this.selectedDate = { year: 1399, month: 2, day: 2 };


  }

}
