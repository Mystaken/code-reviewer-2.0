import { AuthService } from './auth/auth.service';
import { Injectable } from '@angular/core';
import { Http, URLSearchParams, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';

@Injectable()
export class APIRoutingService {
  private _api_route = 'http://localhost:3000/api/';

  constructor(private _http: Http, private _authService: AuthService) { }

  _parseError(err) {
    try {
      return Observable.throw(err.json());
    } catch (e) {
      return Observable.throw([{
        code: 'SERVER_ERROR'
      }]);
    }
  }

  get(route, params) {
    let param;
    params = params || {};
    let requestOpts: URLSearchParams = new URLSearchParams();
    for (param in params) {
        if (params.hasOwnProperty(param)) {
          requestOpts.set(param, params[param]);
        }
    }
    // append tokens in headers if authenticated
    let headers = this._authService.createHeaders();
    let requestOptions = new RequestOptions({headers: headers});

    requestOptions.params = requestOpts;

    return this._http.get(this._api_route + route, requestOptions)
        .map(res => res.json().data)
        .catch(this._parseError);
  }

  put(route, params) {
    params = params || {};
    return this._http.put(this._api_route + route, params)
        .map(res => res.json().data)
        .catch(this._parseError);
  }

  post(route, params) {
    params = params || {};
    return this._http.post(this._api_route + route, params)
        .map(res => res.json().data)
        .catch(this._parseError);
  }

  delete(route, params) {
    let param;
    params = params || {};
    let requestOpts: URLSearchParams = new URLSearchParams();
    for (param in params) {
        if (params.hasOwnProperty(param)) {
          requestOpts.set(param, params[param]);
        }
    }

    let requestOptions = new RequestOptions();
    requestOptions.params = requestOpts;

    return this._http.delete(this._api_route + route, requestOptions)
        .map(res => res.json().data)
        .catch(this._parseError);
  }


}
