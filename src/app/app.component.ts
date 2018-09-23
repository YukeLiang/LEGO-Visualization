import { Component} from '@angular/core';
import { StacksComponent } from './stacks/stacks.component';
import * as d3 from 'd3';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'LEGO-VIS';

  constructor() {}

  public addClass(){
    let animateName: string = 'animated rubberBand';
    //let animationend = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
    d3.select('h1').attr('class', animateName);
  }

}



