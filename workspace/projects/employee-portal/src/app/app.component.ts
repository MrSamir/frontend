 
 
 


import { Component } from '@angular/core';
import { LoadingService } from 'projects/core-lib/src/lib/services/loading.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor (
    public loadingService:LoadingService
    ){}
  title = 'employee-portal';

}


