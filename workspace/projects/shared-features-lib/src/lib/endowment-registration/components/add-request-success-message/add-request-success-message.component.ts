import { Component, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'lib-add-request-success-message',
  templateUrl: './add-request-success-message.component.html',
  styleUrls: ['./add-request-success-message.component.css']
})
export class AddRequestSuccessMessageComponent {
  requsetID: string;
  requestNumber: string;

  constructor(private renderer: Renderer2, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.renderer.addClass(document.body, 'loginPages');
    this.requestNumber = this.route.snapshot.params['reqnumber']
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'loginPages');
  }

  redirectToHomePage() {
    this.router.navigate(["/"]);
  }
}
