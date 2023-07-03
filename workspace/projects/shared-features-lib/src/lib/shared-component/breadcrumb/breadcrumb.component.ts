import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
@Component({
  selector: 'lib-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbs: MenuItem[]=[];
  constructor(private router: Router,private activerouter: ActivatedRoute) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.breadcrumbs = this.createBreadcrumbs(activerouter.root);
      }
    });
  }

  ngOnInit(): void {}

  private createBreadcrumbs(route: ActivatedRoute, breadcrumbs: MenuItem[] = []): MenuItem[] {
    if (route.firstChild) {
      const childRoute = route.firstChild;
      const breadcrumb: MenuItem = {
        label: childRoute.snapshot.data['breadcrumb'],
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