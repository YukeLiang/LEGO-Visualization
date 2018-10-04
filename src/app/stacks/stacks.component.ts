import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

import { GoogleSheetService } from '../shared/google-sheet.service';
import { Margin, Data, RGB_COLORS } from '../shared/classes';


@Component({
  selector: 'app-stacks',
  templateUrl: './stacks.component.html',
  styleUrls: ['./stacks.component.css']
})
export class StacksComponent implements OnInit {


  private svg_width: number;
  private svg_height:  number = 0.4 * screen.height;
  private block_height: number = 0.05 * this.svg_height;
  private block_width: number =  2.5 * this.block_height;
  private sheetData: Data[];
  private margin: Margin;

  private svg_1: any;
  private svg_2: any;  
  private svg_3: any; 



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

    if(eachStack.age == 'Age 21 and up  (Green)'){
      layers.push(color_map.get('Green'));    // green, replaced by rgb number
    }else if(eachStack.age == 'Age 6 - 10   (Blue)'){
      layers.push(color_map.get('Blue'));
    }else{
      layers.push(color_map.get('Yellow'));
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



  public buildGroup(){
    let nextLeftStart = 0;
    let groupNum = 0;
    for(let i = 0; i < this.sheetData.length; i++){
      if(i % 6 > 2){
        groupNum = 2;
      }else {
        groupNum = 1;
      }
      this.buildStack(nextLeftStart, this.colorLayers(this.sheetData[i]),groupNum);
      nextLeftStart += this.block_width;
    }
  }
  

  public buildStack(leftStart: number, layers: string[], groupNum: any){
    let nextTopStart = 0;
    let group = this.svg_1.append('g');
    if(groupNum == 2){
      group = this.svg_2.append('g');
    }
    for(let color of layers){
         group.append('rect')
              .attr('width', this.block_width)
              .attr('height', this.block_height)
              .attr('transform', 'translate(' + leftStart + ',' + nextTopStart + ')')
              .attr('fill', color);
         
      nextTopStart += this.block_height;
    }
  }



public initSvg(num_col: number) {
  this.svg_1 = d3.select('#img1');  
  this.svg_1.attr('width', num_col * this.block_width)
          .attr('height', this.svg_height);
  this.svg_width = this.svg_1.width;


  this.svg_2 = d3.select('#img2'); 
  this.svg_2.attr('width', num_col * this.block_width)
  .attr('height', this.svg_height);
}


public loadData() {
  this._dataProvider.loadData()
  .subscribe(data => {
    this.sheetData = data.surveys;
    console.log(data.surveys);
    this.initSvg(data.surveys.length / 2);
    this.buildGroup();
  });
}


  ngOnInit() {
    this.loadData();
  } 

}
