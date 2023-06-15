import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lib-loacalization-base',
  templateUrl: './loacalization-base.component.html',
  styleUrls: ['./loacalization-base.component.css']
})
export class LoacalizationBaseComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  openPage(routename: string) {
    //this.router.navigateByUrl(`/${routename}`);
  }
