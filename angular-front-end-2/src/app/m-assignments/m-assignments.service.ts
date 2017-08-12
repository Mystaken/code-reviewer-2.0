import { Injectable } from '@angular/core';

import { APIRoutingService } from '../services/api-routing.service';

@Injectable()
export class MAssignmentsService {
  constructor(private _api: APIRoutingService) { }

  addAssignment(params) {
    return this._api.put('works', params);
  }

  getAllAssignments(params) {
    return this._api.get('works/all', params);
  }

  updateAssignment(params) {
    return this._api.post('works', params);
  }

  getAssignment(params) {
    return this._api.get('works', params);
  }
}