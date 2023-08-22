import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DateFormatterService } from '../../date-formatter.service';

@Component({
  selector: 'custom-year-select',
  templateUrl: './custom-year-select.component.html',
  styleUrls: ['./custom-year-select.component.css'],
})
export class CustomYearSelectComponent implements OnInit {
  selectedYear: number;
  @Output() yearChange = new EventEmitter<number>();

  constructor(private dateformatter: DateFormatterService) { }

  ngOnInit(): void {
    if (!this.selectedYear) {
      const today = this.dateformatter.GetTodayHijri();
      this.selectedYear = today.year;
      this.yearChange.emit(this.selectedYear);
    }
  }

  onChangeYear(e: Event) {
    const target = e.target as HTMLInputElement;
    this.yearChange.emit(parseInt(target.value));
  }
}
