
import {Component, Input, OnInit} from '@angular/core';
import {ValidationItem} from "../../Models/validation-item";

@Component({
  selector: 'app-validation-messages',
  templateUrl: './validation-messages.component.html',
  styleUrls: ['./validation-messages.component.css']
})
export class ValidationMessagesComponent implements OnInit {
  @Input()
  ValidationItems: ValidationItem[] = [];

  constructor() { }

  ngOnInit(): void {
  }
}
