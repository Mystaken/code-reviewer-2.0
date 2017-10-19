import { Injectable } from '@angular/core';

import { APIRoutingService } from '../services/api-routing.service';

@Injectable()
export class MTasService {
  constructor(private _api: APIRoutingService) { }

  addTa(params) {
    return this._api.put('users/tas', params);
  }

  getAllTas(params) {
    return this._api.get('users/tas/all', params);
  }

  getTa(params) {
    return this._api.get('users/tas', params);
  }

  updateTa(params) {
    return this._api.post('users/tas', params);
  }
}