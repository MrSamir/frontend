import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-yaqeen-service',
  templateUrl: './yaqeen-service.component.html',
  styleUrls: ['./yaqeen-service.component.css']
})
export class YaqeenServiceComponent implements OnInit {
 showResult=false;
  constructor() { }

  ngOnInit() {
  }
 
showYaqeenResult(showResult:boolean){
this.showResult=showResult;

}
 
}
