import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
@Component({
  selector: 'lib-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {
  @Input() breadcrumbroutes : ActivatedRoute=new ActivatedRoute()  ;
  @Input() breadcrumbdata : string=""  ;
  breadcrumbs: MenuItem[]=[];
   
  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.breadcrumbs = this.createBreadcrumbs(this.breadcrumbroutes.root);
        console.log(this.breadcrumbroutes.root);
      }
    });
  }

  ngOnInit(): void {}

  private createBreadcrumbs(route: ActivatedRoute, breadcrumbs: MenuItem[] = []): MenuItem[] {
    if (route.firstChild) {
      const childRoute = route.firstChild;
      const breadcrumb: MenuItem = {
        label: this.breadcrumbdata, //childRoute.snapshot.data.breadcrumb,
        url: childRoute.snapshot.url.join('/')
      };

      if (breadcrumb.label) {
        breadcrumbs.push(breadcrumb);
      }

      return this.createBreadcrumbs(childRoute, breadcrumbs);
    }

    return breadcrumbs;
  }
}