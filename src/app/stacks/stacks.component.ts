import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import * as d3Shape from 'd3-shape';
import * as d3Scale from 'd3-scale';

import { GoogleSheetService } from '../shared/google-sheet.service';
import { Margin, Data, RGB_COLORS } from '../shared/classes';


@Component({
  selector: 'app-stacks',
  templateUrl: './stacks.component.html',
  styleUrls: ['./stacks.component.css']
})
export class StacksComponent implements OnInit {

  private title :string = 'LEGO VISUALIZATION';
  private sheetData: Data[];

  private margin: Margin;
  private padding: Margin;


  private svg: any;     // TODO replace all `any` by the right type

  private layers: string[] = [];
  private stack: any;
 
  private g: any;


  constructor(private _dataProvider: GoogleSheetService) {}



  public colorLayers(eachStack: Data) { 
    let color_map = new Map([
      ['Red', RGB_COLORS.Red],
      ['Black', RGB_COLORS.Black],
      ['Blue', RGB_COLORS.Blue],
      ['Brown', RGB_COLORS.Brown],
      ['Green', RGB_COLORS.Green],
      ['Grey', RGB_COLORS.Grey],
      ['Light Green', RGB_COLORS.LGreen],
      ['Orange', RGB_COLORS.Orange],
      ['Pink', RGB_COLORS.Pink],
      ['Purple', RGB_COLORS.Purple],
      ['White', RGB_COLORS.White],
      ['Yellow', RGB_COLORS.Yellow]
  ]);

    if(eachStack.age.search('up')){
      this.layers.push(color_map.get('Green'));    // green, replaced by rgb number
    }else{
      this.layers.push(color_map.get('Green'));    // black
    }

    if(eachStack.gender.search('Female')){
      this.layers.push(color_map.get('Yellow'));
    }else{
      this.layers.push(color_map.get('Orange'));
    }

    for(let color of eachStack.colors){
      this.layers.push(color_map.get(color));
    }
    console.log(this.layers);
  }


  public buildStack(){
    let block_height = 30;
    let block_width = 120;
    let n = this.margin.top;
    for(let color of this.layers){
      this.g.append('rect')
              .attr('width', block_width)
              .attr('height', block_height)
              .attr('transform', 'translate(' + this.margin.left + ',' + n + ')')
              .attr('fill', color)
              .attr('stroke', '#FFE4E1')
              .attr('stroke-width', 2.5);
      n += 30;
    }
  }



private initSvg() {
  this.margin = {top: 20, right: 20, bottom: 30, left: 40};
  this.padding = {top: 20, right: 20, bottom: 30, left: 40};
  this.svg = d3.select('svg');

  this.svg.attr('width', this.svg.attr('width') - this.margin.left - this.margin.right)
          .attr('height', this.svg.attr('height') - this.margin.top - this.margin.bottom);

 this.g = this.svg.append('g').attr('transform', 'translate(' + this.padding.left + ',' + this.padding.top + ')');
}


public loadData() {
  this._dataProvider.loadData()
  .subscribe(data => {
    this.sheetData = data.surveys;
    console.log(this.sheetData);
    this.colorLayers(this.sheetData[0]);
    this.buildStack();
  });
}

public appear(){
  let animateName: string = 'animated flipInX';
  //let animationend = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
  d3.select('h1').attr('class', animateName);
}

public disappear(){
  let animateName: string = 'animated flipOutX';
  //let animationend = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
  d3.select('h1').attr('class', animateName);
}

  ngOnInit() {
    this.loadData();
    this.initSvg();
    setInterval(() => this.appear(),500);
    setInterval(() => this.disappear(), 4000);
  } 

}
