import { ActivatedRoute, Routes } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'employee-portal';
  portalbreadcrumbroutes : ActivatedRoute=new ActivatedRoute();
  constructor(private activerouter: ActivatedRoute) {
   
    this.portalbreadcrumbroutes=activerouter;
  }
 
}
