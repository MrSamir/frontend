import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-yaqeen-service-request',
  templateUrl: './yaqeen-service-request.component.html',
  styleUrls: ['./yaqeen-service-request.component.css']
})
export class YaqeenServiceRequestComponent implements OnInit {

@Output() showResult: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

check(){
this.showResult.emit(true);
}
}
