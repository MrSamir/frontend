import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../../services/loading.service';
@Component({
  selector: 'app-messageAndspinner',
  templateUrl: './messageAndspinner.component.html',
  styleUrls: ['./messageAndspinner.component.css'],
})
export class MessageAndspinnerComponent implements OnInit {
  loadingService :LoadingService ;
  constructor(_loadingService: LoadingService) {
    this.loadingService = _loadingService;
  }

  ngOnInit() {}
}
