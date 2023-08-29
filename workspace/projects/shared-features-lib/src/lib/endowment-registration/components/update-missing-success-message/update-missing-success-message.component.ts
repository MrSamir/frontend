import { Component, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'lib-update-missing-success-message',
  templateUrl: './update-missing-success-message.component.html',
  styleUrls: ['./update-missing-success-message.component.css']
})
export class UpdateMissingSuccessMessageComponent {

  reqnumber: string;

  constructor(private renderer: Renderer2, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.renderer.addClass(document.body, 'loginPages');
    this.reqnumber = this.route.snapshot.params['reqnumber']
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'loginPages');
  }

  redirectToHomePage() {
    this.router.navigate(["/"]);
  }
}
