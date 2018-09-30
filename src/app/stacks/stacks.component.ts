import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import * as d3Shape from 'd3-shape';
import * as d3Scale from 'd3-scale';
import * as d3Axis from 'd3-axis';

import { GoogleSheetService } from '../shared/google-sheet.service';
import { Margin, Data, RGB_COLORS } from '../shared/classes';


@Component({
  selector: 'app-stacks',
  templateUrl: './stacks.component.html',
  styleUrls: ['./stacks.component.css']
})
export class StacksComponent implements OnInit {

  private block_height: number = 30;
  private block_width: number = 100;
  private sheetData: Data[];
  private margin: Margin;

  private svg: any;    



  constructor(private _dataProvider: GoogleSheetService) {}



  public colorLayers(eachStack: Data): string[] { 
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

  let layers: string[] = [];

    if(eachStack.age.search('up')){
      layers.push(color_map.get('Green'));    // green, replaced by rgb number
    }else{
      layers.push(color_map.get('Green'));    // black
    }

    if(eachStack.gender.search('Female')){
      layers.push(color_map.get('Yellow'));
    }else{
      layers.push(color_map.get('Orange'));
    }

    for(let color of eachStack.colors){
      layers.push(color_map.get(color));
    }
    return layers;
  }


  public buildStack(leftStart: number, layers: string[]){

    let nextTopStart = this.margin.top;
    let group = this.svg.append('g');
    for(let color of layers){
         group.append('rect')
              .attr('width', this.block_width)
              .attr('height', this.block_height)
              .attr('transform', 'translate(' + leftStart + ',' + nextTopStart + ')')
              .attr('fill', color);

      nextTopStart += this.block_height;
    }
  }

public initSvg(svg_width: number) {
  this.margin = {top: 30, right: 30, bottom: 30, left: 30};
  this.svg = d3.select('svg');  

  this.svg.attr('width', svg_width * this.block_width);

}


public loadData() {
  this._dataProvider.loadData()
  .subscribe(data => {
    this.sheetData = data.surveys;
    this.initSvg(data.surveys.length);
    this.buildGroup()
  });
}
 

public buildGroup(){
  let nextLeftStart = 0;

  for(let stack of this.sheetData){
    this.buildStack(nextLeftStart, this.colorLayers(stack));
    nextLeftStart += this.block_width;
  }
}


public title_appear(){
  let animateName: string = 'animated flipInX';
  d3.select('h1').attr('class', animateName);
}

public title_disappear(){
  let animateName: string = 'animated flipOutX';
  d3.select('h1').attr('class', animateName);
}

  ngOnInit() {
    this.loadData();
    setInterval(() => this.title_appear(),500);
    setInterval(() => this.title_disappear(), 4000);
  } 

}
