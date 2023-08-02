import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html' 
})
export class LandingComponent implements OnInit {

  constructor(private renderer : Renderer2) { }
  items: any[]=[];
  loadServices(){
    // this.http.get<any[]>('components/inquiry-service-config.json').subscribe(data => {
    //   this.items = data;
    //   console.log(data);
    // });
  }
  ngOnInit() {
    this.loadServices();
    // this.renderer.addClass(document.body, 'IndexPages');
  }

}
