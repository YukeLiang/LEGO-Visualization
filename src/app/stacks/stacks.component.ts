import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import * as d3Shape from 'd3-shape';
import * as d3Scale from 'd3-scale';

import { GoogleSheetService } from '../shared/google-sheet.service';
import { Margin, Data } from '../shared/classes';


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
  private width: number;
  private height: number;

  private svg: any;     // TODO replace all `any` by the right type

  private layers: string[];
  private stack: any;
 
  private g: any;


  constructor(private _dataProvider: GoogleSheetService) {}



  public bindData(eachStack: Data) { 
    if(eachStack.age.search('up')){
      this.layers.push('green');    // green, replaced by rgb number
    }else{
      this.layers.push('black');    // black
    }

    if(eachStack.gender.search('Female')){
      this.layers.push('yellow');
    }else{
      this.layers.push('orange');
    }

    for(let color of eachStack.colors){
      
    }
  }

  public buildStack(){

    this.stack = d3.stack()

    this.g.append('rect')
          .attr('width', 30)
          .attr('height', 40);

    this.g.append('rect')
          .attr('width', 30)
          .attr('height', 80);
  }



private initMargins() {
    this.margin = {top: 20, right: 20, bottom: 30, left: 40};
    this.padding = {top: 20, right: 20, bottom: 30, left: 40};
}

private initSvg() {
    this.svg = d3.select('svg');

    this.width = +this.svg.attr('width') - this.margin.left - this.margin.right;
    this.height = +this.svg.attr('height') - this.margin.top - this.margin.bottom;
    this.g = this.svg.append('g').attr('transform', 'translate(' + this.padding.left + ',' + this.padding.top + ')');

    this.buildStack();
    // this.svg.attr('width', this.width)
    //         .attr('height', this.height);
}

public loadData() {
  this._dataProvider.loadData()
  .subscribe(data => {
    this.sheetData = data.surveys;
    console.log(this.sheetData);
  });
}

  ngOnInit() {
    this.loadData();
    this.initMargins();
    this.initSvg();
  }

  

  // public buildStack(){

  // }
  
  // private margin: Margin;

  



}
