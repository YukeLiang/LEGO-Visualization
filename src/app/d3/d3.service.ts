import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import * as d3 from 'd3';

//import { select } from 'd3-selection';
import { scaleLinear } from 'd3-scale';
import { range, histogram, max } from 'd3-array';
import { stack } from 'd3-shape';
import { format } from 'd3-format';
import { randomBates } from 'd3-random';
import { axisBottom } from 'd3-axis';
import { Observable } from 'rxjs';
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class D3Service {

  constructor() { }

  drawBlock() {
    
  }

  loadData() :Promise<d3.DSVParsedArray<d3.DSVRowString>>{
    return d3.csv('https://docs.google.com/spreadsheets/d/1ddMERW93PAaj7D-8sHnFJv99w28d0Pg9vlMn9ke_qF4/edit?ts=5b9fe7cd#gid=811974861');
  }

}
