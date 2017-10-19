import { Injectable } from '@angular/core';

import { APIRoutingService } from '../services/api-routing.service';

@Injectable()
export class MStudentsService {
  constructor(private _api: APIRoutingService) { }

  addStudent(params) {
    return this._api.put('users/students', params);
  }

  getAllStudents(params) {
    return this._api.get('users/students/all', params);
  }

  getStudent(params) {
    return this._api.get('users/students', params);
  }

  updateStudent(params) {
    return this._api.post('users/students', params);
  }
}