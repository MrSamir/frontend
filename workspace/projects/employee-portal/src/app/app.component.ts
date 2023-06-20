import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { LoadingService } from 'core-lib';
import { ButtonModule } from 'primeng/button';
import { MessageSeverity } from 'projects/core-lib/src/lib/enums/message-severity';
import { MessageTypeEnum } from 'projects/core-lib/src/lib/enums/message-type';

import { AppMessageService } from 'projects/core-lib/src/lib/services/app-message.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor (public loadingService:LoadingService){}
  title = 'employee-portal';

}


