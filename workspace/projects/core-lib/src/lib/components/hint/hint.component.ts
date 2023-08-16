import { Component, Input, OnInit } from '@angular/core';

export interface HintModel
{
  hintHeader:string;
  hintBody:string;
}


@Component({
  selector: 'app-hint',
  templateUrl: './hint.component.html',
  styleUrls: ['./hint.component.css'],
})
export class HintComponent implements OnInit {
 @Input() hint:HintModel;
  constructor() {}

  ngOnInit() {}
}
