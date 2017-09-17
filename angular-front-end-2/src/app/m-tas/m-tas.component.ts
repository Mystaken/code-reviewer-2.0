import { Component, ViewChild, OnInit } from '@angular/core';

import { MTasAllComponent } from './m-tas-all.component';

import { MTasService } from './m-tas.service';
import { ValidationService } from '../services/validation.service';


@Component({
  selector: 'm-tas',
  templateUrl: './m-tas.component.html',
  styleUrls: ['./m-tas.component.css']
})
export class MTasComponent {
  constructor(private _taAPI: MTasService, private _validator: ValidationService) {
    this._taAPI
      .getAllTas({})
  }
}
