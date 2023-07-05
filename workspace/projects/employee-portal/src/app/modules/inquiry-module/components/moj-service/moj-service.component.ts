import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-moj-service',
  templateUrl: './moj-service.component.html',
  styleUrls: ['./moj-service.component.css']
})
export class MojServiceComponent implements OnInit {
 showResult=false;
  constructor() { }

  ngOnInit() {
  }
showMojResult(showResult:boolean){
this.showResult=showResult;

}
}
