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

  private block_height = 30;
  private block_width = 120;
  private sheetData: Data[];
  private margin: Margin;
  private padding: Margin;


  private svg: any;     // TODO replace all `any` by the right type
  private g: any;


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
    console.log(layers);

    return layers;
  }


  public buildStack(leftStart: number, layers: string[]){

    let n = this.margin.top;
    for(let color of layers){
      this.svg.append('rect')
              .attr('width', this.block_width)
              .attr('height', this.block_height)
              .attr('transform', 'translate(' + leftStart + ',' + n + ')')
              .attr('fill', color)
              .attr('stroke', '#FFE4E1')
              .attr('stroke-width', 2.5);
      n += 30;
    }
  }

private initSvg() {
  this.margin = {top: 20, right: 20, bottom: 20, left: 20};
  this.padding = {top: 20, right: 20, bottom: 20, left: 20};
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
    this.lineUp();
  });
}

public lineUp(){
  let nextLeftStart = this.margin.left;
  for(let stack of this.sheetData){
    let layer = this.colorLayers(stack);
    this.buildStack(nextLeftStart, layer);
    nextLeftStart += this.block_width + 40;
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
    this.initSvg();
    setInterval(() => this.title_appear(),500);
    setInterval(() => this.title_disappear(), 4000);
  } 

}
