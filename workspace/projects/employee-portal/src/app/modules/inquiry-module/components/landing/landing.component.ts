 
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
  providers:[HttpClient]
})
export class LandingComponent implements OnInit {

  title = 'Employee Portal';
  constructor(private http: HttpClient,private router: Router) { }
  items: any[]=[];

  products = [{
    id: '1000',
    code: 'f230fh0g3',
    name: 'Bamboo Watch',
    description: 'Product Description',
    image: 'bamboo-watch.jpg',
    price: 65,
    category: 'Accessories',
    quantity: 24,
    inventoryStatus: 'INSTOCK',
    rating: 5
}]
  ngOnInit() {
    this.http.get<any[]>('assets/inquiry-service-config.json').subscribe(data => {
      this.items = data;
      console.log(data);
    });
  }

  navigateToNestedTab(parentRoute: string, nestedRoute: string): void {
   this.router.navigateByUrl('employee/y')
   // this.router.navigate(['employee',parentRoute, nestedRoute]);
  }
}
 