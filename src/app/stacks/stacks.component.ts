import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

import { GoogleSheetService } from '../shared/google-sheet.service';
import { Margin, Data, RGB_COLORS } from '../shared/classes';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';


@Component({
  selector: 'app-stacks',
  templateUrl: './stacks.component.html',
  styleUrls: ['./stacks.component.css']
})
export class StacksComponent implements OnInit {


  private svg_width: number = screen.width;
  private svg_height:  number = screen.height * 0.9;
  private block_height: number = this.svg_height / 4 / 19;
  private block_width: number =  2 * this.block_height;
  private row_height: number = this.svg_height / 4;


  private svg_1: any;

  private sheetData: Data[];



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
    let nextTopStart = 0;
    let count = 0;
    let nextGroupNum = Math.floor(Math.random() * 8) + 2;

    for(let i = 0; i < this.sheetData.length; i++){
      this.buildStack(nextLeftStart, nextTopStart, this.colorLayers(this.sheetData[i]));
      //next Group
      if(count == nextGroupNum){
        nextLeftStart += 5 * this.block_width;
        nextGroupNum = Math.floor(Math.random() * 8) + 3;
        count = 0;
      }else{
        nextLeftStart += this.block_width; 
      }
      count ++;

      // Next Row
      if(nextLeftStart >= this.svg_width){
        nextLeftStart = 0;
        let sepTopStart = nextTopStart + this.row_height;
        this.svg_1.append('rect')
                  .attr('width', screen.width)
                  .attr('height', this.block_height)
                  .attr('fill', '#B48D51')
                  .attr('transform', 'translate(' + 0 + ',' + sepTopStart + ')');
        nextTopStart += this.row_height + this.block_height;
      }
    }
  }
  

  public buildStack(leftStart: number, nextTopStart:number, layers: string[]){
   
    for(let color of layers){
      let group = this.svg_1.append('g');
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
  this.svg_1.attr('width', this.svg_width)
          .attr('height', this.svg_height);

}


public loadData() {
  this._dataProvider.loadData()
  .subscribe(data => {
    this.sheetData = data.surveys;
    this.initSvg(data.surveys.length / 3);
    this.buildGroup();
  });
}


  ngOnInit() {
    this.loadData();
  } 

}
