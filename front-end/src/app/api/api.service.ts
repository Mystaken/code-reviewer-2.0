import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';

import { AuthService } from '../auth/auth.service';

import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class APIService {
  private _apiUrl: string = `${environment.domain}/api`;

  constructor(private http: Http, private auth: AuthService) { }

  get(route:string, params?: object): Observable<any> {
  }

  put(route:string, params?: object): Observable<any> {
  }

  post(route:string, params?: object): Observable<any> {
  }

  patch(route:string, params?: object): Observable<any> {
  }

  delete(route:string, params?: object): Observable<any> {
  }

  upload(route:string, files:{[name:string]: File;}, params?:object):Observable<any> {
  }
}