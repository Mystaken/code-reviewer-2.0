import { Component, Output } from '@angular/core';

import { MTasService }   from './m-tas.service';
import { ValidationService }  from '../services/validation.service';

@Component({
  selector: 'm-tas-all',
  templateUrl: './m-tas-all.component.html',
  styleUrls: ['./m-tas-all.component.css']
})
export class MTasAllComponent {
  tas = [];

  constructor(private _taAPI: MTasService) {}
  ngOnInit() {
    this._taAPI.getAllTas({})
      .subscribe((res) => this.tas = res);
  }

  addTa(user_id) {
    this._taAPI
      .getTa({ user_id: user_id })
      .subscribe((res) => this.tas.push(res));
  }

  updateTa(ta, type) {
    var self = this;
    return function(value) {
      var params = {
        user_id: ta.user_id
      };
      params[type] = value
      return self._taAPI.updateTa(params).subscribe(
        (res) => ta[type]=value);
    }
  }
}
