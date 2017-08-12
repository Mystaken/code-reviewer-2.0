import { Injectable } from '@angular/core';

import { APIRoutingService } from '../services/api-routing.service';

@Injectable()
export class MSubmissionsService {
  constructor(private _api: APIRoutingService) { }
  getSubmission(params) {
    return this._api.get('works/submissions', params);
  }

  getSubmissionFile(params) {
    return this._api.get('works/submissions/files', params)
  }

  getAllAnnotations(params) {
    return this._api.get('works/annotations/all', params);
  }
}